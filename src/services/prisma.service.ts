import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Task {
    title: string;
    completed: boolean;
}
export interface UpdatedTask {
    title: string;
    completed: boolean;
}

export class TaskPrisma {
    async getAllTasks() {
        try {
            const get = await prisma.post.findMany();
            return get;
        } catch (error) {
            console.error(
                "Error ao buscar tarefa vindo do prima Service:",
                error
            );
        } finally {
            await prisma.$disconnect();
        }
    }

    async createTask({ title, completed }: Task) {
        try {
            const create = await prisma.post.create({
                data: {
                    title: title,
                    completed: completed,
                },
            });
            return create;
        } catch (error) {
            console.error(
                "Error ao criar tarefa vindo do prima Service:",
                error
            );
        } finally {
            await prisma.$disconnect();
        }
    }

    async deleteById(id: number) {
        try {
            const del = await prisma.post.delete({
                where: {
                    id: id,
                },
            });
            return del;
        } catch (error) {
            console.error(
                "Error ao criar tarefa vindo do prima Service:",
                error
            );
        } finally {
            await prisma.$disconnect();
        }
    }

    async updated(id: number, { title, completed }: UpdatedTask) {
        try {
            const up = await prisma.post.update({
                where: {
                    id: id,
                },
                data: {
                    title: title,
                    completed: completed,
                },
            });
            return up;
        } catch (error) {
            console.error(
                "Error ao criar tarefa vindo do prima Service:",
                error
            );
        } finally {
            await prisma.$disconnect();
        }
    }
}
