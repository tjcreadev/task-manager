require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5e0629711cfaf75c58b041d9').then(task => {
//     console.log(task)

//     return Task.countDocuments({ completed: false })
// }).then(tasks => {
//     console.log(tasks)
// }).catch(e => {
//     console.log(e)
// })


const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)

    return Task.countDocuments({completed: false})
}

deleteTaskAndCount('5dfaaf7218333f7588e71aab').then(tasks => {
    console.log(tasks)
}).catch(e => {
    console.log(e)
})