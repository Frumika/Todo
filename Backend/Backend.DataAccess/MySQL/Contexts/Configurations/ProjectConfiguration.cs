using Backend.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.DataAccess.MySQL.Contexts.Configurations;

public class ProjectConfiguration : IEntityTypeConfiguration<Project>
{
    public void Configure(EntityTypeBuilder<Project> entity)
    {
        entity.ToTable("projects");

        entity.HasKey(p => p.Id);
        entity.Property(p => p.Id)
            .HasColumnName("id")
            .ValueGeneratedOnAdd();

        entity.Property(p => p.Name)
            .HasColumnName("name")
            .HasMaxLength(100)
            .IsRequired();

        entity.Property(p => p.CreatedAt)
            .HasColumnName("created_at")
            .IsRequired();

        entity.Property(p => p.UpdatedAt)
            .HasColumnName("updated_at");

        entity.Property(p => p.UserId)
            .HasColumnName("user_id")
            .IsRequired();

        entity.HasOne(p => p.User)
            .WithMany(u => u.Projects)
            .HasForeignKey(p => p.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        entity.HasIndex(p => p.UserId);
    }
}