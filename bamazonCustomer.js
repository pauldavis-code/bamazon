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

home()
//database query
function home() {
  connection.query('SELECT * FROM products', function(err, res) {
    if (err) throw err;
    let item = res
    //list items to terminal
    console.log(`\n===============================`)
    for (let i = 0; i < item.length; i++) {
      console.log(`id number: ${item[i].item_id}\n${item[i].product_name} (${item[i].department_name}) - $${item[i].price}\n===============================`)
    }
    console.log(`\n`)
    //prompt
    inquirer.prompt([
      {
        name: 'idInput',
        message: "Enter the ID number of the product you'd like to buy:",
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
      }
    ]).then(function(res, err) {
      if (err) throw err;
      console.log(res.idInput)
    })

  })
}