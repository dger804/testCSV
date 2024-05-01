import express from "express"
import cors from "cors"

const app = express()
const port = 3000

app.use(cors()) //enable cors

app.post('api/files', async (req, res) => {
  // extract file from request
  // validate that we have the file
  // validate type of file (csv)
  // transform the file (buffer) to string
  // transform the string to csv
  // save the JSON db or memory
  // return 200 with message and JSON

  return res.status(200).json({ data: [], message: 'File upload successfully' })
})

app.get('api/users', async (req, res) => {
  // extract query param 'q' from the request
  // validate we have the query param
  // filter the data from db or memory with the query param
  // return 200 with the filtered data

  return res.status(200).json({ data: [] })
})

app.listen(port, () => {
  console.log(`Server is running at http:localhost:${port}`)
})