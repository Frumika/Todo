using Backend.DataAccess.MySQL.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Backend.API.Extensions;

public static class ApplicationBuilderExtensions
{
    extension(WebApplication app)
    {
        public void InitializeApplication()
        {
            app.ApplyMigrations()
                .WarmupDatabase();
        }

        public WebApplication UseApplicationPipeline()
        {
            app.UseCors("AllowAllOrigins");
            app.MapControllers();
            app.MapGet("/api/health", () => Results.Ok());
            app.AddSwagger();

            return app;
        }

        private WebApplication ApplyMigrations()
        {
            using var scope = app.Services.CreateScope();
            var mainDb = scope.ServiceProvider.GetRequiredService<MainDbContext>();
            mainDb.Database.Migrate();

            return app;
        }

        private WebApplication WarmupDatabase()
        {
            using var scope = app.Services.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<MainDbContext>();
            _ = dbContext.Users.Any();

            return app;
        }

        private WebApplication AddSwagger()
        {
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            return app;
        }
    }
}