package com.cams.todo.dtos;

import java.time.LocalDate;

public record TodoDto (String title, String description, LocalDate dueDate){
}
