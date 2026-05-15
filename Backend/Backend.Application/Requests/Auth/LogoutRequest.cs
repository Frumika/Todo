namespace Backend.Application.Requests.Auth;

public class LogoutRequest
{
    public string RefreshToken { get; set; } = string.Empty;
}