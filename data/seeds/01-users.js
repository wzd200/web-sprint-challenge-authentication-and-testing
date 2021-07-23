
const users = [
  { 
    username: 'Bill',
    password: 1234 
  },
  { 
    username: 'Jeff',
    password: 1234
  },
]

exports.users = users

exports.seed = function(knex) {
  return knex('users').insert(users)
}
