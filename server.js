require('dotenv').config();
const express = require('express');const connectDB = require('./database/db');
0
const app = express();
const PORT = process.env.PORT || 5000 ;
const authRoutes = require('./routes/authRoutes')
const homeRoutes = require('./routes/homeRoutes')
const adminRoutes = require('./routes/adminRoutes')

connectDB();

// ✅ Middleware to parse JSON
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Authentican System")
});

app.use('/api/auth',authRoutes);
app.use('/api/home',homeRoutes);
app.use('/api/admin',adminRoutes);


app.listen(PORT,()=>{
    console.log(`Server started on http://localhost:${PORT}`)
})