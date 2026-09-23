import { prisma } from "../../../prisma/index.ts"
import type { UserRole } from "../../../generated/prisma/enums.ts"

export async function signupService(username: string, email: string, password: string, role: UserRole) {
    const passwordHash = await Bun.password.hash(password)
    const userExists = await prisma.user.findFirst()
    return prisma.user.create({
        data: {
            username,
            email,
            password: passwordHash,
            role,
        },
    })
}

export async function signinService(username: string, password: string) {
    const user = await prisma.user.findFirst({
        where: { username },
        orderBy: {username: "asc"}
    })
    
    if (!user) return null
    const isPasswordValid = await Bun.password.verify(password, user.password)
    if (!isPasswordValid) return null
    return user
}
