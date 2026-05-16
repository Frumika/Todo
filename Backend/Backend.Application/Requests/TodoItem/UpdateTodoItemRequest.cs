namespace Backend.Application.Requests.TodoItem;

public class UpdateTodoItemRequest
{
    public int TodoItemId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public bool IsCompleted { get; set; }
}