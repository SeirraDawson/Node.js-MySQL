require("dotenv").config();

// Load the NPM Package inquirer
var inquirer = require("inquirer");
var mysql = require("mysql");
// require("console.table");

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
  console.log('Successful connection! ' + connection.threadId); //threadid is a process id from mySQL 
}); // closing connection function

//query the database for all of the products available for sale (ids, name, and prices)
var displayProducts = function () {
  console.log("Hello && Thanks for shopping @ Bamazon!")
  connection.query("SELECT * FROM products", function(err,res) {
    if (err) throw err;
    console.table(res)
  })
};

var makePurchase = function() {
  // query the database for all products available for purchase
  connection.query("SELECT * FROM products", function(err,res) {
    if (err) throw err;
    //once the items load, prompt users with two messages in begin purchase
    inquirer
      .prompt([
        {
          name: "item_id",
          type: "input",
          options: function () {
            var optionArray = [];
            for (var i = 0; i <res.length; i++) {
              optionArray.push({
                "Product ID": res[i].item_id,
                "Product Name": res[i].product_name,
                "Department": res[i].department_name,
                "Price": "$" + res[i].price,
                "Quantity": + res[i].stock_quantity
              });
            }
            console.table(optionArray);
          },
          message: "What product ID you would like to purchase?\n\n"
          //What is use don't enter number
        },
        {
          name: "stock_quantity",
          type: "input",
          message: "How many units of the product you would like to purchases?\n\n"
        } // end of prompt
    ])
    .then(function(answer){
      var productSelected;
      for (var i = 0; i < res.length; i++){
        if (res[i].product_name === answer.product) {
          productSelected = res[i];
        }
      }

      if(productSelected.stock_quantity > parseInt(answer.amount)) {
        connection.query("UPDATE products SET ? WHERE ?",)

      }
    })
  })
}
