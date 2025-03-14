const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const path = require("path");

const PORT = 5050;
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const MONGO_URL = "mongodb://admin:qwerty@mongo:27017";
const client = new MongoClient(MONGO_URL);

// Serve HTML form
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// GET all users
app.get("/getUsers", async (req, res) => {
    await client.connect();  // ✅ FIXED: No undefined variable
    console.log('Connected successfully to MongoDB');

    const db = client.db("apnacollege-db");
    const data = await db.collection('users').find({}).toArray();
    
    client.close();
    res.send(data);
});

// POST new user

app.post("/addUser", async (req, res) => {
    const userObj = req.body;
    console.log(req.body);

    await client.connect();  // ✅ FIXED
    console.log('Connected successfully to MongoDB');

    const db = client.db("apnacollege-db");
    const data = await db.collection('users').insertOne(userObj);
    
    console.log(data);
    console.log("Data inserted in DB");
    client.close();
    res.send({ success: true, data });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
