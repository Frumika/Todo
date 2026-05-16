using Backend.API.Extensions;
using Backend.Application.Requests.TodoItem;
using Backend.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Backend.API.Controllers;

[ApiController]
[Route("api/todo_item")]
public class TodoItemController : ControllerBase
{
    private readonly TodoItemService _todoItemService;

    public TodoItemController(TodoItemService todoItemService)
    {
        _todoItemService = todoItemService;
    }

    [Authorize]
    [HttpGet("all/{projectId:int}")]
    public async Task<IActionResult> GetTodoItems([FromRoute] int projectId)
    {
        int? userId = User.GetUserId();
        if (userId is null) return Unauthorized();

        var response = await _todoItemService.GetTodoItemsAsync((int)userId, projectId);
        return response.ToHttpResponse();
    }

    [Authorize]
    [HttpPost("create/{projectId:int}")]
    public async Task<IActionResult> CreateTodoItem([FromRoute] int projectId, [FromBody] CreateTodoItemRequest request)
    {
        int? userId = User.GetUserId();
        if (userId is null) return Unauthorized();

        var response = await _todoItemService.CreateTodoItemAsync((int)userId, projectId, request);
        return response.ToHttpResponse();
    }

    [Authorize]
    [HttpPatch("update")]
    public async Task<IActionResult> UpdateTodoItem([FromBody] UpdateTodoItemRequest request)
    {
        int? userId = User.GetUserId();
        if (userId is null) return Unauthorized();

        var response = await _todoItemService.UpdateTodoItemAsync((int)userId, request);
        return response.ToHttpResponse();
    }

    [Authorize]
    [HttpDelete("delete/{itemId:int}")]
    public async Task<IActionResult> DeleteTodoItem([FromRoute] int itemId)
    {
        int? userId = User.GetUserId();
        if (userId is null) return Unauthorized();

        var response = await _todoItemService.DeleteTodoItemAsync((int)userId, itemId);
        return response.ToHttpResponse();
    }
}