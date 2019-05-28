ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price INT NOT NULL,
    stock_quantity INT NOT NULL default 0,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Hat', 'Clothing', 8, 5), ('Pants', 'Clothing', 15, 3), ('Shirts', 'Clothing', 10, 5), 
('Bracelet', 'Clothing', 10, 5), ('Ring', 'Clothing', 9, 5), ('Shoes', 'Clothing', 7, 10), ('Socks', 'Clothing', 3, 10),
('Clothing Detergent', 'Utility', 3, 10), ('Soap', 'Utility', 2, 10), ('Shampoo', 'Clothing', 3, 10);



SELECT * FROM products;



