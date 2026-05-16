namespace Backend.Application.Requests.TodoItem;

public class CreateTodoItemRequest
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
}