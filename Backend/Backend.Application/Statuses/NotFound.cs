namespace Backend.Application.Statuses;

public abstract record NotFound : Status;

public record TokenNotFound : NotFound
{
    public override string Code => "token_not_found";
}

public record UserNotFound : NotFound
{
    public override string Code => "user_not_found";
}

public record ProjectNotFound : NotFound
{
    public override string Code => "project_not_found";
}

public record TodoItemNotFound : NotFound
{
    public override string Code => "todo_item_not_found";
}