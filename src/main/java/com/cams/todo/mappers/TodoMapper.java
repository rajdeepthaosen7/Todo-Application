package com.cams.todo.mappers;

import com.cams.todo.dtos.TodoCreateRequest;
import com.cams.todo.dtos.TodoResponse;
import com.cams.todo.dtos.TodoUpdateRequest;
import com.cams.todo.entities.Todo;
import org.mapstruct.*;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface TodoMapper {

    // CREATE
    Todo toEntity(TodoCreateRequest dto);

    // RESPONSE
    TodoResponse toResponse(Todo entity);

    // PATCH
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(TodoUpdateRequest dto, @MappingTarget Todo entity);
}