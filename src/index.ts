import { Hono } from 'hono'
import { z } from 'zod'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/say', async (c) => {
  const body = await c.req.json()
  const schema = z.object({
    message: z.string(),
    name: z.string()
  })

  const result = schema.safeParse(body)

  if (!result.success) {
    return c.json({ error: 'Invalid request body' }, 400)
  }

  const { message, name } = result.data
  return c.json({ message, name })
})

export default app
