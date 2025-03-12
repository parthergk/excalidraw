import  Express, { Request, Response }  from "express";
const app = Express();

app.get('/',(req: Request, res: Response)=>{
    res.send("hello");
})

app.listen(8080, ()=>{
    console.log("https server is runing on this port : 8080");
})