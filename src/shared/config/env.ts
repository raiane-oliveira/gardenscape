import { z } from "zod"

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(["development", "test", "production"]),
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
})

// const parsedEnv = envSchema.safeParse(process.env)
//
// if (!parsedEnv.success) {
//   console.error(
//     "Invalid environment variables",
//     parsedEnv.error.flatten().fieldErrors,
//   )
//
//   throw new Error("Invalid environment variables.")
// }

// export const env = process.env
