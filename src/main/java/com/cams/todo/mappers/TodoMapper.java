package com.cams.todo.mappers;

import ch.qos.logback.core.model.ComponentModel;
import com.cams.todo.dtos.TodoDto;
import com.cams.todo.entities.TodoEntity;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "Spring")
public interface TodoMapper {
    TodoEntity toEntity(TodoDto todoDto);
    TodoDto toDto(TodoEntity todoEntity);
}

