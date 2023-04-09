'use strict'
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.status(200).send('<h1>OK</h1>')
})

try {
    app.listen(PORT, () => console.log('Server listening..'))
} catch (err) {
    console.error(err)
}
