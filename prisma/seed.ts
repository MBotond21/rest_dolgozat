import { PrismaClient } from '@prisma/client'
import {faker} from '@faker-js/faker'

const prisma = new PrismaClient()
async function main() {
  for (let i = 0; i < 50; i++) {
    await prisma.child.create({
        data: {
            name: faker.person.fullName(),
            location: `${faker.location.country()}, ${faker.location.city()}, ${faker.location.streetAddress({useFullAddress: true})}`,
            good: faker.number.int({min: 0, max: 1}) == 1? true: false
        }
    })
  }

  const material = ["wood", "metal", "plastic", "other"];

  for (let i = 0; i < 60; i++) {
    await prisma.toy.create({
        data: {
            name: faker.word.noun(),
            material: material[faker.number.int({min: 0, max: material.length-1})],
            weight: faker.number.float({min: 0, max: 3}),
            childId: faker.number.int({min: 1, max: 50})
        }
    })
  }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })