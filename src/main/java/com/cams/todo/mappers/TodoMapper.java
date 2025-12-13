package com.cams.todo.mappers;

import com.cams.todo.dtos.TodoCreateRequest;
import com.cams.todo.dtos.TodoResponse;
import com.cams.todo.entities.Todo;
import org.mapstruct.Mapper;

@Mapper(componentModel = "Spring")
public interface TodoMapper {
    Todo toEntity(TodoCreateRequest todoDto);
    TodoCreateRequest toDto(Todo todoEntity);
    TodoResponse toResponse(Todo todoEntity);


}

