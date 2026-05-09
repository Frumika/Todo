using Backend.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.DataAccess.MySQL.Contexts.Configurations;

public class TodoItemConfiguration : IEntityTypeConfiguration<TodoItem>
{
    public void Configure(EntityTypeBuilder<TodoItem> entity)
    {
        entity.ToTable("todo_items");

        entity.HasKey(ti => ti.Id);
        entity.Property(ti => ti.Id)
            .HasColumnName("id")
            .ValueGeneratedOnAdd();

        entity.Property(ti => ti.Title)
            .HasColumnName("title")
            .HasMaxLength(200)
            .IsRequired();

        entity.Property(ti => ti.Description)
            .HasColumnName("description")
            .HasColumnType("TEXT");

        entity.Property(ti => ti.IsCompleted)
            .HasColumnName("is_completed")
            .IsRequired();

        entity.Property(ti => ti.CreatedAt)
            .HasColumnName("created_at")
            .IsRequired();

        entity.Property(ti => ti.UpdatedAt)
            .HasColumnName("updated_at");

        entity.Property(ti => ti.ProjectId)
            .HasColumnName("project_id")
            .IsRequired();

        entity.HasOne(ti => ti.Project)
            .WithMany(p => p.TodoItems)
            .HasForeignKey(ti => ti.ProjectId)
            .OnDelete(DeleteBehavior.Cascade);

        entity.HasIndex(ti => ti.ProjectId);
    }
}