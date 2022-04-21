import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // create
    // const newuser = await prisma.user.create({
    //     data: {
    //         name: 'sam',
    //         email: 'sam@corp.com',
    //         password: 'password',
    //         createdAt: new Date(),
    //     },
    // })
    // console.log(newuser)

    // update user
    // const updatedUser = await prisma.user.update({
    //     where: { id: 1 },
    //     data: { email: 'babe@gmail.com' },
    // })
    // console.log('edit: ', updatedUser)

    // delete user
    // const deleteUser = await prisma.user.delete({
    //     where: {
    //         id: 1,
    //     },
    // })
    // console.log(deleteUser)

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
