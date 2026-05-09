using Backend.API.Extensions;
using Backend.Application.Requests.Auth;
using Backend.Application.Services;
using Microsoft.AspNetCore.Mvc;


namespace Backend.API.Controllers;

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

    [HttpDelete("logout/{refreshToken}")]
    public async Task<IActionResult> Logout([FromRoute] string refreshToken)
    {
        var response = await _authService.LogoutAsync(refreshToken);
        return response.ToHttpResponse();
    }

    [HttpPut("refresh/{refreshToken}")]
    public async Task<IActionResult> Refresh([FromRoute] string refreshToken)
    {
        var response = await _authService.RefreshAccessTokenAsync(refreshToken);
        return response.ToHttpResponse();
    }
}