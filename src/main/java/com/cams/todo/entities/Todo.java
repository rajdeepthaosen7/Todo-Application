package com.cams.todo.entities;

import com.cams.todo.enums.Priority;
import com.cams.todo.enums.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "description")
    String description;

    @Column(name = "due_date")
    LocalDate dueDate;

    @Column(name = "created_at")
    @CreatedDate
    LocalDateTime createdAt;

    @Column(name = "updated_at")
    @LastModifiedDate
    LocalDateTime updatedAt;

    @Column(name = "priority")
    @Enumerated(EnumType.STRING)
    Priority priority;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    Status status;

}
