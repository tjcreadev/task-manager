require('../src/db/mongoose')
const User = require('../src/models/user')

// 5dfaacff4c74c335accff6db

// User.findByIdAndUpdate('5dfaacff4c74c335accff6db', { age: 1 }).then(user => {
//     console.log(user)
//     return User.countDocuments({ age: 16 })
// }).then(result => {
//     console.log(result)
// }).catch(err => {
//     console.log(err)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age: age })
    const count = await User.countDocuments({ age: age })
    return count
}

updateAgeAndCount('5dfaacff4c74c335accff6db', 5).then(count => {
    console.log(count)
}).catch(e => {
    console.log(e)
})

