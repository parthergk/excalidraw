import Express, { Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import { prismaClient } from "@repo/db/client";
import { UserSchema } from "@repo/common/types";

const app = Express();

app.post("/signup", async (req: Request, res: Response) => {
  const parsedBody = UserSchema.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(400).json({message: "invalid inputs"});
    return;
  }

  await prismaClient.user.create({
    data: {
      email: parsedBody.data.email,
      password: parsedBody.data.password,
      name: parsedBody.data.name,
    },
  });
  res.status(200).json({message:"user created successfully"})
});

app.post("/signin", async (req: Request, res: Response) => {
  const parsedBody = UserSchema.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(400).json({message: "invalid inputs"});
    return;
  }

  const user = await prismaClient.user.findFirst({
    where: {
      email: parsedBody.data.email
    }
  })

  if (!user) {
    res.status(400).json({message: "invalid crendetials"});
    return;
  }

  const userId = user.id;
  const token = Jwt.sign({ userId }, JWT_SECRET);
  res.json({ token });
});

app.post("/room", middleware, (req: Request, res: Response) => {
  const { roomId } = req.body;
});

app.listen(8080, () => {
  console.log("https server is runing on this port : 8080");
});
