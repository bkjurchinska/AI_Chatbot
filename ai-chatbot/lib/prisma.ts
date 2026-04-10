import { PrismaClient } from '@prisma/client'

const prismaClientInstance = () => {
    return new PrismaClient()
}

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientInstance>
}
const prisma = globalThis.prisma ?? prismaClientInstance()
export default prisma

if(process.env.NODE_ENV !== 'production') globalThis.prisma = prisma