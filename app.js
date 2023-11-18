const express = require("express");
const app = express()
const path = require("path");
const PORT = process.env.PORT || 3000;

// express specific stuff 
app.use("/static", express.static('static'));

// app.set('views', path.join(__dirname + 'views'));

// app.set('view engine', 'html');


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
app.listen(PORT, ()=>{
    console.log("client-server is running on the port " + PORT + "...")
})
