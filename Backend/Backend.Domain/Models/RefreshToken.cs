namespace Backend.Domain.Models;

public class RefreshToken
{
    public int Id { get; set; }
    public string Value { get; set; } = string.Empty;
    public DateTime ExpiresAt { get; set; }
    public bool IsRevoked { get; set; }

    public int UserId { get; set; }
    public User User { get; set; } = null!;
}