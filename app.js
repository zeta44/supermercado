const express = require('express');
const app = express();
const port = 3000;


app.set("view engine", "ejs");
app.set("views", __dirname, "/views");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static("public"));

const router = require('./routers/produtos_router');
app.use('/', router);







app.listen(port, ()=>{
    console.log(`Server started port ${port}`)
})
