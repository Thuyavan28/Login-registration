// server.js
const express = require("express");
const cors = require('cors');
const db = require('./db'); // ✅ Correct import now

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'https://logins28.netlify.app'],
  credentials: true
}));

app.use(express.json());

// Test DB connection
(async function () {
  try {
    const con = await db.connect();
    console.log("DB is connected");
    con.release();
  } catch (e) {
    console.log("error:", e.message);
  }
})();

// Routes
const userRoute = require("./routes/SignupRouter");
app.use('/api', userRoute);


const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
