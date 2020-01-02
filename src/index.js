const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express();
const port = process.env.PORT || 3000;

// app.use((req,res,next) => {
//     if(req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

// app.use((req,res,next) => {
//     res.status(503).send('We are currently doing maintenance. Please try again later.')
// })


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)




// NOTHING AFTER THIS
app.listen(port, () => {
    console.log('Server is up on port ' + port);
})


const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
    // const task = await Task.findById('5e0d35ea7c2b387cac104b9f')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner.name)

    const user = await User.findById('5e0d357184e5190ea8bba594')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

main()