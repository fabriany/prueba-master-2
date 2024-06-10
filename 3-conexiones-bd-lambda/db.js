const AWS = require('aws-sdk');
const mysql = require('mysql2/promise');

const secretsManager = new AWS.SecretsManager();

let pool;

async function getPool() {
    if (!pool) {
        const secretData = await secretsManager.getSecretValue({ SecretId: 'secrectMaster' }).promise();
        const secret = JSON.parse(secretData.SecretString);

        pool = mysql.createPool({
            host: secret.host,
            user: secret.username,
            password: secret.password,
            database: secret.dbname,
            port: secret.port,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }
    return pool;
}

async function getAllProducts() {
    const pool = await getPool();
    const [rows] = await pool.query('SELECT id, name, category FROM product');

    const products = rows.map(row => ({
        id: row.id,
        name: row.name,
        category: row.category
    }));

    return products;
}

async function getTotalSalesByProduct() {
    const pool = await getPool();
    const [rows] = await pool.query(`
        SELECT p.id, p.name, SUM(s.quantity) AS total_sales
        FROM product p
        JOIN sale s ON p.id = s.product_id
        GROUP BY p.id, p.name
    `);

    const salesByProduct = rows.map(row => ({
        id: row.id,
        name: row.name,
        total_sales: row.total_sales
    }));

    return salesByProduct;
}


async function getProductWithHighestPrice() {
    const pool = await getPool();
    const [rows] = await pool.query(`
        SELECT p.id, p.name, MAX(s.price) AS highest_price
        FROM product p
        JOIN sale s ON p.id = s.product_id
        GROUP BY p.id, p.name
        ORDER BY highest_price DESC
        LIMIT 1
    `);

    const highestPriceProduct = rows[0];

    const productWithHighestPrice = {
        id: highestPriceProduct.id,
        name: highestPriceProduct.name,
        highest_price: highestPriceProduct.highest_price
    };

    return productWithHighestPrice;
}


module.exports = {
    getAllProducts,
    getTotalSalesByProduct,
    getProductWithHighestPrice
};
