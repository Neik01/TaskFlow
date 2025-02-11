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

export interface Workspace {
    id: number; // Unique identifier for the workspace
    name: string; // Name of the workspace
    description?: string; // Optional description of the workspace
    boards: BoardResponse[]; // List of boards associated with the workspace
}
export interface BoardResponse {
    id: number;
    name: string;
    description: string;
    stages: Stage[];
    tasks: TaskResponse[];
}