import { Request, Response } from "express";

import { TaskPrisma, UpdatedTask } from "../services/prisma.service";
const taskPrisma = new TaskPrisma();

export class TasksController {
    async getAllTasks(req: Request, res: Response) {
        try {
            const get = await taskPrisma.getAllTasks();
            if (get && get.length > 0) {
                res.status(201).json(get);
            } else {
                res.json([]);
            }
        } catch (error) {
            res.status(501).json(`Erro interno encontrado: ${error}`);
        }
    }

    async create(req: Request, res: Response) {
        const { title, completed } = req.body;
        if (!title && !completed) {
            res.status(501).json("Titulo e/ou completed não passados");
        }
        try {
            const create = await taskPrisma.createTask({
                title,
                completed,
            });
            if (create) {
                res.status(201).json(create);
            } else {
                res.json("Problema encontrado, tente novamente mais tarde");
            }
        } catch (error) {
            res.status(501).json(`Erro interno encontrado: ${error}`);
        }
    }

    async deleteById(req: Request, res: Response) {
        const { id } = req.params;
        const idToNumber = Number(id);

        if (!idToNumber) {
            res.json("Está faltando ser passado o id como um parametro na url");
        }
        try {
            const del = await taskPrisma.deleteById(idToNumber);

            if (del) {
                res.status(200).json("Tarefa excluida");
            } else {
                res.json(
                    "Problema encontrado ao deletar, tente novamente mais tarde"
                );
            }
        } catch (error) {
            res.status(501).json(`Erro interno encontrado: ${error}`);
        }
    }

    async concludeTask(req: Request, res: Response) {
        const { id } = req.params;
        const idToNumber = Number(id);

        const { title, completed } = req.body as UpdatedTask;
        if (!id && !completed) res.json("Id e Completed vazios");

        try {
            const up = await taskPrisma.updated(idToNumber, {
                title,
                completed,
            });
            if (up) {
                res.status(201).json("Tarefa concluída");
            } else {
                res.json("Não foi possível concluir as tarefas");
            }
        } catch (error) {
            res.status(501).json(`Error interno encontrado: ${error}`);
        }
    }
}
