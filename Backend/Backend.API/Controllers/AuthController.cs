using Backend.API.Extensions;
using Backend.Application.Requests.Auth;
using Backend.Application.Services;
using Microsoft.AspNetCore.Mvc;


namespace Backend.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        var response = await _authService.RegisterAsync(request);
        return response.ToHttpResponse();
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var response = await _authService.LoginAsync(request);
        return response.ToHttpResponse();
    }

    [HttpPut("refresh")]
    public async Task<IActionResult> Refresh([FromBody] RefreshRequest request)
    {
        var response = await _authService.RefreshAccessTokenAsync(request);
        return response.ToHttpResponse();
    }

    [HttpDelete("logout")]
    public async Task<IActionResult> Logout([FromBody] LogoutRequest request)
    {
        var response = await _authService.LogoutAsync(request);
        return response.ToHttpResponse();
    }

    [HttpDelete("logout_all")]
    public async Task<IActionResult> LogoutAll()
    {
        int? userId = User.GetUserId();
        if (userId is null) return Unauthorized();

        var response = await _authService.LogoutAllAsync((int)userId);
        return response.ToHttpResponse();
    }
}