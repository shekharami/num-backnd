const dotenv = require('dotenv');

const mongoose = require('mongoose');

const app = require('./app');

dotenv.config({path: './config.env'})

const DB = (process.env.DATABASE+'&W=majority').replace('<DATABASE_PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(con => {
    console.log("db connection successful");
});

const port = process.env.PORT || 3000 ;
const server = app.listen(port, () =>{
    console.log(`Server listening at port ${port}`);
});

