// server.js
const express = require('express');
const cors = require('cors');
const deviceRoutes = require('./routes/devices');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/devices', deviceRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
