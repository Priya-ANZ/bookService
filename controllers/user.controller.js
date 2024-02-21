const UserService = require("../services/user.service.js");
const Joi = require("joi");
const bcrypt = require("bcrypt");

exports.register = async function(req, res){
    // try{
     
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
      
        let noOfUser = await UserService.checkUser({ email: req.body.email });
        if (noOfUser.length != 0) return res.status(400).send("User already registered");
      
      
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
        const user = {
          email: req.body.email, 
          isAdmin: req.body.isAdmin,
          password: password
        }
        await UserService.register(user)
        const token = UserService.generateAuthToken(user);
        res
          .header("x-auth-token", token)
          .header("access-control-expose-headers", "x-auth-token")
          .send(user.email);
      
    //}
    // catch(ex){
    //     console.log(ex)
    // }
}

exports.login = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await UserService.checkUser({ email: req.body.email });
  if (user.length == 0) return res.status(400).json({message:"Invalid email or password"});

  const validPswd = await bcrypt.compare(req.body.password, user[0].password);
  if (!validPswd) return res.status(400).json({message:"Invalid email or password"});

  const token = UserService.generateAuthToken(user[0]);
  res.send(token);
}

function validate(userObj){
    const schema = Joi.object({
      email: Joi.string().min(5).max(250).required().email(),
      password: Joi.string().min(5).max(250).required(),
      isAdmin: Joi.boolean()
      });
      return schema.validate(userObj);
    }

 