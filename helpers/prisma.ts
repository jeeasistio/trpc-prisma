import { PrismaClient } from '@prisma/client'

declare global {
    // eslint-disable-next-line no-unused-vars
    var prisma: PrismaClient | undefined
}

const prismaClient = global.prisma || new PrismaClient()

if (process.env.NODE_ENV === 'production') global.prisma = prismaClient

export default prismaClient
