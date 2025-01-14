const Product = require('../models').Product;

const createProductLogic = async (name, stock, price, tax) => {
    const newProduct = await Product.create({ name, stock, price,tax });
    return newProduct;
};

const getProductByIdLogic = async (id) => {
    return await Product.findOne({
        where: { id },
        attributes: ['name', 'stock', 'price', 'tax'],
    });
};

const updateProductLogic = async (id, name, stock, price) => {
    const product = await Product.findOne({ where: { id } });
    if (!product) {
        return null;
    }

    
    if (name !== undefined && name != null ) product.name = name;
    if (stock !== undefined && stock != null) product.stock = stock;
    if (price !== undefined && price != null ) product.price = price;

    await product.save();
    return product;
};



const deleteProductLogic = async (id) => {
    const product = await Product.findOne({ where: { id } });
    if (!product) {
        return false;
    }

    await product.destroy();
    return true;
};

const getAllProductLogic = async() => {
    const product = await Product.findAll();
    if (!product) {
        return false;
    }
    return product
}

module.exports = {
    createProductLogic,
    getProductByIdLogic,
    updateProductLogic,
    deleteProductLogic,
    getAllProductLogic
};
