using System.Text.Json.Serialization;
using Backend.Application.Services;
using Backend.DataAccess.MySQL.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi;

namespace Backend.API.Extensions;

public static class ServiceCollectionExtensions
{
    extension(IServiceCollection services)
    {
        public IServiceCollection AddApplicationServices(IConfiguration config)
        {
            services
                .ConnectMySql(config)
                .AddCorsPolicy()
                .AddApplicationControllers()
                .AddSwagger();

            return services;
        }

        private IServiceCollection ConnectMySql(IConfiguration config)
        {
            string? connectionString = config["Databases:MySql:Main"];
            services.AddDbContext<MainDbContext>(options => options.UseMySql(
                connectionString,
                ServerVersion.AutoDetect(connectionString)
            ));
            return services;
        }

        private IServiceCollection AddCorsPolicy()
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins",
                    policy => policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });
            return services;
        }

        private IServiceCollection AddApplicationServices()
        {
            services.AddScoped<TokenService>();
            services.AddScoped<AuthService>();

            return services;
        }

        private IServiceCollection AddApplicationControllers()
        {
            services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            });

            return services;
        }

        private IServiceCollection AddSwagger()
        {
            services.AddSwaggerGen(options =>
            {
                options.CustomSchemaIds(type => type.FullName);
                options.AddServer(
                    new OpenApiServer
                    {
                        Url = "http://localhost:8801",
                        Description = "Main server"
                    }
                );
            });
            return services;
        }
    }
}