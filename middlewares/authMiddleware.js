import jwt from "jsonwebtoken";
const authMiddleware= async(req, res, next)=>{
    const authorization= req.headers.authorization;
    if(!authorization){
        return res.json({msg: "unauthorized. Authentication token required"});

    }
    try{
        jwt.verify(authorization, "secretkey");
    }
    catch(e){
        console.log(e);
        return res.status(500). json({msg: "Error while decoding token!"});
    }
    next();
};
export {authMiddleware};