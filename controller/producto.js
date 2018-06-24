const Producto = require('../models/producto');

const createProducto = async (req, res, next)=>{
    const producto = new Producto(req.body);
    await producto.save();
    res.redirect('/producto');
}

const updateProducto = async (req, res, next)=>{
    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate({_id: id},req.body);
    res.redirect('/producto/view/' + producto._id);
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

const viewProducto = async (req, res, next) => {
    const { id } = req.params;
    let producto = await Producto.findById({_id:id})
    res.render('productoedit', { title: 'Producto', producto });
}

module.exports = {
    createProducto,
    updateProducto,
    allProductos,
    deleteProducto,
    viewProducto
}