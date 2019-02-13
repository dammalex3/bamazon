// code to read and set any environment variables with the dotenv package:
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
  
// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
//   start();
showAllItems();
});

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
        buyItem();
    });
}

function buyItem() {
    inquirer
    .prompt([
      {
          type: "input",
          message: "What item do you want buy?",
          name: "itemID"
      },
      {
        type: "input",
        message: "How many do you want?",
        name: "purchaseQuantity"
      }
    ])
    .then(function(inquirerResponse) {
        connection.query("select * from products where item_id=?",[inquirerResponse.itemID], function(err, response) {
            if (inquirerResponse.purchaseQuantity > response[0].stock_quantity) {
                console.log("Insufficient Quantity");
                showAllItems();
            }
            else {
                fulfillOrder(response[0].item_id, response[0].stock_quantity, inquirerResponse.purchaseQuantity, response[0].price)
            }
            }
          );
    });
  }

  function fulfillOrder(itemID, currentQuantity, quantityPurchased, price) {
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: currentQuantity - quantityPurchased
          },
          {
            item_id: itemID
          }
        ],
        function(err, res) {
          console.log("Congrats! Order complete. Your order total is $" + price*quantityPurchased);
          showAllItems();
        }
    );
  }