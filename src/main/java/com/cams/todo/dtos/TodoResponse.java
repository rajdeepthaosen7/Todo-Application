package com.cams.todo.dtos;

import com.cams.todo.enums.Priority;
import com.cams.todo.enums.Status;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record TodoResponse(
        Long id,
        String title,
        String description,
        LocalDate dueDate,
        Status status,
        Priority priority,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}