using Backend.DataAccess.MySQL.Contexts;
using Microsoft.EntityFrameworkCore;


namespace Backend.Application.Services;

public class CleanupService
{
    private readonly MainDbContext _dbContext;

    private const int BatchSize = 10;

    public CleanupService(MainDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task CleanupExpiredOrdersAsync(CancellationToken cancellationToken = default)
    {
        DateTime currentTime = DateTime.UtcNow;

        await _dbContext.RefreshTokens
            .Where(rt => rt.IsRevoked || rt.ExpiresAt < currentTime)
            .OrderBy(rt => rt.ExpiresAt)
            .Take(BatchSize)
            .ExecuteDeleteAsync(cancellationToken);
    }
}