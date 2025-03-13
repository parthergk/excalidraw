import  Express, { Request, Response }  from "express";
import  Jwt  from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { middleware } from "./middleware";

const app = Express();

app.post('/signup',(req: Request, res: Response)=>{
    const {username, password} = req.body;
});

app.post('/signin', (req: Request, res: Response)=>{
    const {usrname, password} = req.body;

    const userId = 1;
    const token = Jwt.sign({userId}, JWT_SECRET);
    res.json({token});
});


app.post('/room', middleware, (req: Request, res: Response)=>{
    const {roomId} = req.body;
});

app.listen(8080, ()=>{
    console.log("https server is runing on this port : 8080");
})