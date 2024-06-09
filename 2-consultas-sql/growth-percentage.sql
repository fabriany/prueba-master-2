SELECT
    category,
    month,
    total_sales,
    ROUND((total_sales - prev_month_sales) / prev_month_sales * 100, 2) AS growth_percentage
FROM (
    SELECT
        category,
        month,
        total_sales,
        LAG(total_sales) OVER (PARTITION BY category ORDER BY month) AS prev_month_sales
    FROM (
        SELECT
            p.category,
            DATE_FORMAT(s.date, '%Y-%m') AS month,
            SUM(s.quantity * s.price) AS total_sales
        FROM
            sale s
            JOIN product p ON s.product_id = p.id
        GROUP BY
            p.category,
            DATE_FORMAT(s.date, '%Y-%m')
    ) AS sales_per_month
) AS sales_with_lag
ORDER BY
    category,
    month;