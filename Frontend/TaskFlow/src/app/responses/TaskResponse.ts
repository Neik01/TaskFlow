export interface TaskResponse{

    id: number;
    title: string;
    description: string;
    status: "IN_PROGRESS" | "COMPLETED" | "PENDING"|"OVERDUE"; // Enum-like typing for status
    priority: "HIGH" | "MEDIUM" | "LOW"; // Enum-like typing for priority
    deadline: Date;
    createdAt: Date;
    updatedAt: Date;
    collaborator: string | null; // Ca
}