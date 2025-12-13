package com.cams.todo.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record TodoCreateRequest(

        @NotBlank(message = "Title is required")
        @Size(max = 100)
        String title,

        @Size(max = 255)
        String description,

        LocalDate dueDate){
}
