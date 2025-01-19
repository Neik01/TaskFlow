package com.ntk.TaskFlow.DTO.Request;


import java.util.HashMap;

public record ChangeTaskPosReq(HashMap<Integer,Integer> prevStage, HashMap<Integer,Integer> currentStage,
                                Integer prevStageId, Integer currentStageId) {
}
