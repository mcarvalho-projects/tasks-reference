package cheat.tasks;

// Why this file exists:
// - Minimal endpoint shapes (working, but simple)

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class TasksController {
  private final TaskRepo repo;
  private final RabbitPublisher publisher;

  public TasksController(TaskRepo repo, RabbitPublisher publisher) {
    this.repo = repo;
    this.publisher = publisher;
  }

  @GetMapping("/health")
  public Object health() { return new Object() { public boolean ok = true; }; }

  @GetMapping("/tasks")
  public List<TaskItem> tasks() {
    return repo.findAll();
  }

  @PostMapping("/tasks")
  public TaskItem create(@RequestBody TaskItem body) {
    body.done = false;
    TaskItem saved = repo.save(body);

    publisher.publishTaskCreated(saved.title);
    return saved;
  }

  @PatchMapping("/tasks/{id}/done")
  public Object toggleDone(@PathVariable Long id) {
    var taskOpt = repo.findById(id);
    if (taskOpt.isEmpty()) return new Object() { public String error = "not found"; };

    var task = taskOpt.get();
    task.done = !task.done;
    repo.save(task);

    return task;
  }
}
