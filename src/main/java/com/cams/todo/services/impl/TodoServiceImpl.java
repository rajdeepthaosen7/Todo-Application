package com.cams.todo.services.impl;

import com.cams.todo.dtos.TodoCreateRequest;
import com.cams.todo.dtos.TodoResponse;
import com.cams.todo.dtos.TodoUpdateRequest;
import com.cams.todo.entities.Todo;
import com.cams.todo.mappers.TodoMapper;
import com.cams.todo.repositories.TodoRepository;
import com.cams.todo.services.TodoService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TodoServiceImpl implements TodoService {

    private final TodoMapper todoMapper;
    private final TodoRepository todoRepository;

    @Override
    public TodoResponse createTodo(TodoCreateRequest taskDto){
        Todo entity = todoMapper.toEntity(taskDto);
        Todo saved = todoRepository.save(entity);
        return todoMapper.toResponse(saved);
    }

    public Page<TodoResponse> getTodos(Pageable pageable){
        return todoRepository
                .findAll(pageable)
                .map(todoMapper::toResponse);
    }

    @Override
    public void deleteById(Long id){
        todoRepository.deleteById(id);
    }

    @Override
    public TodoResponse updateTodo(Long id, TodoUpdateRequest dto) {
        Todo entity = todoRepository.findById(id).
                orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));
        todoMapper.updateEntityFromDto(dto, entity);
        Todo saved = todoRepository.save(entity);
        return todoMapper.toResponse(saved);
    }
}
