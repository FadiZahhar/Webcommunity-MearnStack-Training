import express from 'express';
import usersRoutes from './routes/users.js';
import contactRoutes from './routes/contact.js';
import authRoutes from './routes/auth.js';

const app = express();
app.get('/', (req, res) => res.json({ msg: 'testing is everything is good' }));
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log(`Server started on localhost:${PORT}`));
