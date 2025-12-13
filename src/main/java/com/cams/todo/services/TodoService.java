package com.cams.todo.services;

import com.cams.todo.dtos.TodoCreateRequest;
import com.cams.todo.dtos.TodoResponse;

import java.util.List;

public interface TodoService {
    TodoResponse createTodo(TodoCreateRequest dto);
    List<TodoResponse> getList();
    void deleteById(Long id);
}
