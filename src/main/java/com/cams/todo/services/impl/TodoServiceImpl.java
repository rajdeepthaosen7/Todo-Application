package com.cams.todo.services.impl;

import com.cams.todo.dtos.TodoCreateRequest;
import com.cams.todo.dtos.TodoResponse;
import com.cams.todo.dtos.TodoUpdateRequest;
import com.cams.todo.entities.Todo;
import com.cams.todo.exceptions.TodoNotFoundException;
import com.cams.todo.mappers.TodoMapper;
import com.cams.todo.repositories.TodoRepository;
import org.springframework.transaction.annotation.Transactional;
import com.cams.todo.services.TodoService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
@Transactional
public class TodoServiceImpl implements TodoService {

    private final TodoMapper todoMapper;
    private final TodoRepository todoRepository;

    @Override
    public TodoResponse createTodo(TodoCreateRequest dto) {
        Todo entity = todoMapper.toEntity(dto);
        Todo saved = todoRepository.save(entity);
        return todoMapper.toResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TodoResponse> getTodos(Pageable pageable) {
        return todoRepository.findAll(pageable)
                .map(todoMapper::toResponse);
    }

    @Override
    public TodoResponse updateTodo(Long id, TodoUpdateRequest dto) {
        Todo entity = todoRepository.findById(id)
                .orElseThrow(() -> new TodoNotFoundException(id));

        todoMapper.updateEntityFromDto(dto, entity);
        Todo saved = todoRepository.save(entity);

        return todoMapper.toResponse(saved);
    }

    @Override
    public void deleteById(Long id) {
        if (!todoRepository.existsById(id)) {
            throw new TodoNotFoundException(id);
        }
        todoRepository.deleteById(id);
    }
}