const mysql = require('mysql');
const inquirer = require('inquirer');
const table = require('cli-table2')

//connection info
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazon"
});

//begin connection
connection.connect(function(err) {
  if (err) throw err;
});

//database query
connection.query('SELECT * FROM products', function(err, res) {
  if (err) throw err;

  let item = res
  for (let i = 0; i < item.length; i++) {
    console.log(`\n${item[i].product_name} - ${item[i].department_name}\n$${item[i].price}\n=====================`)
    
  }
})