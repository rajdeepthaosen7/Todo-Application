package com.cams.todo.services;

import com.cams.todo.dtos.TodoCreateRequest;
import com.cams.todo.dtos.TodoResponse;
import com.cams.todo.dtos.TodoUpdateRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TodoService {

    TodoResponse createTodo(TodoCreateRequest dto);

    Page<TodoResponse> getTodos(Pageable pageable);

    void deleteById(Long id);

    TodoResponse updateTodo(Long id, TodoUpdateRequest dto);
}
