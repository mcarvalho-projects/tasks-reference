package cheat.tasks;

// Why this file exists:
// - JPA entity shape (ORM-first)

import jakarta.persistence.*;

@Entity
public class TaskItem {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  public Long id;

  public String title;
  public boolean done;
}
