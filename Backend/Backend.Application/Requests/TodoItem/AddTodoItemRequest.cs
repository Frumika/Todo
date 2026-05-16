namespace Backend.Application.DTOs.TodoItem;

public class AddTodoItemRequest
{
    public int ProjectId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}