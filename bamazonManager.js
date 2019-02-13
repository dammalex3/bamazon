require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");

// code to import the `keys.js` file and store it in a variable
var keys = require("./keys.js");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: keys.mysql.pw,
    database: "bamazon"
  });

connection.connect(function(err) {
    if (err) throw err;
    start();
});

function start() {
    inquirer
      .prompt({
        name: "managerSelection",
        type: "list",
        message: "Would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
      })
      .then(function(answer) {
          switch(answer.managerSelection) {
              case "View Products for Sale":
                showAllItems();
                break;
              case "View Low Inventory":
                showLowInvItems();
                break;
              case "Add to Inventory":
                addInventory();
                break;
              case "Add New Product":
                addNewProduct();
                break
          }
      });
  }

function showAllItems() {
    connection.query("select * from products", function(err, response) {
        for (var i=0; i<response.length; i++) {
            console.log("Product ID: " + response[i].item_id);
            console.log("Product Name: " + response[i].product_name);
            console.log("Department: " + response[i].department_name);
            console.log("Price: " + response[i].price);
            console.log("Quantity Available: " + response[i].stock_quantity);
            console.log("-------------------------------------");
        }
        start();
    });
}

function showLowInvItems() {
    connection.query("select * from products where stock_quantity < 5", function(err, response) {
        for (var i=0; i<response.length; i++) {
            console.log("Product ID: " + response[i].item_id);
            console.log("Product Name: " + response[i].product_name);
            console.log("Department: " + response[i].department_name);
            console.log("Price: " + response[i].price);
            console.log("Quantity Available: " + response[i].stock_quantity);
            console.log("-------------------------------------");
        }
        start();
    });
}

function addInventory() {
    inquirer
    .prompt([
      {
          type: "input",
          message: "What item do you want to add inventory for?",
          name: "itemID"
      },
      {
        type: "input",
        message: "How many do you want add?",
        name: "inventoryAddQty"
      }
    ])
    .then(function(inquirerResponse) {
        connection.query("select * from products where item_id=?",[inquirerResponse.itemID], function(err, response) {

            newInventoryQty = response[0].stock_quantity + parseInt(inquirerResponse.inventoryAddQty);

            connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                  {
                    stock_quantity: newInventoryQty
                  },
                  {
                    item_id: inquirerResponse.itemID
                  }
                ],
                function(err, res) {
                  console.log("Inventory updated!");
                  start();
            });
        });
    });
  }

  function addNewProduct() {
    inquirer
    .prompt([
      {
          type: "input",
          message: "Enter product name",
          name: "itemName"
      },
      {
        type: "input",
        message: "Enter department",
        name: "itemDepartment"
      },
      {
        type: "input",
        message: "Enter product price",
        name: "itemPrice"
      },
      {
        type: "input",
        message: "Enter quantity in stock",
        name: "itemInventory"
      }
    ])
    .then(function(inquirerResponse) {
            connection.query(
                "insert into products (product_name, department_name, price, stock_quantity) values (?, ?, ?, ?)", 
                [inquirerResponse.itemName, inquirerResponse.itemDepartment, inquirerResponse.itemPrice, inquirerResponse.itemInventory],
                function(err, res) {
                  console.log("Product Added!");
                  start();
            });
    });
  }