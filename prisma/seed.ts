const { PrismaClient }  = require('@prisma/client');

const prismadb = new PrismaClient()
async function main() {
  try {
    
    await prismadb.category.createMany({
        data:[
            {name: 'Programming'},
            {name: 'Web Development'},
            {name: 'Data'}, 
        ]
    });

    console.log("Successfully created categories")
  } catch (error) {
    console.log("something went wrong while seeding the categories");
    
  } finally {
    await prismadb.$disconnect()
  }
};

main();
  