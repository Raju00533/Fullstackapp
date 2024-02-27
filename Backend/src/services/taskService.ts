import { Task } from '../domain/Task';
import Todo from '../models/TaskModel'

export const getAllTasks = async (): Promise<{ tasks: Task[]; message: string }> => {
    const tasks = await Todo.getAllTasks();
    return {
        tasks: tasks,
        message: 'Tasks fetched successfully',
    };
};



export  const addTask = async(name: string): Promise<{task:Task[]; message: string}> => {
    const task = await Todo.addTask(name);
    
    return{
        task,
        message: 'Task Inserted successfully!!!'
    };

};


export const deleteTask = async(id:number):Promise<{task:Task[]; message: string}> => {
    const task =await Todo.deleteTask(id);

    return{
        task,
        message: 'Task Deleted Successfully !!!'
    };
};

export const editTask = async(id:number, name:string, is_completed: boolean):Promise<{task:Task[]; message:string }> => {
    const task = await Todo.editTask(id, name, is_completed);

    return{
        task,
        message: 'Task updated successfully !!!'
    };

};

