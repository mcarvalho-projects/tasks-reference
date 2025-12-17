// Why this file exists:
// - Minimal controller endpoint shapes (works, but simple)

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Services;

namespace Api.Controllers;

[ApiController]
public class TasksController : ControllerBase
{
    [HttpGet("/health")]
    public object Health() => new { ok = true };

    [HttpGet("/tasks")]
    public async Task<object> Tasks([FromServices] AppDb db)
        => await db.Tasks.OrderBy(t => t.Id).ToListAsync();

    [HttpPost("/tasks")]
    public async Task<object> Create([FromBody] TaskCreateDto body, [FromServices] AppDb db)
    {
        var task = new TaskItem { Title = body.title, Done = false };
        db.Tasks.Add(task);
        await db.SaveChangesAsync();

        new TaskPublisher().PublishTaskCreated(task.Title);
        return task;
    }

    [HttpPatch("/tasks/{id}/done")]
    public async Task<IActionResult> ToggleDone([FromRoute] int id, [FromServices] AppDb db)
    {
        var task = await db.Tasks.FindAsync(id);
        if (task is null) return NotFound();

        task.Done = !task.Done;
        await db.SaveChangesAsync();
        return Ok(task);
    }
}
