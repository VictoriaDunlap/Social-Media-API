const connection = require('../config/connection')
const { User, Thought } = require('../models')
const { getRandomName, getRandomThought } = require('./data')

connection.on('error', (err) => err)

connection.once('open', async () => {
    console.log('connected')

    await Thought.deleteMany({})

    await User.deleteMany({})

    const users = []

    for (let i = 0; i < 20; i++) {
        const thoughts = getRandomThought(20)

        const userName = getRandomName() 

        users.push({
            userName,
            thoughts
        })
    }

    await User.collection.insertMany(users)

    await Thoughts.collection.insertOne({
        thoughtText: [thoughts]
    })

    console.table(users)
    console.info('Seeding complete! 🌱')
    process.exit(0)
})