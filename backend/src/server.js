import express from 'express';
import dotenv from 'dotenv';
import factCheckRoutes from './routes/factCheckRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(factCheckRoutes);

// Make sure the server is not running during tests
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`✅ Server is running on port ${PORT}`);
    });
}

export default app;
