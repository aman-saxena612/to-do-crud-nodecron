const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8002;
const todoRoutes = require("./routes/todoRoutes");
// const {readTodos} = require('./routes/todoRoutes');
const todosFile = '../data/todos.json';
// const nodeCron = require('node-cron');
// // const router = require("./routes/todoRoutes");

// const cronSchedule = '26 14 * * *';

// cron.schedule(cronSchedule, () => {
//   try {
//     const todos = readTodos();
//     const filteredTodos = todos.filter((todo) => !todo.completed);
//     writeTodos(filteredTodos);
//     console.log('Cron job executed: Completed todos deleted');
//   } catch (error) {
//     console.error('An error occurred:', error);
//   }
// });


// console.log(filteredTodos);


const app = express();

//middlewares:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/todos/", todoRoutes);

// app.get("/", (req, res) => {
//     res.send(`Hey from backend at port ${port}`);
// });


app.listen(port, () => {
    console.log(`Server running at port ${port}`);
})

