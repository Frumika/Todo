using Backend.Application.DTOs.Auth;
using Backend.Application.Logic;
using Backend.Application.Requests.Auth;
using Backend.Application.Requests.Base;
using Backend.Application.Responses;
using Backend.Application.Statuses;
using Backend.DataAccess.MySQL.Contexts;
using Backend.Domain.Models;
using Microsoft.EntityFrameworkCore;


namespace Backend.Application.Services;

public class AuthService
{
    private readonly MainDbContext _dbContext;
    private readonly TokenService _tokenService;

    public AuthService(MainDbContext dbContext, TokenService tokenService)
    {
        _dbContext = dbContext;
        _tokenService = tokenService;
    }

    public async Task<Response> RegisterAsync(RegisterRequest request)
    {
        ValidationResult result = request.Validate();
        if (!result.IsValid)
            return Response.Fail(new BadRequest(), result.Message);

        try
        {
            bool isUserExist = await _dbContext.Users
                .AsNoTracking()
                .AnyAsync(user => user.Login == request.Login);

            if (isUserExist)
                return Response.Fail(new UserAlreadyExists(), "User already exists");

            User user = new()
            {
                Login = request.Login,
                HashPassword = Argon2Hasher.HashPassword(request.Password)
            };

            _dbContext.Add(user);
            await _dbContext.SaveChangesAsync();

            return Response.Success("User registered");
        }
        catch (Exception)
        {
            return Response.Fail(new UnknownError(), "Internal server error");
        }
    }

    public async Task<Response> LoginAsync(LoginRequest request)
    {
        ValidationResult result = request.Validate();
        if (!result.IsValid)
            return Response.Fail(new BadRequest(), result.Message);

        try
        {
            User? user = await _dbContext.Users
                .FirstOrDefaultAsync(u => u.Login == request.Login);

            if (user is null)
                return Response.Fail(new InvalidLogin(), "Invalid login");

            bool isPasswordValid =
                Argon2Hasher.VerifyPassword(request.Password, user.HashPassword);

            if (!isPasswordValid)
                return Response.Fail(new InvalidPassword(), "Invalid password");

            string accessToken = _tokenService.GenerateAccessToken(user);
            RefreshToken refreshToken = _tokenService.GenerateRefreshToken(user);

            _dbContext.RefreshTokens.Add(refreshToken);
            await _dbContext.SaveChangesAsync();

            return Response.Success(
                new TokenDto
                {
                    AccessToken = accessToken,
                    RefreshToken = refreshToken.Value
                }
            );
        }
        catch (Exception)
        {
            return Response.Fail(new UnknownError(), "Internal server error");
        }
    }

    public async Task<Response> LogoutAsync(string refreshToken)
    {
        try
        {
            RefreshToken? token = await _dbContext.RefreshTokens
                .FirstOrDefaultAsync(rt => rt.Value == refreshToken);

            if (token is null)
                return Response.Success("Already logged out");

            token.IsRevoked = true;
            await _dbContext.SaveChangesAsync();

            return Response.Success("Logged out");
        }
        catch (Exception)
        {
            return Response.Fail(new UnknownError(), "Internal server error");
        }
    }
    
    public async Task<Response> RefreshAccessTokenAsync(string refreshToken)
    {
        try
        {
            RefreshToken? token = await _dbContext.RefreshTokens
                .Include(rt => rt.User)
                .FirstOrDefaultAsync(rt => rt.Value == refreshToken);

            if (token is null)
                return Response.Fail(new TokenNotFound(), "Invalid refresh token");

            if (token.IsRevoked)
                return Response.Fail(new TokenRevoked(), "Refresh token revoked");

            if (token.ExpiresAt <= DateTime.UtcNow)
            {
                token.IsRevoked = true;
                await _dbContext.SaveChangesAsync();

                return Response.Fail(new TokenExpired(), "Refresh token expired");
            }

            return Response.Success(
                new TokenDto
                {
                    AccessToken = _tokenService.GenerateAccessToken(token.User),
                    RefreshToken = token.Value
                }
            );
        }
        catch (Exception)
        {
            return Response.Fail(new UnknownError(), "Internal server error");
        }
    }
}