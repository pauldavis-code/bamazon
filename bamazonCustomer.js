const mysql = require('mysql');
const inquirer = require('inquirer');

var divider = "====================================================="

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

home()
//home screen
function home() {
  //promot
  inquirer.prompt([
    {
      name: 'go',
      message: 'Welcome to Bamazon!',
      type: 'list',
      choices: ['Shop', 'Exit']
    }
  ]).then(function(response) {
    //switch based on user input
    switch (response.go) {
      case 'Shop': 
        selectProduct() 
        break;
      case 'Exit':
        connection.end()
        break;
    }
  })
}

//shop
function selectProduct() {
  connection.query('SELECT * FROM products', function(err, res) {
    if (err) throw err;
    let item = res
    //list items to terminal
    console.log(`\n${divider}`)
    for (let i = 0; i < item.length; i++) {
      if (parseInt(item[i].stock_quantity) > 0) {
        console.log(`id number: ${item[i].item_id}\n${item[i].product_name} (${item[i].department_name}) ~ $${item[i].price} - ${item[i].stock_quantity} left in stock!\n${divider}`)
      } else {
        console.log(`id number: ${item[i].item_id}\n${item[i].product_name} (${item[i].department_name}) ~ SOLD OUT\n${divider}`)

      }
    }
    console.log(`\n`)
    //prompt
    inquirer.prompt([
      {
        name: 'idInput',
        message: "Enter the ID number of the product you'd like to buy: ",
        type: "input",
        validate: function(input) {
          var done = this.async();
				
          setTimeout(function() {
            if (parseFloat(input) != input) {
              // Pass the return value in the done callback
              done('Please enter a number.');
              return;
            }
            // Pass the return value in the done callback
            done(null, true);
          }, 3000);
        }	
      },
      {
        name: 'unitInput',
        message: "Enter the amount you'd like to purchase: ",
        type: 'input',
        validate: function(input) {
          var done = this.async();
				
          setTimeout(function() {
            if (parseFloat(input) != input) {
              // Pass the return value in the done callback
              done('Please enter a number.');
              return;
            }
            // Pass the return value in the done callback
            done(null, true);
          }, 3000);
        }
      }
    ]).then(function(input) {
      let id = parseInt(input.idInput)
      let bought = parseInt(input.unitInput)

      buyProduct(id, bought)
    })
  })
}

//buy
function buyProduct(product, amount) {
  //query based on id
  connection.query('SELECT * FROM products WHERE ?', 
  {item_id: product}, function(err, res) {
    if (err) throw err;
    let stock = res[0].stock_quantity
    let item = res[0].product_name
    //update db
    if (stock - amount >= 0) {
      connection.query('UPDATE products SET ? WHERE ?', 
      [{
        stock_quantity: stock - amount
      },
      {
        item_id: product
      }], function(err, res) {
        if (err) throw err;
        //info to user
        console.log(`\n${divider}\nItem purchased: ${item}\nAmount Purchased: ${amount}\n${divider}\n`)
        //back to homescreen
        setTimeout(function() {home()}, 2500)
      })
    } else {
      console.log(`\n${divider}\nInsufficient stock - please select another item\n${divider}\n`)
      setTimeout(function() {selectProduct()}, 2500)
    }
  })
}
