require("dotenv").config();
// var keys = require("./keys.js");
var mysql = require("mysql");
var inquirer = require("inquirer");
var chalk = require("chalk");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.PASSWORD,
    database: "not_amazondb"
});
connection.connect(function(err) {
    if (err) throw err;
    allProducts();
});

function allProducts() {
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log("For Sale (ID, name, dept, cost)")
        for (i = 0; i < res.length; i++) {
            console.log(chalk.yellow(res[i].item_id), chalk.green(res[i].product_name), res[i].department_name, chalk.red(+ res[i].price));
        }
        purchaseProduct(res);
    });
};

function purchaseProduct() {
    inquirer.prompt([{
        name: "product",
        type: "input",
        message: "What is the ID of the product you would like to buy?"
        },{
        name: "quantity",
        type: "input",
        message: "How many would you like to buy?"
    }]).then(function(answer) {
        var query = "SELECT * FROM products WHERE item_ID=?";
        connection.query(query, [answer.product], function(err, res) {
            if (err) throw err;
            for (i = 0; i < res.length; i++) {
                if (res[i].stock_quantity >= parseInt(answer.quantity)) {
                    var query = "UPDATE products SET ? WHERE item_ID=?";
                    // console.log(res);
                    var cost = answer.quantity * res[i].price;
                    // console.log(cost);
                    var stock = res[i].stock_quantity - answer.quantity;
                    // console.log(stock);
                    connection.query(query, [{stock_quantity:stock},answer.product], function(err) {
                        if (err) console.log(err);
                        console.log("Order Successful\nTotal cost: " + cost);
                    });
                } else {
                    console.log("Sorry, we don't have that many in stock!");
                }
            }connection.end();
        })
    })
};