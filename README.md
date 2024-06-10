# Prueba Técnica: AWS Lambda con Node.js y MySQL

## Sección 1: Funciones Lambda
### Tarea 1: Filtrar y Transformar Datos
**Descripción:** Dado un objeto con información de productos en una tienda, la función lambda filtra los productos cuyo precio sea mayor a $10.000 y devuelve una lista con los nombres de esos productos en mayúsculas.

### Tarea 2: Ordenar Datos
**Descripción:** La función lambda ordena una lista de tuplas (nombre, edad) en orden descendente por edad.


**Solución:** Se crean las funciones Lambda: (filterProducts, orderForEges), y se versiona el codigo en la caperta 1-funciones-lambda. 

## Sección 2: Consultas SQL
### Tarea 1: Consultas de Agregación
**Descripción:** Dada la siguiente estructura de tablas en una base de datos de ventas, la consulta SQL devuelve el total de ventas por categoría de producto y por mes, junto con el porcentaje de crecimiento respecto al mes anterior.

**Instrucciones:**
1. La consulta debe agrupar las ventas por categoría de producto y por mes.
2. Debe calcular el total de ventas (en términos monetarios) por cada categoría y mes.
3. Debe incluir una columna adicional que muestre el porcentaje de crecimiento del total de ventas respecto al mes anterior para cada categoría.

**Output Esperado:** Deberías obtener un resultado con columnas: category, month, total_sales, growth_percentage.

**Solución:** Para el ejercicio de crea una base de datos MySQL en AWS RDS (nombre: master) y se versiona la consulta en la carpeta 2-consultas-sql.


## Sección 3: Conexiones a Bases de Datos con Node.js en AWS Lambda
### Tarea 1: Conexión a una Base de Datos MySQL desde AWS Lambda
**Descripción:** La función Lambda en Node.js se conecta a una base de datos MySQL, realiza varias consultas y devuelve los resultados combinados como una respuesta JSON. La lógica de acceso a la base de datos está implementada en un archivo separado del archivo principal de la función Lambda.

**Requisitos:**
1. La función debe utilizar la biblioteca `mysql2` para manejar la conexión a MySQL.
2. La configuración de la conexión (host, user, password, database, etc.) está almacenada en AWS Secrets Manager.
3. Se crea un archivo `db.js` que maneja la conexión y las consultas a la base de datos.
4. La función principal en `index.js` realiza las siguientes consultas a través de las funciones definidas en `db.js`:
   - Obtener todos los productos.
   - Obtener la cantidad total de ventas por producto.
   - Obtener el producto con el precio más alto.
5. Combina los resultados de las consultas en un solo objeto JSON y devuélvelo.

**Solución:** Se crean las funciones Lambda: (LambdaConexionesBD) donde se usa la libreria mysql2 para conectar a la base de datos creada en el punto anterior en RDS, las credenciales de la base de datos son administradas en AWS secretsManager y usadas en la lambda con aws-sdk, el codigo queda versionado en la carpeta
3-conexiones-bd-lambda

---



Para más detalles, revisa el código en el repositorio.
