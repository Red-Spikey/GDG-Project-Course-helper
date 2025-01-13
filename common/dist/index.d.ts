import z from 'zod';
export declare const signupInput: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name?: string | undefined;
}, {
    email: string;
    password: string;
    name?: string | undefined;
}>;
export declare const signinInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const createCourseInput: z.ZodObject<{
    title: z.ZodString;
    discription: z.ZodString;
    credits: z.ZodString;
    img_url: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    discription: string;
    credits: string;
    img_url: string;
}, {
    title: string;
    discription: string;
    credits: string;
    img_url: string;
}>;
export declare const updateCourseInput: z.ZodObject<{
    title: z.ZodString;
    discription: z.ZodString;
    credits: z.ZodString;
    img_url: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    discription: string;
    credits: string;
    img_url: string;
}, {
    title: string;
    discription: string;
    credits: string;
    img_url: string;
}>;
export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type CreateCourseInput = z.infer<typeof createCourseInput>;
export type UpdateCourseInput = z.infer<typeof updateCourseInput>;
