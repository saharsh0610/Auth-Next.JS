import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import config from './config.js';
import checkForAuthentication from './middlewares/auth.js';

const PORT = 8000;

const app = express();

app.use(express.urlencoded({ extended: false }));


mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log("Mongodb connected"))
.catch(err=> console.log(err));


app.use('/api/auth', authRoutes);

app.get('/profile', checkForAuthentication , (req, res) => {
    const user = req.user;
  
    res.json({ message: 'Protected profile route', user });
  });
  


app.listen(PORT, ()=> console.log(`seveer runnin on ${PORT}`))