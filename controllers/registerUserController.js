const bcrypt = require('bcrypt');
const User = require('../models/User');

const handleRegisterUser = async (req,res) => {

    console.log(req.body)
    const {email,password} = req.body || {}

    if(!email || !password)
    {
        return res
        .status(400)
        .json({ message: "Email and password is required" });
    }

    //Create a use

    const hashedPassword = await bcrypt.hash(password, 10);
    const isDuplicateUser = await User.findOne({email}).exec()


    if(isDuplicateUser)
    {
        return res.status((401)).json({
            message: 'User Already Exists'
        })
    }
try
{
    const userDetails = {
        email,
        password: hashedPassword
    }

  const result = await User.create(userDetails)
    console.log(result)

    res.status(201).json({
        success: `New user created`,
      });

    }
    catch(err)
    {
        res.status(500).json({
            message: err.message,
          });

    }
}

module.exports = handleRegisterUser