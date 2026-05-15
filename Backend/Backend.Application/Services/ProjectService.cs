using Backend.Application.DTOs.Project;
using Backend.Application.Requests.Project;
using Backend.Application.Responses;
using Backend.Application.Statuses;
using Backend.DataAccess.MySQL.Contexts;
using Backend.Domain.Models;
using Microsoft.EntityFrameworkCore;


namespace Backend.Application.Services;

public class ProjectService
{
    private readonly MainDbContext _dbContext;

    public ProjectService(MainDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Response> GetProjectsAsync(int userId)
    {
        try
        {
            User? user = await _dbContext.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Id == userId);
            if (user is null)
                return Response.Fail(new UserNotFound(), "User not found");

            List<ProjectDto> projectList = await _dbContext.Projects
                .AsNoTracking()
                .Where(p => p.UserId == user.Id)
                .Select(p => new ProjectDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    CreatedAt = p.CreatedAt,
                    UpdatedAt = p.UpdatedAt
                })
                .ToListAsync();

            return Response.Success(projectList);
        }
        catch (Exception)
        {
            return Response.Fail(new UnknownError(), "Internal server error");
        }
    }

    public async Task<Response> AddProjectAsync(int userId, AddProjectRequest request)
    {
        try
        {
            User? user = await _dbContext.Users
                .Include(u => u.Projects)
                .FirstOrDefaultAsync(u => u.Id == userId);
            if (user is null)
                return Response.Fail(new UserNotFound(), "User not found");

            Project project = new()
            {
                Name = request.Name,
                CreatedAt = DateTime.UtcNow,
                UserId = user.Id
            };

            user.Projects ??= new List<Project>();
            user.Projects.Add(project);

            await _dbContext.SaveChangesAsync();

            ProjectDto projectDto = new ProjectDto
            {
                Id = project.Id,
                Name = project.Name,
                CreatedAt = project.CreatedAt,
                UpdatedAt = project.UpdatedAt
            };

            return Response.Success(projectDto, "Project was successfully added");
        }
        catch (Exception)
        {
            return Response.Fail(new UnknownError(), "Internal server error");
        }
    }

    public async Task<Response> UpdateProjectAsync(int userId, UpdateProjectRequest request)
    {
        try
        {
            Project? project = await _dbContext.Projects
                .FirstOrDefaultAsync(p => p.UserId == userId && p.Id == request.ProjectId);

            if (project is null)
                return Response.Fail(new ProjectNotFound(), "Project not found");

            project.Name = request.Name;
            project.UpdatedAt = DateTime.UtcNow;

            await _dbContext.SaveChangesAsync();

            ProjectDto projectDto = new ProjectDto
            {
                Id = project.Id,
                Name = project.Name,
                CreatedAt = project.CreatedAt,
                UpdatedAt = project.UpdatedAt
            };

            return Response.Success(projectDto, "Project was successfully updated");
        }
        catch (Exception)
        {
            return Response.Fail(new UnknownError(), "Internal server error");
        }
    }

    public async Task<Response> DeleteProjectAsync(int userId, DeleteProjectRequest request)
    {
        try
        {
            await _dbContext.Projects
                .Where(p => p.UserId == userId && p.Id == request.ProjectId)
                .ExecuteDeleteAsync();

            return Response.Success("Project was successfully deleted");
        }
        catch (Exception)
        {
            return Response.Fail(new UnknownError(), "Internal server error");
        }
    }
}