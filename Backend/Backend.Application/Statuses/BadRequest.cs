namespace Backend.Application.Statuses;

public record BadRequest : Status
{
    public override string Code => "bad_request";
}