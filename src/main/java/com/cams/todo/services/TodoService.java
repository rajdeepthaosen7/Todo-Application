package com.cams.todo.services;

import com.cams.todo.dtos.TodoDto;

import java.util.List;

public interface TodoService {
    TodoDto createTask(TodoDto dto);
    List<TodoDto> getList();
    void delete(Long id);
}
