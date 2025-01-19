package com.ntk.TaskFlow.DTO.Request;

import java.util.HashMap;

public record ChangeProjectStagePosReq(HashMap<Integer,Integer> stages) {
}
