using Backend.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.DataAccess.Persistence.MySQL.Contexts.Configurations;

public class UserConfiguration  : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> entity)
    {
        entity.ToTable("users");

        entity.HasKey(u => u.Id);
        entity.Property(u => u.Id)
            .HasColumnName("id")
            .ValueGeneratedOnAdd();

        entity.Property(u => u.Login)
            .HasColumnName("login")
            .HasMaxLength(100)
            .IsRequired();

        entity.Property(u => u.HashPassword)
            .HasColumnName("hash_password")
            .HasMaxLength(256)
            .IsRequired();

        entity.HasIndex(u => u.Login).IsUnique();
    }
}