package com.ntk.TaskFlow.DTO.Entities;

import java.util.List;

public record WorkspaceDTO(Integer id, String name, String description, List<BoardDTO> boards) {
}
