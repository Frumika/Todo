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
    [HttpPost("create")]
    public async Task<IActionResult> CreateProject([FromBody] CreateProjectRequest request)
    {
        int? userId = User.GetUserId();
        if (userId is null) return Unauthorized();

        var response = await _projectService.CreateProjectAsync((int)userId, request);
        return response.ToHttpResponse();
    }

    [Authorize]
    [HttpPatch("update")]
    public async Task<IActionResult> UpdateProject([FromBody] UpdateProjectRequest request)
    {
        int? userId = User.GetUserId();
        if (userId is null) return Unauthorized();

        var response = await _projectService.UpdateProjectAsync((int)userId, request);
        return response.ToHttpResponse();
    }

    [Authorize]
    [HttpDelete("delete/{projectId:int}")]
    public async Task<IActionResult> DeleteProject([FromRoute] int projectId)
    {
        int? userId = User.GetUserId();
        if (userId is null) return Unauthorized();

        var response = await _projectService.DeleteProjectAsync((int)userId, projectId);
        return response.ToHttpResponse();
    }
}