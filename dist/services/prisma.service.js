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
exports.TaskPrisma = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class TaskPrisma {
    getAllTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const get = yield prisma.post.findMany();
                return get;
            }
            catch (error) {
                console.error("Error ao buscar tarefa vindo do prima Service:", error);
            }
            finally {
                yield prisma.$disconnect();
            }
        });
    }
    createTask(_a) {
        return __awaiter(this, arguments, void 0, function* ({ title, completed }) {
            try {
                const create = yield prisma.post.create({
                    data: {
                        title: title,
                        completed: completed,
                    },
                });
                return create;
            }
            catch (error) {
                console.error("Error ao criar tarefa vindo do prima Service:", error);
            }
            finally {
                yield prisma.$disconnect();
            }
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const del = yield prisma.post.delete({
                    where: {
                        id: id,
                    },
                });
                return del;
            }
            catch (error) {
                console.error("Error ao criar tarefa vindo do prima Service:", error);
            }
            finally {
                yield prisma.$disconnect();
            }
        });
    }
    updated(id_1, _a) {
        return __awaiter(this, arguments, void 0, function* (id, { title, completed }) {
            try {
                const up = yield prisma.post.update({
                    where: {
                        id: id,
                    },
                    data: {
                        title: title,
                        completed: completed,
                    },
                });
                return up;
            }
            catch (error) {
                console.error("Error ao criar tarefa vindo do prima Service:", error);
            }
            finally {
                yield prisma.$disconnect();
            }
        });
    }
}
exports.TaskPrisma = TaskPrisma;
