const Producto = require("../models/Producto");

exports.createProduct = async (req, res) => {
    try {
        let producto = new Producto(req.body);
        await producto.save();
        res.send(producto)
    } catch (error) {
        console.log(error);
        res.status(500).send("Error");
    }
}

exports.ObtenerProductos = async (req, res) => {
    try {
        let productos = await Producto.find();
        res.send(productos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
}

exports.ObtenerProducto = async (req, res) => {
    try {
        let producto = await Producto.findById(req.params.id);

        if(!producto){
            res.status(500).send('El producto no existe');
        }

        res.send(producto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
} 

exports.actualizarProducto = async (req, res)=>{
    try {
        let {nombre, categoria, ubicacion, precio} = req.body;
        let producto = await Producto.findById(req.params.id);

        if(!producto){
            res.status(500).send("El producto no existe");
        }
        producto.nombre = nombre;
        producto.categoria = categoria;
        producto.ubicacion = ubicacion;
        producto.precio = precio;

        producto = await Producto.findOneAndUpdate(
            {_id: req.params.id}, producto, {new: true}
        )
        res.json(producto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Error");
    }
}


exports.eliminarProducto = async (req, res)=>{
    try {
        let producto = await Producto.findById(req.params.id);

        if(!producto){
            res.status(500).send("El producto no existe");
        }

        producto = await Producto.findByIdAndRemove({_id:req.params.id});
        res.json({msg:"Producto Eliminado"});
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Error");
    }
}