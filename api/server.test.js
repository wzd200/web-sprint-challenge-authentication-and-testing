const db = require('../data/dbConfig')


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
