require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8001;

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false, limit: '1mb' }));

app.listen(PORT, () => {
    console.log('Server is live on port ' + PORT);
})