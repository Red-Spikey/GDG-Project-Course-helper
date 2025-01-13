import z from 'zod'

export const signupInput = z.object({
    name:      z.string().optional(),
    email:     z.string().email(),
    password:  z.string().min(6)
})

export const signinInput = z.object({
    email:     z.string().email(),
    password:  z.string().min(6)
})

export const createCourseInput = z.object({
    title: z.string(),
    discription: z.string(),
    credits: z.string(),
    img_url: z.string(),
})

export const updateCourseInput = z.object({
    title: z.string(),
    discription: z.string(),
    credits: z.string(),
    img_url: z.string(),
})
export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>
export type CreateCourseInput = z.infer<typeof createCourseInput>
export type UpdateCourseInput = z.infer<typeof updateCourseInput>