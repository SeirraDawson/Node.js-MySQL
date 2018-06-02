DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT, 
    product_name VARCHAR(50) NOT NULL, 
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  (
        "Tide Pods", "Household Supplies",  18.97, 25
    ),(
        "23andMe DNA Test", "Health & Household", 99.00, 5
    ),(
        "Speed Roller Skaters", "Sports & Outdoors", 69.00, 15
    ),(
        "Daily Planner", "Books", 8.99, 10
    ),(
        "HP 62 Black Ink Cartridge", "Office Supplies", 17.59, 10
    ),(
        "iPhone 6+ Privacy Screen Protector", "Electronics", 12.95, 20
    ),(
        "Prenatal Multivitamin", "Personal Care", 10.95, 15
    ),(
        "Sugru Moldable Glue", "Household", 22.00, 5
    ),(
        "NuWave Oven", "Kitchen", 99.99, 10
    ),(
        "Sony - H900 headphones", "Electronics", 298.99, 5
    ),(
        "Etymotic Earplugs", "Health & Household", 13.95, 10
    );

SELECT * FROM products;