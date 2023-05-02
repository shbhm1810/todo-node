const User = require("../models/User")

const handleAddTodo = async (req,res) => {

    const {
        title,
        isCompleted = false
    } = req.body

    if(!title)
    {
        return res.status(400).json({
            message: `Title is required`
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

    const todoList = foundUser.todoItems
    todoList.push({title,isCompleted})

    foundUser.todoItems = todoList

    await foundUser.save()

    res.status(201).json({
        message: `Item added successfully`,
      });


}

module.exports = handleAddTodo