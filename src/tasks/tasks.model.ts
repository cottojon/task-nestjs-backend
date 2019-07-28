export interface Task{
    id: string;
    title: string;
    description: string;
    status: TaskStatus; // we only allow one of the three values in our TaskStatus enum
}




// typescript enum used here
export enum TaskStatus{
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}