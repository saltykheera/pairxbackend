const express = require('express');
require('dotenv').config();
const routes = require('./routes');




const app = express();
app.use(express.json());

app.use('/api',routes)

app.get('/', (req, res) => res.json({ status: 'ok' }));



const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
