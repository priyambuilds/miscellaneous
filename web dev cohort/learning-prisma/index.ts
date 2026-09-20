import { prisma } from "./prisma/index";

export async function main() {
    const user = await prisma.user.findFirst({
        where: {
            id: 1
        },
        include: {
            todos: true
        }
    })
}

main();