const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

try {
    app.listen(PORT, () => console.log('Server listening..'))
} catch (err) {
    console.error(err)
}
