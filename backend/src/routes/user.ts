import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { signupInput, signinInput } from '@red_spikey/gdg-common'

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>()

userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();

  const { success } = signupInput.safeParse(body);

  if(!success) {
    c.status(411)
    return c.json({
      message: "Inputs not correct"
    })
  }

  try{
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    })
    const token = await sign({ id: user.id, email: user.email }, c.env.JWT_SECRET)
    return c.json({
      token: token,
      username: user.name,
      userid: user.id
    })
  } catch (e) {
    console.log(e);
    c.status(411)
    return c.text("Invalid")
  }
})

userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();

  const { success } = signinInput.safeParse(body);

  if(!success) {
    c.status(411)
    return c.json({
      message: "Inputs not correct"
    })
  }

  try{
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    })

    if(!user) {
      c.status(403) //Unauthorized
      return c.text("Invalid")
    }
    const token = await sign({ id: user.id, email: user.email }, c.env.JWT_SECRET)
    return c.json({
      token: token,
      username: user.name,
      userid: user.id,
    })
  } catch (e) {
    console.log(e);
    c.status(411)
    return c.text("Invalid")
  }
})