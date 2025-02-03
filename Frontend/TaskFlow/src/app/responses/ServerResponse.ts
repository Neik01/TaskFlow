export interface TaskResponse{

    id: number;
    title: string;
    description: string;
    priority: "HIGH" | "MEDIUM" | "LOW"; // Enum-like typing for priority
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "OVERDUE";
    deadline: string | Date | null;  // Allow both string and Date
    createdAt: string | Date;
    updatedAt: string | Date;
    collaborator: string | null; 
    positionInStage:number;
    stage: Stage|null;
}
export interface Stage {
    id:number;
    name: string;
    position:number;
}
export interface BoardResponse {
    id: number;
    name: string;
    description: string;
    stages: Stage[];
    tasks: TaskResponse[];
}