import { prisma } from "../prisma.server";
import { User } from "@prisma/client";

export async function createUser(user: {
  email: string;
  password: string;
}): Promise<User> {
  return await prisma.user.create({
    data: {
      email: user.email,
      password: user.password,
    },
  });
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
}

export async function isEmailTaken(email: string): Promise<boolean> {
  return (await prisma.user.count({ where: { email: email } })) === 1;
}
