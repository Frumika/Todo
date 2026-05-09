namespace Backend.Application.Statuses;

public abstract record Unauthorized : Status;

public record InvalidLogin : Unauthorized
{
    public override string Code => "invalid_login";
}

public record InvalidPassword : Unauthorized
{
    public override string Code => "invalid_password";
}

public record TokenExpired : Unauthorized
{
    public override string Code => "token_expired";
}

public record TokenRevoked : Unauthorized
{
    public override string Code => "token_revoked";
}