import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // get all users
    const users = await prisma.user.findMany()
    console.log(users)
}

const dbPrisma = main()
    .then(() => console.log('connected Prisma'))
    .catch((err: any) => {
        console.log('prisma: ', err)
        throw err
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

export default dbPrisma
