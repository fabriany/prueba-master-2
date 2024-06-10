const { getAllProducts, getTotalSalesByProduct, getProductWithHighestPrice } = require('./db');

exports.handler = async (event) => {
    try {
        const products = await getAllProducts();
        const salesByProduct = await getTotalSalesByProduct();
        const productWithHighestPrice = await getProductWithHighestPrice();

        const response = {
            products: products,
            salesByProduct: salesByProduct,
            productWithHighestPrice: productWithHighestPrice
        };

        return {
            statusCode: 200,
            body: response
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        };
    }
};
