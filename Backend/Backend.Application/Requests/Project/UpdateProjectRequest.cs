namespace Backend.Application.Requests.Project;

public class UpdateProjectRequest
{
    public int ProjectId { get; set; }
    public string Name { get; set; } = string.Empty;
}