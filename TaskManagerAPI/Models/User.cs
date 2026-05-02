using System.Text.Json.Serialization;

public class User
{
    public int Id { get; set; }

    public string Username { get; set; } = string.Empty;

    [JsonIgnore]   // ✅ IMPORTANT
    public string Password { get; set; } = string.Empty;

    public string Role { get; set; } = "User";
}