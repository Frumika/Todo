using System.Text;
using System.Text.Json.Serialization;
using Backend.Application.Services;
using Backend.DataAccess.MySQL.Contexts;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;

namespace Backend.API.Extensions;

public static class ServiceCollectionExtensions
{
    extension(IServiceCollection services)
    {
        public IServiceCollection AddServices(IConfiguration config)
        {
            services
                .ConnectMySql(config)
                .AddCorsPolicy()
                .AddJwtAuthentication(config)
                .AddApplicationServices(config)
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

        private IServiceCollection AddApplicationServices(IConfiguration config)
        {
            services.AddScoped<TokenService>(_ =>
            {
                IConfigurationSection jwt = config.GetSection("Jwt");

                return new TokenService(
                    jwt["Secret"]!,
                    jwt["Issuer"]!,
                    jwt["Audience"]!,
                    int.Parse(jwt["ExpiresMinutes"]!)
                );
            });

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

        private IServiceCollection AddJwtAuthentication(
            IConfiguration config)
        {
            IConfigurationSection jwt = config.GetSection("Jwt");

            string secret = jwt["Secret"]!;

            services
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters =
                        new TokenValidationParameters
                        {
                            ValidateIssuer = true,
                            ValidateAudience = true,
                            ValidateLifetime = true,
                            ValidateIssuerSigningKey = true,

                            ValidIssuer = jwt["Issuer"],
                            ValidAudience = jwt["Audience"],

                            IssuerSigningKey =
                                new SymmetricSecurityKey(
                                    Encoding.UTF8.GetBytes(secret))
                        };
                });

            services.AddScoped<TokenService>(_ =>
                new TokenService(
                    secret,
                    jwt["Issuer"]!,
                    jwt["Audience"]!,
                    int.Parse(jwt["ExpiresMinutes"]!)
                ));

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