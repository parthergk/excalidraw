import Express, { Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import { prismaClient } from "@repo/db/client";
import { RoomSchema, UserSchema } from "@repo/common/types";

const app = Express();

app.post("/signup", async (req: Request, res: Response) => {
  const parsedBody = UserSchema.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(400).json({ message: "invalid inputs" });
    return;
  }

  try {
    await prismaClient.user.create({
      data: {
        email: parsedBody.data.email,
        password: parsedBody.data.password,
        name: parsedBody.data.name,
      },
    });
    res.status(200).json({ message: "user created successfully" });
  } catch (error) {
    res.status(500).json({ message: "user not registired" });
  }
});

app.post("/signin", async (req: Request, res: Response) => {
  const parsedBody = UserSchema.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(400).json({ message: "invalid inputs" });
    return;
  }

  try {
    const user = await prismaClient.user.findFirst({
      where: {
        email: parsedBody.data.email,
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
    await prismaClient.room.create({
      data: {
        slug: parsedBody.data.room,
        adminId: adminId,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "room not created server side error" });
  }
});

app.listen(8080, () => {
  console.log("https server is runing on this port : 8080");
});
