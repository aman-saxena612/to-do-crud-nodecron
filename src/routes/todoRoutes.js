const express = require('express');
const router = express.Router();
const fs = require('fs');
const todosFile = './data/todos.json';
const nodeCron = require('node-cron');

// Read existing todos
function readTodos() {
    try {
      const data = fs.readFileSync(todosFile, 'utf-8');
      if (data.trim() === '') {
        return []; // Return an empty array if the file is empty
      }
      return JSON.parse(data);
    } catch (error) {
      return []; // Handle any errors while reading or parsing
    }
    // next();
  }

// Write todos to file
function writeTodos(todos) {
  fs.writeFileSync(todosFile, JSON.stringify(todos, null, 2));
}

// const router = require("./routes/todoRoutes");

const cronSchedule = '46 14 * * *';

nodeCron.schedule(cronSchedule, () => {
  try {
    const todos = readTodos();
    const filteredTodos = todos.filter((todo) => !todo.completed);
    writeTodos(filteredTodos);
    console.log('Cron job executed: Completed todos deleted');
  } catch (error) {
    console.error('An error occurred:', error);
  }
});

// CRUD operations:
router.get('/', (req, res) => {
  const todos = readTodos();
  res.json(todos);
});

router.post('/', (req, res) => {
  const todos = readTodos();
  const newTodo = req.body;
  todos.push(newTodo);
  writeTodos(todos);
  res.json(newTodo);
});

router.put('/:id', (req, res) => {
  const todos = readTodos();
  const todoId = req.params.id;
  // console.log(typeof(todoId));
  const updatedTodo = req.body;
//  console.log(typeof(updatedTodo.id));
  const index = todos.findIndex((todo) => todo.id === todoId);
  console.log(index);
  if (index !== -1) {
    todos[index] = updatedTodo;
    writeTodos(todos);
    res.json(updatedTodo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

router.delete('/:id', (req, res) => {
  const todos = readTodos();
  const todoId = req.params.id;

  const index = todos.findIndex((todo) => todo.id === todoId);
  if (index !== -1) {
    todos.splice(index, 1);
    writeTodos(todos);
    res.json({ message: 'Todo deleted' });
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

module.exports = router;
// module.exports = {router, readTodos};
