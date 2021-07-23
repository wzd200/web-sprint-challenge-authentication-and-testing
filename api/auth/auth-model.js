const db = require('../../data/dbConfig')

function findBy(filter) {
    return db('users as u')
        .where(filter)
}

async function add(user) {
    const [id] = await db("users").insert(user);
    return findById(id);
}
  
function findById(id) {
    return db("users as u")
      .where("u.id", id)
      .first();
}

module.exports = {
    findBy,
    add,
    findById
}