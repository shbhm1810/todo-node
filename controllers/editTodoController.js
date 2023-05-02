const User = require("../models/User")

const handleEditTodo = async (req,res) => {

    const {
        id,
        title,
        isCompleted
    } = req.body

    if(!id)
    {
        return res.status(400).json({
            message: `Item id is required`
          });
    }
    

    const cookies = req.cookies
    const refreshToken = cookies.jwt

    if(!refreshToken)
    {
        return res.status(400).json({
            message: `Authorization required`
          });
    }

    const foundUser = await User.findOne({refreshToken}).exec()

    if(!foundUser)
    {
        return res.sendStatus(204);
    }

    todoItemIndex = foundUser.todoItems.findIndex((item => (item.itemId.toString() === id)));

    if(todoItemIndex == -1)
    {
        return res.status(400).json({
            message: `Todo Item not found`
          });
    }
    const todoList = foundUser.todoItems

    todoList[todoItemIndex].title = title 
    todoList[todoItemIndex].isCompleted = isCompleted 

    foundUser.todoItems = todoList

    await foundUser.save()

    res.status(201).json({
        message: `Item Updated successfully`,
      });


}

module.exports = handleEditTodo