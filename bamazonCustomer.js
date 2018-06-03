require("dotenv").config();

// Load the NPM Package inquirer
var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("console.table");
// console.log(process.env.password);
// object variable containing settings for connecting to MySQL database
var connection = mysql.createConnection({
  host: "localhost",
  //The port from MySQL
  port: 3306,
  //My username
  user: "root",
  //My password that's housed in .env file
  password: process.env.password,
  database: "bamazon"
});


// start database connection && connection successful
connection.connect(function(err) {
  if (err) throw err;
  console.log('Successful connection! ' , connection.threadId + "\n\n"); //threadid is a process id from mySQL 
  displayProducts();
}); // closing connection function

//query the database for all of the products available for sale (ids, name, and prices)
function displayProducts() {
  console.log("Hello && Thanks for shopping @ Bamazon!\n\n")
  connection.query("SELECT * FROM products", function(err,res) {
    if (err) throw err;
    // callback function that displays the table
    showTable(res);
    console.log("\n");
    // callback function that prompts the user questions
    promptPurchase();
  });
}

// function to view in a table format the products
function showTable(res) {
  // empty array to house the each product property
  var productArray = [];
  // for loop to display all the products
  for (var i = 0; i <res.length; i++) {
    // push the object with product properties to the array for each res
    productArray.push({
      // display item.id
      "Product ID": res[i].item_id,
      // display product_name
      "Product Name": res[i].product_name,
      // display department_name
      "Department": res[i].department_name,
      // display price
      "Price": "$" + res[i].price,
      // display stock_quantity
      "Quantity": + res[i].stock_quantity
    }); // end of .push
  } // end of for loop
  // display the table
  console.table(productArray);
} // end of showTable function


function promptPurchase() {
  //once the items load, prompt users with two messages in begin purchase
  inquirer
    .prompt([
      {
        name: "item_id",
        type: "input",
        message: "What product ID you would like to purchase?\n\n"
      },
      {
        name: "stock_quantity",
        type: "input",
        message: "How many would you like to purchases?\n\n"
      } // end of prompt
  ]) // end of inquirer
  .then(function(answer) {
    connection.query('SELECT * FROM `products` WHERE ?', {
			item_id: answer.item_id
    },
    function (err, res) {
      if (err) throw err;
      // condense naming convention for res[i]
      var name = res[0].product_name;
      var quantity = res[0].stock_quantity;
      var total = res[0].price * answer.quantity;
      // Check the inventory of the product
      if (answer.quantity <= quantity) {
        // Update the product in database
        var newQ = quantity - answer.quantity;
        connection.query("UPDATE products SET ? WHERE ?", [{
          stock_quantity: newQuantity
        },
        {
          item_id: answer.item_id
        }],
          function(err, res) {
            if (err) throw err;
            //Complete the transaction
            inquirer
              .prompt([
                {
                  name: "return",
                  type:"list",
                  message: "Purchase successful!\nItem: " + name +
                            "\nQuantity: " + answer.quantity +
                            "\nTotal: $" + total,
                  choices: ["Return"]
                }]).then(function(answer){
                  displayProducts();
                }); //end of .then(function(answer))
          }); // end of function
        } 
        else {
          inquirer
              .prompt([
                {
                  name: "error",
                  type:"list",
                  message: "Insufficient Stock!",
                  choices: ["Return"]
                }]).then(function(answer){
                  displayProducts();
                }); // end of else
        } // end of function(err, res)
      });
    });
  }