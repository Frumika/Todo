using Backend.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.DataAccess.Persistence.MySQL.Contexts;

public class MainDbContext : DbContext
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Project> Projects => Set<Project>();
    public DbSet<TodoItem> TodoItems => Set<TodoItem>();

    public MainDbContext(DbContextOptions<MainDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(MainDbContext).Assembly);
    }
}