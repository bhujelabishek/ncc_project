import express from "express";
import Todo from "./model/todmodel.js";
import cors from "cors";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import User from "./model/usermodel.js";
import jwt from "jsonwebtoken";
import { hashPasswords, comparePassword} from "./utils/authUtils.js";
import {  authSignUpSchema, authLoginSchema } from "./validationSchema/authSchema.js";
import { todoSchema } from "./validationSchema/todoschema.js";

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json({ messgae: "hello world"});
});
app.post("/todos",authMiddleware,async (req, res) => {
    try {
        const name = req.body.name;
        const status = req.body.status;
        const{error,value}= todoSchema.validate({
            name: name,
            status: status,
        });
        if(error){
            console.log(error);
            return res.status(400).json({msg: "Insertion Failed!"});
        }


        const todo = await Todo.create({
            name: name,
            task_status: status,
        });
        return res.json(todo);
    } catch (e) {
        console.log(e);
        res.json({ error: e })
    }
});

app.put("/todos/:id", authMiddleware,async(req, res)=>{
    const id= req.params.id;
    const name= req.body.name;
    const status= req.body.status;

    const todo= await Todo.update(
        {
            name: name,
            task_status: status,
        },
        {
            where: {id: id},
        }
    );
    res.json(todo);
});
    ``
app.get("/todos/:id",authMiddleware,async(req, res)=>{
    const id= req.params.id;
    const todo= await Todo.findOne(
     {
        where:{
            id: id,
        }
     }   
    );
    res.json(todo);
});

app.delete("/todos/:id", authMiddleware,async(req,res)=>{
    const id= req.params.id;
    const todo= await Todo.destroy({
        where:{
            id:id,
        }
    });
    res.json(todo);
});


app.get("/todos", authMiddleware,async (req, res) => {
    const todos = await Todo.findAll();
    res.json(todos);
});

app.post("/signUp", async (req, res)=>{
    const username= req.body.username;
    const password= req.body.password;
    const email= req.body.email;
    const {error,value}= authSignUpSchema.validate({
        username: username,
        password: password,
        email:email,
    });
    if(error){
        return res.status(400).json({msg: "Validation failed", error: error});
    }

    const hashedPasswords = await hashPasswords(password);
    try{
        const user= await User.create({
            username: username,
            password: hashedPasswords,
            email: email,
        });
   
        if(user){
        res.status(500).json({msg: "user creation successful!"});
    }
}
    catch(e){
        console.log(e);
        res.status(500).json({msg: "User creation failed!"})
    }
})


app.post("/signin", async(req, res)=>{
    const username= req.body.username;
    const password= req.body.password;

    const {error,value}= authLoginSchema.validate({
        username: username,
        password: password,
    });
    if(error){
        return res.status(400).json({msg: "Validation Failed!", error: error});
    }


    try{
        const user = await User.findOne({
            where:{username:username}});
            if(!user){
                return res.json({msg: "User doesnot exist!"}).status(404);
            }
            const checkPasswords= await comparePassword(password, user.password);
            if(!checkPasswords){
                return res.status(400).json({msg: "Password doesn't match!"});
            }

            const accessToken = jwt.sign({username: username}, "secretkey",{
                expiresIn: "30d",
            });
            return res.json({access_token: accessToken});
    }catch(e){
        console.log(e);
        return res.status(400).json({msg: "something went wrong. User signIn fialed"});
    }
});



app.listen(PORT, () => {
    console.log("App is running on port:", PORT);
});


