"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksController = void 0;
const prisma_service_1 = require("../services/prisma.service");
const taskPrisma = new prisma_service_1.TaskPrisma();
class TasksController {
    getAllTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const get = yield taskPrisma.getAllTasks();
                if (get && get.length > 0) {
                    res.status(201).json(get);
                }
                else {
                    res.json([]);
                }
            }
            catch (error) {
                res.status(501).json(`Erro interno encontrado: ${error}`);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, completed } = req.body;
            if (!title && !completed) {
                res.status(501).json("Titulo e/ou completed não passados");
            }
            try {
                const create = yield taskPrisma.createTask({
                    title,
                    completed,
                });
                if (create) {
                    res.status(201).json(create);
                }
                else {
                    res.json("Problema encontrado, tente novamente mais tarde");
                }
            }
            catch (error) {
                res.status(501).json(`Erro interno encontrado: ${error}`);
            }
        });
    }
    deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const idToNumber = Number(id);
            if (!idToNumber) {
                res.json("Está faltando ser passado o id como um parametro na url");
            }
            try {
                const del = yield taskPrisma.deleteById(idToNumber);
                if (del) {
                    res.status(200).json("Tarefa excluida");
                }
                else {
                    res.json("Problema encontrado ao deletar, tente novamente mais tarde");
                }
            }
            catch (error) {
                res.status(501).json(`Erro interno encontrado: ${error}`);
            }
        });
    }
    concludeTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const idToNumber = Number(id);
            const { title, completed } = req.body;
            if (!id && !completed)
                res.json("Id e Completed vazios");
            try {
                const up = yield taskPrisma.updated(idToNumber, {
                    title,
                    completed,
                });
                if (up) {
                    res.status(201).json("Tarefa concluída");
                }
                else {
                    res.json("Não foi possível concluir as tarefas");
                }
            }
            catch (error) {
                res.status(501).json(`Error interno encontrado: ${error}`);
            }
        });
    }
}
exports.TasksController = TasksController;
