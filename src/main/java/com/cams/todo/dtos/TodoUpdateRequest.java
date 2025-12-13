package com.cams.todo.dtos;

import java.time.LocalDate;

public record TodoUpdateRequest(
        String title,
        String description,
        LocalDate dueDate
) {
}
