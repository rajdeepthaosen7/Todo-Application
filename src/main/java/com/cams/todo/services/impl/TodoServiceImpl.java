package com.cams.todo.services.impl;

import com.cams.todo.dtos.TodoDto;
import com.cams.todo.entities.TodoEntity;
import com.cams.todo.mappers.TodoMapper;
import com.cams.todo.repositories.TodoRepository;
import com.cams.todo.services.TodoService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TodoServiceImpl implements TodoService {

    private final TodoMapper todoMapper;
    private final TodoRepository todoRepository;

    @Override
    public TodoDto createTask(TodoDto taskDto){
        TodoEntity entity = todoMapper.toEntity(taskDto);
        TodoEntity saved = todoRepository.save(entity);
        return todoMapper.toDto(saved);
    }

    @Override
    public List<TodoDto> getList(){
        return todoRepository.findAll()
                .stream()
                .map(todoMapper::toDto)
                .toList();
    }

    @Override
    public void delete(Long id){
        todoRepository.deleteById(String.valueOf(id));
    }
}
