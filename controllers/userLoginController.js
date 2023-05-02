const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/User');

const handleUserLogin = async (req,res) => {

    const {email,password} = req.body || {}

    if(!email || !password)
    {
        return res
        .status(400)
        .json({ message: "Email and password is required" });
    }

    const foundUser = await User.findOne({email}).exec()

    if(!foundUser)
    {
        return res.status((401)).json({
            message: 'User Doesnot exists'
        })
    }

    const hashedPassword = bcrypt.compare(password,foundUser.password)

    if(hashedPassword)
    {
    const accessToken = jwt.sign({email},process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: '1m'
    })
    const refreshToken = jwt.sign({email},process.env.REFRESH_TOKEN_SECRET,{
        expiresIn: '1d'
    })

    res.cookie('jwt', refreshToken, { httpOnly: true, 
        sameSite: 'None', secure: true, 
        maxAge: 24 * 60 * 60 * 1000 });

        foundUser.refreshToken = refreshToken

        await foundUser.save()

    res.status(201).json({
        message: `Login Successful`,
        accessToken
      });
    }
    else
    {
        res.sendStatus(401);
    }


}

module.exports = handleUserLogin