import { NextFunction, Request, Response } from 'express';
import * as taskService from '../services/taskService';

export const getAllTasks = (req: Request, res: Response, next: NextFunction) => {
    taskService
        .getAllTasks()
        .then(data => res.json(data))
        .catch(err => next(err))
};


export const addTask = (req: Request, res: Response, next: NextFunction) => {
    const name = req.body.name;
    taskService.addTask(name)
    .then(data=>res.json(data))
    .catch(err=>next(err));
};


export const deleteTask = (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    taskService.deleteTask(id)
    .then(data=>res.json(data))
    .catch(err=>next(err));

};


export const editTask = (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    const name = req.body.name;
    const is_completed =req.body.is_completed;

    taskService.editTask(id,name,is_completed)
    .then(data=>res.json(data))
    .catch(err=>next(err));
};