const db = require('../data/dbConfig')
const Users = require('./auth/auth-model')
const request = require('supertest')
const server = require('./server')


test('sanity', () => {
  expect(true).toBe(true)
})

test('testing for correct environment', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})
beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
afterAll(async () => {
  await db.destroy()
})

describe('register tests', () => {
  test('endpoint registers a new user in the db', async () => {
    const newUser = {
      username: 'Jimbo',
      password: '1234'
    }
    await Users.add(newUser)
    const insertedUser = await db('users')
      .where('id', 1).first()
    expect(insertedUser).toMatchObject(newUser)
  })

  test('endpoint resolves to the newly created user', async () => {
    const newUser = {
      username: 'Hal',
      password: '1234'
    }
    const insertedUser = await Users.add(newUser)
    expect(insertedUser).toMatchObject(newUser)
  })
})

// describe('login tests', () => {
//   test('responds with status code 201', async () => {
    
//     const res = await request(server).post('/api/auth/login').send({
//       username: 'Hal',
//       password: '1234'
//     })
//     expect(res.status).toBe(201)
//   })

//   test('responds with logged in user', async () => {
    
//  
//   })
// })
