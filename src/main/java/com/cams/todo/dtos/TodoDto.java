package com.cams.todo.dtos;

import java.time.LocalDate;

public record TodoDto (String id, String title, LocalDate dueDate){
}
