const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const { dbName } = require('./config');
const { blogRoutes } = require('./routes/blogRoutes');

const PORT = process.env.PORT || 3001;

const app = express()
    .use(cors())
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
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