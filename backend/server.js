import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

/*importing routes */
import usersRoutes from './routes/users.js';
import contactRoutes from './routes/contact.js';
import authRoutes from './routes/auth.js';

/*configuration*/
dotenv.config();
const app = express();
app.use(express.json());

/*routes*/
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);

/*mongoose setup*/
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on localhost:${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
