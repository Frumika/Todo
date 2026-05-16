using Backend.API.Extensions;
using Backend.Application.DTOs.TodoItem;
using Backend.Application.Requests.TodoItem;
using Backend.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Backend.API.Controllers;

[ApiController]
[Route("api/todo_item")]
public class TodoItemController : ControllerBase
{
    private readonly TodoItemService _projectService;

    public TodoItemController(TodoItemService todoItemService)
    {
        _projectService = todoItemService;
    }

    [Authorize]
    [HttpGet("todo_items")]
    public async Task<IActionResult> GetTodoItems(GetTodoItemsRequest request)
    {
        int? userId = User.GetUserId();
        if (userId is null) return Unauthorized();

        var response = await _projectService.GetTodoItemsAsync((int)userId, request);
        return response.ToHttpResponse();
    }

    [Authorize]
    [HttpPost("add")]
    public async Task<IActionResult> AddTodoItem(AddTodoItemRequest request)
    {
        int? userId = User.GetUserId();
        if (userId is null) return Unauthorized();

        var response = await _projectService.AddTodoItemAsync((int)userId, request);
        return response.ToHttpResponse();
    }

    [Authorize]
    [HttpPatch("update")]
    public async Task<IActionResult> UpdateTodoItem(UpdateTodoItemRequest request)
    {
        int? userId = User.GetUserId();
        if (userId is null) return Unauthorized();

        var response = await _projectService.UpdateTodoItemAsync((int)userId, request);
        return response.ToHttpResponse();
    }

    [Authorize]
    [HttpDelete("delete")]
    public async Task<IActionResult> DeleteTodoItem(DeleteTodoItemRequest request)
    {
        int? userId = User.GetUserId();
        if (userId is null) return Unauthorized();

        var response = await _projectService.DeleteTodoItemAsync((int)userId, request);
        return response.ToHttpResponse();
    }
}