namespace Backend.Application.Statuses;

public abstract record Conflict : Status;

public record UserAlreadyExists : Conflict
{
    public override string Code => "user_already_exists";
}