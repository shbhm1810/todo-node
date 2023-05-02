const User = require("../models/User")

const handleDeleteTodo = async (req,res) => {

    const {
        id,
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
        return res.status(400).json({
            message: `User not found`
          });
    }

    const todoList = foundUser.todoItems.filter(item => (item.itemId.toString() !== id))

    if(todoList.length === foundUser.todoItems.length)
    {
        return res.status(400).json({
            message: `Item not found`
          });
    }

    foundUser.todoItems = todoList

    await foundUser.save()

    res.status(201).json({
        message: `Item Deleted successfully`,
      });


}

module.exports = handleDeleteTodo