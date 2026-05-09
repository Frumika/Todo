using System.Security.Cryptography;
using System.Text;
using Konscious.Security.Cryptography;

namespace Backend.Application.Logic;

public static class Argon2Hasher
{
    private static int _degreeOfParallelism = 4;
    private static int _memorySize = 65536;
    private static int _iterations = 4; 
    
    
    public static string HashPassword(string password)
    {
        byte[] salt = new byte[16];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(salt);

        var argon2 = new Argon2id(Encoding.UTF8.GetBytes(password))
        {
            Salt = salt,
            DegreeOfParallelism = _degreeOfParallelism,
            MemorySize = _memorySize,
            Iterations = _iterations
        };

        byte[] hash = argon2.GetBytes(32);

        string result = Convert.ToBase64String(salt) + ":" + Convert.ToBase64String(hash);

        return result;
    }
    
    public static bool VerifyPassword(string password, string hashPassword)
    {
        var parts = hashPassword.Split(':');
        if (parts.Length != 2) return false;

        byte[] salt = Convert.FromBase64String(parts[0]);
        byte[] storedKey = Convert.FromBase64String(parts[1]);

        var argon2 = new Argon2id(Encoding.UTF8.GetBytes(password))
        {
            Salt = salt,
            DegreeOfParallelism = _degreeOfParallelism,
            MemorySize = _memorySize,
            Iterations = _iterations
        };

        byte[] key = argon2.GetBytes(32);
        return CryptographicOperations.FixedTimeEquals(key, storedKey);
    }
}