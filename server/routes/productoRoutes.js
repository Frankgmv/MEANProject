const express = require('express');
const router = express();
const productoController = require('../controllers/productoController');

router.post('/', productoController.createProduct);
router.get('/', productoController.ObtenerProductos);
router.get('/:id', productoController.ObtenerProducto);
router.put('/:id', productoController.actualizarProducto);
router.delete('/:id', productoController.eliminarProducto);

module.exports = router; 