using Backend.Application.DTOs.TodoItem;
using Backend.Application.Requests.TodoItem;
using Backend.Application.Responses;
using Backend.Application.Statuses;
using Backend.DataAccess.MySQL.Contexts;
using Backend.Domain.Models;
using Microsoft.EntityFrameworkCore;


namespace Backend.Application.Services;

public class TodoItemService
{
    private readonly MainDbContext _dbContext;

    public TodoItemService(MainDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Response> GetTodoItemsAsync(int userId, int projectId)
    {
        try
        {
            bool isUserProjectOwner = await IsUserProjectOwner(userId, projectId);
            if (!isUserProjectOwner)
                return Response.Fail(new ProjectNotFound(), "The project wasn't found");

            List<TodoItemDto> todoItems = await _dbContext.TodoItems
                .AsNoTracking()
                .Where(ti => ti.ProjectId == projectId)
                .Select(ti => new TodoItemDto
                {
                    Id = ti.Id,
                    Title = ti.Title,
                    Description = ti.Description ?? null,
                    IsCompleted = ti.IsCompleted,
                    CreatedAt = ti.CreatedAt,
                    UpdatedAt = ti.UpdatedAt
                })
                .ToListAsync();

            return Response.Success(todoItems);
        }
        catch (Exception)
        {
            return Response.Fail(new UnknownError(), "Internal server error");
        }
    }

    public async Task<Response> CreateTodoItemAsync(int userId, int projectId, CreateTodoItemRequest request)
    {
        try
        {
            bool isUserProjectOwner = await IsUserProjectOwner(userId, projectId);
            if (!isUserProjectOwner)
                return Response.Fail(new ProjectNotFound(), "The project wasn't found");

            TodoItem todoItem = new TodoItem
            {
                Title = request.Title,
                Description = request.Description,
                IsCompleted = false,
                CreatedAt = DateTime.UtcNow,
                ProjectId = projectId
            };

            _dbContext.TodoItems.Add(todoItem);
            await _dbContext.SaveChangesAsync();

            TodoItemDto todoItemDto = new TodoItemDto
            {
                Id = todoItem.Id,
                Title = todoItem.Title,
                Description = todoItem.Description,
                IsCompleted = todoItem.IsCompleted,
                CreatedAt = todoItem.CreatedAt,
                UpdatedAt = todoItem.UpdatedAt
            };

            return Response.Success(todoItemDto, "The todoItem was successfully added");
        }
        catch (Exception)
        {
            return Response.Fail(new UnknownError(), "Internal server error");
        }
    }

    public async Task<Response> UpdateTodoItemAsync(int userId, UpdateTodoItemRequest request)
    {
        try
        {
            TodoItem? todoItem = await _dbContext.TodoItems
                .FirstOrDefaultAsync(ti => ti.Id == request.TodoItemId && ti.Project.UserId == userId);

            if (todoItem is null)
                return Response.Fail(new TodoItemNotFound(), "The todo item wasn't found");

            todoItem.Title = request.Title;
            todoItem.Description = request.Description;
            todoItem.IsCompleted = request.IsCompleted;
            todoItem.UpdatedAt = DateTime.UtcNow;

            await _dbContext.SaveChangesAsync();

            TodoItemDto todoItemDto = new TodoItemDto
            {
                Id = todoItem.Id,
                Title = todoItem.Title,
                Description = todoItem.Description,
                IsCompleted = todoItem.IsCompleted,
                CreatedAt = todoItem.CreatedAt,
                UpdatedAt = todoItem.UpdatedAt
            };

            return Response.Success(todoItemDto, "The todo item was successfully updated");
        }
        catch (Exception)
        {
            return Response.Fail(new UnknownError(), "Internal server error");
        }
    }

    public async Task<Response> DeleteTodoItemAsync(int userId, int itemId)
    {
        try
        {
            await _dbContext.TodoItems
                .Where(ti => ti.Id == itemId && ti.Project.UserId == userId)
                .ExecuteDeleteAsync();

            return Response.Success("The todo item was successfully deleted");
        }
        catch (Exception)
        {
            return Response.Fail(new UnknownError(), "Internal server error");
        }
    }

    private async Task<bool> IsUserProjectOwner(int userId, int projectId)
        => await _dbContext.Projects.AnyAsync(p => p.Id == projectId && p.UserId == userId);
}