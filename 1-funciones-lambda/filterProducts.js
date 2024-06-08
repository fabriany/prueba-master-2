export const handler = async (event) => {
    try {
        if (!event.body) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'The body is requered' })
            };
        }

        const products = event.body.products || [];
        if (!Array.isArray(products) || !products.length > 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Products must be array > 0' })
            };
        }

        const invalidProducts = products.filter(product => !product.name || !product.price);
        if (invalidProducts.length > 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: 'name and price are requered ',
                    invalidProducts: invalidProducts
                })
            };
        }

        const filteredProducts = products
                .filter(product => product.price > 10000)
                .map(product => product.name.toUpperCase());

        return {
            statusCode: 200,
            body: JSON.stringify({ filteredProducts: filteredProducts })
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
        };
    }
};