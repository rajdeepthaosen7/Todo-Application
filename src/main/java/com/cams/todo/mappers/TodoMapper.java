package com.cams.todo.mappers;

import com.cams.todo.dtos.TodoCreateRequest;
import com.cams.todo.dtos.TodoResponse;
import com.cams.todo.dtos.TodoUpdateRequest;
import com.cams.todo.entities.Todo;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface TodoMapper {

    // CREATE
    Todo toEntity(TodoCreateRequest dto);

    // RESPONSE
    TodoResponse toResponse(Todo entity);

    // PATCH (partial update)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(TodoUpdateRequest dto, @MappingTarget Todo entity);
}