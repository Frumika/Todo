using Backend.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Backend.DataAccess.Persistence.MySQL.Contexts.Configurations;

public class RefreshTokenConfiguration : IEntityTypeConfiguration<RefreshToken>
{
    public void Configure(EntityTypeBuilder<RefreshToken> entity)
    {
        entity.ToTable("refresh_tokens");

        entity.HasKey(rt => rt.Id);
        entity.Property(rt => rt.Id)
            .HasColumnName("id")
            .ValueGeneratedOnAdd();

        entity.Property(rt => rt.Value)
            .HasColumnName("token")
            .IsRequired();

        entity.Property(rt => rt.ExpiresAt)
            .HasColumnName("expires_at")
            .IsRequired();

        entity.Property(rt => rt.IsRevoked)
            .HasColumnName("is_revoked")
            .HasDefaultValue(false)
            .IsRequired();

        entity.Property(rt => rt.UserId)
            .HasColumnName("user_id")
            .IsRequired();

        entity.HasOne(rt => rt.User)
            .WithMany(rt => rt.RefreshTokens)
            .HasForeignKey(rt => rt.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}