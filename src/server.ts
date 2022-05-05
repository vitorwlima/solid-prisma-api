import 'express-async-errors'
import express from 'express'

import { router } from './routes'
import { handleErrorMiddleware } from './error-handler'

const app = express()
app.use(express.json())
app.use(router)
app.use(handleErrorMiddleware)

app.listen(3333, () => console.log('Server is running 🚀'))
