show databases;
create database technomart;
use technomart;
show tables;
drop database technomart;
-- Customer Table
CREATE TABLE Customer (
    Cust_ID INT,
    Name VARCHAR(50),
    Email VARCHAR(50),
    Password VARCHAR(50),
    Ph_No VARCHAR(15),
    Ship_Ad VARCHAR(100),
    Billing_Ad VARCHAR(100),
    Account_Creation_Date DATETIME
);

INSERT INTO Customer (Cust_ID, Name, Email, Password, Ph_No, Ship_Ad, Billing_Ad, Account_Creation_Date)
VALUES 
    (1, 'Harendra', 'harendra@gmail.com', 'password123', '1234567890', '123 Main St', '123 Main St', '2023-01-01'),
    (2, 'Devesh', 'devesh@gmail.com', 'password456', '0987654321', '456 Elm St', '456 Elm St', '2023-02-01');

-- Product Table
CREATE TABLE Product (
    Prod_ID INT,
    Name VARCHAR(255),
    Category VARCHAR(50),
    Price DECIMAL(10, 2),
    Image_URL VARCHAR(255)
);

desc product;

CREATE TABLE Cart (
    Cart_ID INT AUTO_INCREMENT PRIMARY KEY,
    Prod_ID INT NOT NULL,
    Name VARCHAR(255),
    Price DECIMAL(10, 2),
    Image_URL VARCHAR(255),
    Quantity INT DEFAULT 1
);

select * from product;

truncate table product;
drop table product;

select * from cart;


drop table Cart;

INSERT INTO Product (Prod_ID, Name, Category, Price, Image_URL) VALUES
(1006, 'POCO M6 5G, Orion Blue (4GB, 64GB )', 'Smartphone', 7999, 'https://m.media-amazon.com/images/I/719LcA76E5L._AC_UY218_.jpg');

-- Orders Table
CREATE TABLE Orders (
    Order_ID INT,
    Cust_ID INT,
    Order_Date DATETIME,
    Total_Amt DECIMAL(10, 2),
    Status VARCHAR(20)
);

INSERT INTO Orders (Order_ID, Cust_ID, Order_Date, Total_Amt, Status)
VALUES 
    (1, 1, '2023-05-01', 699.99, 'Delivered'),
    (2, 2, '2023-06-15', 1299.99, 'Shipped');

-- Order_Item Table
CREATE TABLE Order_Item (
    Order_Item_ID INT,
    Order_ID INT,
    Prod_ID INT,
    Quantity INT,
    Unit_Price DECIMAL(10, 2)
);

INSERT INTO Order_Item (Order_Item_ID, Order_ID, Prod_ID, Quantity, Unit_Price)
VALUES 
    (1, 1, 1, 1, 699.99),
    (2, 2, 2, 1, 1299.99);

-- Payment Table
CREATE TABLE Payment (
    Pyt_ID INT,
    Order_ID INT,
    Pyt_Date DATETIME,
    Pyt_Method VARCHAR(20),
    Pyt_Status VARCHAR(20)
);

INSERT INTO Payment (Pyt_ID, Order_ID, Pyt_Date, Pyt_Method, Pyt_Status)
VALUES 
    (1, 1, '2023-05-01', 'Credit Card', 'Completed'),
    (2, 2, '2023-06-15', 'Debit Card', 'Pending');

-- Shopping_Cart Table
CREATE TABLE Shopping_Cart (
    Cart_ID INT,
    Cust_ID INT,
    Prod_ID INT,
    Quantity INT,
    Added_Date DATETIME
);

INSERT INTO Shopping_Cart (Cart_ID, Cust_ID, Prod_ID, Quantity, Added_Date)
VALUES 
    (1, 1, 1, 2, '2023-04-28'),
    (2, 2, 2, 1, '2023-06-13');

-- Category Table
CREATE TABLE Category (
    Category_ID INT,
    Category_Name VARCHAR(50),
    Description VARCHAR(255)
);

INSERT INTO Category (Category_ID, Category_Name, Description)
VALUES 
    (1, 'Gadgets', 'All types of modern gadgets'),
    (2, 'Electronics', 'High-performance electronics for various needs');


