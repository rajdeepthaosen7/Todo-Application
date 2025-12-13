package com.cams.todo.entities;

import com.cams.todo.enums.Priority;
import com.cams.todo.enums.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TodoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "serial_no")
    Long id;

    @Column(name = "title", nullable = false, length = 255)
    String title;

    @Column(name = "description", nullable = true)
    String description;

    @Column(name = "due_date")
    LocalDate dueDate;

    @Column(name = "created_at")
    LocalDateTime createdAt;

    @Column(name = "updated_at")
    LocalDateTime updatedAt;

    @Column(name = "priority")
    @Enumerated(EnumType.STRING)
    Priority priority;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    Status status;

}
