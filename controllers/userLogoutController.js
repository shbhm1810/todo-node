const User = require("../models/User")


const handleUserLogout = async (req,res) => {
    const cookies = req.cookies

    if(!cookies.jwt)
    {
        return res.sendStatus(204) 
    }
    const refreshToken = cookies.jwt

    const foundUser = await User.findOne({refreshToken}).exec()
    res.clearCookie('jwt',{httpOnly: true})
    if(!foundUser)
    {
        return res.sendStatus(204);
    }

    foundUser.refreshToken = ''

   await foundUser.save();
    res.sendStatus(204);

}

module.exports = handleUserLogout