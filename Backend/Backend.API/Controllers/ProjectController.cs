using System.Security.Claims;
using Backend.API.Extensions;
using Backend.Application.Requests.Project;
using Backend.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Backend.API.Controllers;

[ApiController]
[Route("api/project")]
public class ProjectController : ControllerBase
{
    private readonly ProjectService _projectService;

    public ProjectController(ProjectService projectService)
    {
        _projectService = projectService;
    }

    [Authorize]
    [HttpGet("projects")]
    public async Task<IActionResult> GetProjects()
    {
        int? userId = User.GetUserId();
        if (userId is null) return Unauthorized();

        var response = await _projectService.GetProjectsAsync((int)userId);
        return response.ToHttpResponse();
    }

    [Authorize]
    [HttpPost("add")]
    public async Task<IActionResult> AddProject(AddProjectRequest request)
    {
        int? userId = User.GetUserId();
        if (userId is null) return Unauthorized();

        var response = await _projectService.AddProjectAsync((int)userId, request);
        return response.ToHttpResponse();
    }

    [Authorize]
    [HttpPatch("update")]
    public async Task<IActionResult> UpdateProject(UpdateProjectRequest request)
    {
        int? userId = User.GetUserId();
        if (userId is null) return Unauthorized();

        var response = await _projectService.UpdateProjectAsync((int)userId, request);
        return response.ToHttpResponse();
    }

    [Authorize]
    [HttpDelete("delete")]
    public async Task<IActionResult> DeleteProject(DeleteProjectRequest request)
    {
        int? userId = User.GetUserId();
        if (userId is null) return Unauthorized();

        var response = await _projectService.DeleteProjectAsync((int)userId, request);
        return response.ToHttpResponse();
    }
}