const Producto = require('../models/producto');

const createProducto = async (req, res, next)=>{
    const producto = new Producto(req.body);
    await producto.save();
    res.redirect('/producto');
}

const updateProducto = (req, res, next)=>{

}

const allProductos = async (req, res, next)=>{
    const productos = await Producto.find();
    res.render('producto', { title: 'Producto', productos });
}

const deleteProducto = async (req, res, next)=>{
    const { id } = req.params;
    await Producto.remove({_id: id});
    res.redirect('/producto');
}

module.exports = {
    createProducto,
    updateProducto,
    allProductos,
    deleteProducto
}