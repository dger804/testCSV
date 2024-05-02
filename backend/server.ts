import express from "express"
import cors from "cors"
import multer from "multer"
import csvToJson from "convert-csv-to-json"

const app = express()
const port = 3000

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

let userData: Array<Record<string, string>> = []

app.use(cors()) //enable cors

app.post('/api/files', upload.single('file'), async (req, res) => {
  // extract file from request
  const { file } = req
  // validate that we have the file
  if (!file) {
    return res.status(500).json({ message: "File not found" })
  }
  // validate type of file (csv)
  if (file.mimetype !== 'text/csv') {
    return res.status(500).json({ message: "File must be CSV" })
  }
  // transform the file (buffer) to string
  let json: Array<Record<string, string>> = []
  try {
    const rawCsv = Buffer.from(file.buffer).toString('utf-8')
    console.log(rawCsv)
    // transform the string (CSV) to JSON
    json = csvToJson.csvStringToJson(rawCsv)
  } catch (error) {
    return res.status(500).json({ message: "Error parsing the file" })
  }
  // save the JSON db or memory
  userData = json
  // return 200 with message and JSON
  return res.status(200).json({ data: userData, message: 'File upload successfully' })
})

app.get('api/users', async (req, res) => {
  // extract query param 'q' from the request
  const { q } = req.query
  // validate we have the query param
  if (!q) {
    return res.status(500).json({ message: "Query param `q` is required" })
  }
  // filter the data from db or memory with the query param
  const search = q.toString().toLowerCase()

  const filteredData = userData.filter(row => {
    return Object
      .values(row)
      .some(value => value.toLowerCase().includes(search))
  })
  // return 200 with the filtered data

  return res.status(200).json({ data: filteredData })
})

app.listen(port, () => {
  console.log(`Server is running at http:localhost:${port}`)
})