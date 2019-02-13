use bamazon;

CREATE TABLE products(
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100),
  department_name VARCHAR(100),
  price INTEGER(10),
  stock_quantity INTEGER(10),
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Water Bottle", "Household", 10.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jeans", "Clothing", 50.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sweatshirt", "Clothing", 30.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Coffee", "Grocery", 5.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Toy Car", "Toys", 10.00, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("50in TV", "Electronics", 500.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Macbook Pro", "Electronics", 1200.00, 70);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Basketball", "Sporting Goods", 20.00, 5);