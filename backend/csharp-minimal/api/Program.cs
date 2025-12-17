// Why this file exists:
// - Minimal API endpoint shapes + minimal EF Core wiring (works, but simple)

using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Force a consistent port for the frontends in this cheat reference
builder.WebHost.UseUrls("http://localhost:5101");

// EF Core (SQLite): minimal DbContext registration
builder.Services.AddDbContext<AppDb>(opt =>
    opt.UseSqlite("Data Source=tasks.db"));

var app = builder.Build();

// Auto-create DB schema from the model (cheat-sheet style)
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDb>();
    db.Database.EnsureCreated();
}

app.MapGet("/health", () => Results.Ok(new { ok = true }));

app.MapGet("/tasks", async (AppDb db) =>
{
    var tasks = await db.Tasks.OrderBy(t => t.Id).ToListAsync();
    return Results.Ok(tasks);
});

app.MapPost("/tasks", async (TaskCreateDto body, AppDb db) =>
{
    var task = new TaskItem { Title = body.title, Done = false };
    db.Tasks.Add(task);
    await db.SaveChangesAsync();

    TaskPublisher.PublishTaskCreated(task.Title);
    return Results.Created($"/tasks/{task.Id}", task);
});

app.MapPatch("/tasks/{id}/done", async (int id, AppDb db) =>
{
    var task = await db.Tasks.FindAsync(id);
    if (task is null) return Results.NotFound();

    task.Done = !task.Done; // toggle
    await db.SaveChangesAsync();

    return Results.Ok(task);
});

app.Run();

public record TaskCreateDto(string title);
