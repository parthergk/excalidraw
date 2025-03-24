import Express, { Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import { prismaClient } from "@repo/db/client";
import {
  RoomSchema,
  UserSignupSchema,
  UserSigninSchema,
} from "@repo/common/types";

const app = Express();

app.use(Express.json());

app.post("/signup", async (req: Request, res: Response) => {
  const parsedBody = UserSignupSchema.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(400).json({ message: "invalid inputs" });
    return;
  }

  try {
    const newuser = await prismaClient.user.create({
      data: {
        email: parsedBody.data.email,
        password: parsedBody.data.password,
        name: parsedBody.data.name,
      },
    });
    console.log("new user", newuser);

    res.status(200).json({ message: "user created successfully" });
  } catch (error) {
    console.log("server side error", error);

    res.status(500).json({ message: "user not registired" });
  }
});

app.post("/signin", async (req: Request, res: Response) => {
  const parsedBody = UserSigninSchema.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(400).json({ message: "invalid inputs" });
    return;
  }

  try {
    const user = await prismaClient.user.findFirst({
      where: {
        email: parsedBody.data.email,
        password: parsedBody.data.password,
      },
    });

    if (!user) {
      res.status(400).json({ message: "invalid crendetials" });
      return;
    }

    const userId = user.id;
    const token = Jwt.sign({ userId }, JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.log("server side error", error);
    res.status(500).json({ message: "server side error" });
  }
});

app.post("/room", middleware, async (req: Request, res: Response) => {
  const parsedBody = RoomSchema.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(400).json({ message: "incalid inputs" });
    return;
  }
  try {
    const adminId = req.userId;
    const room = await prismaClient.room.create({
      data: {
        slug: parsedBody.data.room,
        adminId: adminId,
      },
    });
    res.status(200).json({ roomId: room.id });
  } catch (error) {
    res.status(500).json({ message: "room not created server side error" });
  }
});

app.get("/chats/:roomId", async (req: Request, res: Response) => {
  const roomId = Number(req.params.roomId);

  try {
    const chats = await prismaClient.chat.findMany({
      where: {
        roomId: roomId,
      },
    });
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: "chat not founded" });
  }
});

app.get("/room/:slug", async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug;
    const room = await prismaClient.room.findFirst({
      where: {
        slug,
      },
    });
    if (!room) {
      res.status(201).json({message:"no room founded"});
      return;
    }
    res.status(200).json({ room });
  } catch (error) {
    console.log("server side error", error);
    res.status(500).json({ message: "server side error" });
  }
});

app.listen(8080, () => {
  console.log("https server is runing on this port : 8080");
});
