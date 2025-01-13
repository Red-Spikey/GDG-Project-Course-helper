import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { createCourseInput, updateCourseInput } from '@red_spikey/gdg-common'

export const courseRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();


courseRouter.use('/*', async (c, next) => {
  const authHeader = c.req.header("authorization") || "";

  try {
    const user = await verify(authHeader, c.env.JWT_SECRET);
    // console.log(user);
    if (user) {
      //@ts-ignore
      c.set('userId', user.id);
      await next();
    }
  } catch (e) {
    c.status(403);
    return c.json({
      message: "You are not logged in"
    })
  }
})

// create a new course
courseRouter.post('/add', async (c, next) => {
  const body = await c.req.json();

  const { success } = createCourseInput.safeParse(body);

  if (!success) {
    c.status(411)
    console.log("wrong");
    return c.json({
      message: "Inputs not correct"
    })
  }

  const authorId = c.get('userId');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const course = await prisma.course.create({
    data: {
      title: body.title,
      discription: body.discription,
      credits: body.credits,
      img_url: body.img_url,
      authorId: authorId,
    }
  })
  return c.json({
    id: course.id
  })
})

// Put: update a existing course
courseRouter.put('/update', async (c) => {
  const body = await c.req.json();

  const { success } = updateCourseInput.safeParse(body);

  if (!success) {
    c.status(411)
    return c.json({
      message: "Inputs not correct"
    })
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const course = await prisma.course.update({
      where: {
        id: body.id
      },
      data: {
        title: body.title,
        discription: body.discription,
        credits: body.credits,
        img_url: body.img_url
      }
    })
    return c.json({
      id: course.id
    })
  } catch (e) {
    c.status(411);
    return c.json({
      eroor: e,
      message: "Error while updating courses"
    })
  }
})

courseRouter.delete('/delete', async (c) => {

  const body = await c.req.json(); // Parse the request body

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const course = await prisma.course.delete({
      where: {
        id: body.id, // Ensure that the body contains the `id`
      },
    });
    return c.json({
      message: "Course deleted successfully!",
    });
  } catch (e: any) {
    c.status(411);
    return c.json({
      error: e.message, // Log the error message for better debugging
      message: "Error while deleting course",
    });
  }
});


// GET: Fetch all courses
// Todo: add Pagination
courseRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const course = await prisma.course.findMany({
    select: {
      title: true,
      id: true,
      discription: true,
      credits: true,
      img_url: true,
      author: {
        select: {
          name: true
        }
      }
    }
  });

  return c.json({
    course
  })
})

// Get: Fetch a single course
courseRouter.get('/:id', async (c) => {
  const id = await c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const course = await prisma.course.findFirst({
      where: {
        id: id
      },
    })

    return c.json({
      course
    })
  } catch (e) {
    c.status(411);
    return c.json({
      message: "Error while fetching courses"
    })
  }
})
