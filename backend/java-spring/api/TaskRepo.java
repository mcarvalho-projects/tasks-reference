package cheat.tasks;

// Why this file exists:
// - Small Spring Data repository (lets endpoints work with minimal code)

import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepo extends JpaRepository<TaskItem, Long> {}
