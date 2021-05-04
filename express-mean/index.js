const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { dbName } = require('./config');
const { blogRoutes } = require('./routes/blogRoutes');
const PORT = process.env.PORT || 3000;

const app = express()
    .use(cors())
    .use(bodyParser.json())
    .use(express.urlencoded({ extended: true }))
    .use(blogRoutes());

app.get('/', (req, res) => { res.send(" ") });


mongoose.connect(`mongodb://localhost:27017/${dbName}`, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true 
}, (error, response) => {
    if(error) {
        console.log(">>> Error: ", error);
    }

    if(response) {
        // console.log(">>> Response: ", response);
        app.listen(PORT, () => { console.log("Running"); });
    }
});