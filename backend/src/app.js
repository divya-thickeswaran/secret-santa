const express = require('express');
const cors = require('cors');
const santaRoutes = require('./routes/santaRoutes');

const app = express();

app.use(cors());
app.use('/api', santaRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));