-- 
-- Customer Table Constraints
ALTER TABLE Customer 
    ADD CONSTRAINT PK_Customer PRIMARY KEY (Cust_ID),
    ADD CONSTRAINT UC_Customer_Email UNIQUE (Email),
    MODIFY Cust_ID INT NOT NULL,
    MODIFY Name VARCHAR(50) NOT NULL,
    MODIFY Email VARCHAR(50) NOT NULL,
    MODIFY Account_Creation_Date DATETIME DEFAULT CURRENT_TIMESTAMP;

-- Product Table Constraints
ALTER TABLE Product 
    ADD CONSTRAINT PK_Product PRIMARY KEY (Prod_ID),
    ADD CONSTRAINT UC_Product_Name UNIQUE (Name),
    MODIFY Prod_ID INT NOT NULL,
    MODIFY Name VARCHAR(50) NOT NULL,
    MODIFY Price DECIMAL(10, 2) NOT NULL,
    MODIFY Stock_Qty INT NOT NULL,
    MODIFY Warranty_Period INT DEFAULT 12;

-- Orders Table Constraints
ALTER TABLE Orders 
    ADD CONSTRAINT PK_Orders PRIMARY KEY (Order_ID),
    MODIFY Order_ID INT NOT NULL,
    MODIFY Cust_ID INT NOT NULL,
    MODIFY Order_Date DATETIME DEFAULT CURRENT_TIMESTAMP,
    MODIFY Total_Amt DECIMAL(10, 2) NOT NULL,
    MODIFY Status VARCHAR(20) DEFAULT 'Pending';

-- Order_Item Table Constraints
ALTER TABLE Order_Item 
    ADD CONSTRAINT PK_Order_Item PRIMARY KEY (Order_Item_ID),
    MODIFY Order_Item_ID INT NOT NULL,
    MODIFY Quantity INT NOT NULL,
    MODIFY Unit_Price DECIMAL(10, 2) NOT NULL;

-- Payment Table Constraints
ALTER TABLE Payment 
    ADD CONSTRAINT PK_Payment PRIMARY KEY (Pyt_ID),
    MODIFY Pyt_ID INT NOT NULL,
    MODIFY Order_ID INT NOT NULL,
    MODIFY Pyt_Date DATETIME DEFAULT CURRENT_TIMESTAMP,
    MODIFY Pyt_Status VARCHAR(20) DEFAULT 'Pending';

-- Shopping_Cart Table Constraints
ALTER TABLE Shopping_Cart 
    ADD CONSTRAINT PK_Shopping_Cart PRIMARY KEY (Cart_ID),
    MODIFY Cart_ID INT NOT NULL,
    MODIFY Cust_ID INT NOT NULL,
    MODIFY Quantity INT NOT NULL,
    MODIFY Added_Date DATETIME DEFAULT CURRENT_TIMESTAMP;

-- Category Table Constraints
ALTER TABLE Category 
    ADD CONSTRAINT PK_Category PRIMARY KEY (Category_ID),
    ADD CONSTRAINT UC_Category_Name UNIQUE (Category_Name),
    MODIFY Category_ID INT NOT NULL,
    MODIFY Category_Name VARCHAR(50) NOT NULL;
    
    
    
-- 

-- Customer Table: No foreign key constraints required here

-- Product Table: No foreign key constraints required here

-- Orders Table Constraints
ALTER TABLE Orders 
    ADD CONSTRAINT FK_Order_Customer
    FOREIGN KEY (Cust_ID) REFERENCES Customer(Cust_ID);

-- Order_Item Table Constraints
ALTER TABLE Order_Item 
    ADD CONSTRAINT FK_OrderItem_Order
    FOREIGN KEY (Order_ID) REFERENCES Orders(Order_ID),
    ADD CONSTRAINT FK_OrderItem_Product
    FOREIGN KEY (Prod_ID) REFERENCES Product(Prod_ID);

-- Payment Table Constraints
ALTER TABLE Payment 
    ADD CONSTRAINT FK_Payment_Order
    FOREIGN KEY (Order_ID) REFERENCES Orders(Order_ID);

-- Shopping_Cart Table Constraints
ALTER TABLE Shopping_Cart 
    ADD CONSTRAINT FK_Cart_Customer
    FOREIGN KEY (Cust_ID) REFERENCES Customer(Cust_ID),
    ADD CONSTRAINT FK_Cart_Product
    FOREIGN KEY (Prod_ID) REFERENCES Product(Prod_ID);

-- Category Table: No foreign key constraints required here

