const express = require('express')
const app = express()
const port = 3000

app.get('/ping', (req, res) => {
    res.send("This is a basic express app with ping route")
})
  

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})