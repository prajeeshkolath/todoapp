// user.interface.ts
export interface Task {
    _id?:string,
    task_name: string; 
    assigned_user?: string; 
    assigned_user_name?:string;
    created_by_user?:string;
    created_by_user_name?:string;
    last_updated_on?:string;
    created_on?:Date;    
    due_by?:Date;
    
}