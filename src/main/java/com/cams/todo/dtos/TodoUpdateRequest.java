package com.cams.todo.dtos;

import com.cams.todo.enums.Priority;
import com.cams.todo.enums.Status;

import java.time.LocalDate;

public record TodoUpdateRequest(
        String title,
        String description,
        LocalDate dueDate,
        Priority priority,
        Status status
) {
}
