import z from "zod";

export const UserSchema = z.object({
    email: z.string(),
    password: z.string().min(6),
    name: z.string()
})

export const RoomSchema = z.object({
    room: z.string().min(3).max(20)
})