using Microsoft.EntityFrameworkCore;


namespace Backend.DataAccess.MySQL.Contexts;

public class MainDbContext : DbContext
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(MainDbContext).Assembly);
    }
}