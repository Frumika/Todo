namespace Backend.Application.Requests.TodoItem;

public class DeleteTodoItemRequest
{
    public int ProjectId { get; set; }
    public int TodoItemId { get; set; }
}