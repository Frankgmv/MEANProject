const express = require('express');
const cors = require('cors');
const conectarBD = require('./config/db.js');
const app = express();
const PORT = 8002;
conectarBD();

app.use(express.json());
app.use(cors());

app.use('/api/productos', require('./routes/productoRoutes'));

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
})