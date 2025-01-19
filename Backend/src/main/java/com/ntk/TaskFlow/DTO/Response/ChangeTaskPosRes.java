package com.ntk.TaskFlow.DTO.Response;

import java.util.HashMap;

public record ChangeTaskPosRes(HashMap<Integer,Integer> prevStage, HashMap<Integer,Integer> currentStage) {
}
