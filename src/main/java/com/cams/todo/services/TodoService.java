package com.cams.todo.services;

import com.cams.todo.dtos.TodoCreateRequest;
import com.cams.todo.dtos.TodoResponse;
import com.cams.todo.dtos.TodoUpdateRequest;

import java.util.List;

public interface TodoService {

    TodoResponse createTodo(TodoCreateRequest dto);

    List<TodoResponse> getList();

    void deleteById(Long id);

    TodoResponse updateTodo(Long id, TodoUpdateRequest dto);
}
