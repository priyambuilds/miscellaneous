import { prisma } from "./index"

const createUser = await prisma.user.create({
    data: {
        username: "rahuldev",
        password: "123123",
        firstName: "rahul",
        lastName: "dev",
        todos: {
            create: {
                title: "go to gym today",
                description: "go to gym today",
                done: true,
            },
        },
    },
    include: {
        todos: true,
    },
})
