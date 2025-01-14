const productLogic = require('../logic/productLogic');

const createProduct = async (req, res, next) => {
    try {
        const { name, stock, price,tax } = req.body;
        const newProduct = await productLogic.createProductLogic(name, stock, price,tax);
        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
};

const getAllProduct = async (req, res, next) => {
    try {
        const product = await productLogic.getAllProductLogic();

        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }

        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await productLogic.getProductByIdLogic(id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }

        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, stock, price } = req.body;

        const updatedProduct = await productLogic.updateProductLogic(id, name, stock, price);

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found or update not allowed.' });
        }

        res.status(200).json({ message: 'Product updated successfully.', product: updatedProduct });
    } catch (error) {
        next(error);
    }
};

const updateStock = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { stock } = req.body;

        const updatedProduct = await productLogic.updateProductLogic(id, null, stock, null);

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found or update not allowed.' });
        }

        res.status(200).json({ message: 'Product updated successfully.', product: updatedProduct });
    } catch (error) {
        next(error);
    }
};



const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const isDeleted = await productLogic.deleteProductLogic(id);

        if (!isDeleted) {
            return res.status(404).json({ error: 'Product not found.' });
        }

        res.status(200).json({ message: 'Product deleted successfully.' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    updateStock,
    getAllProduct,
};
