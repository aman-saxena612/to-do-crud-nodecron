# to-do-crud-nodecron

This is an API using CRUD operations in a to-do-list. This API features with the deletion of completed taks using node-cron npm package.

The user should prefably be input the task in following format:

  {
    "id": "task id (number)",
    "title": "The task to do",
    "completed": true/false
  }

  Eg:
  {
    "id": "5",
    "title": "Testing API 5",
    "completed": false
  }

  To run the server user should be in the root directory and scripts are: npm start
  This will start the server. 

  Working: Once in the object, "completed" field is true, then the task scheduler node-cron will itself delete the task in the given time, the user has provided in 
  the cronSchedule variable.
