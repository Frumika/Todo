namespace Backend.Application.Statuses;

public abstract record NotFound : Status;

public record TokenNotFound : NotFound
{
    public override string Code => "token_not_found";
}

