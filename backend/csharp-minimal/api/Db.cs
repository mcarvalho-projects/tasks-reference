// Why this file exists:
// - EF Core DbContext + Task entity shape

using Microsoft.EntityFrameworkCore;

public class AppDb : DbContext
{
    public AppDb(DbContextOptions<AppDb> options) : base(options) { }
    public DbSet<TaskItem> Tasks => Set<TaskItem>();
}

public class TaskItem
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public bool Done { get; set; }
}
