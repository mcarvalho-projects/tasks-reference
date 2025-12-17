// Why this file exists:
// - Minimal MVC wiring + EF Core registration

using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.WebHost.UseUrls("http://localhost:5101");

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDb>(opt => opt.UseSqlite("Data Source=tasks.db"));

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDb>();
    db.Database.EnsureCreated();
}

app.MapControllers();
app.Run();
