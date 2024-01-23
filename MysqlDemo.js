var mysql = require('mysql2');

// creating a connection
var connection = mysql.createConnection({
    host: 'localhost',
    database: 'demo_database',
    user: 'root',
    password: 'Harshit@123',
    multipleStatements: true
});

// connecting to mysql 
connection.connect((err) => {
    if (err) {
        console.log('error in connecting : ', err.stack);
        return;
    }

    console.log('connected as id : ', connection.threadId)
})



// performing basic crud on mysql


//creating a table ----------------------

// connection.query('create table city_info (city_id int, city_name varchar(20),temperature int, state varchar(20));', 
// (error, results, fields) => {
//     if (error) {
//         throw error
//     }
// })


// Adding data ----------------------

// connection.query(`insert into city_info values (1,"ahmedabad",25,"gujarat");
// INSERT INTO city_info VALUES (2,"jaipur",37,"rajasthan");
// INSERT INTO city_info VALUES (3,"surat",30,"gujarat");
// INSERT INTO city_info VALUES (4,"mumbai",21,"maharastra");
// INSERT INTO city_info VALUES (5,"new delhi",18,"delhi");`
// , (error, results, fields) => {
//     if (error) {
//         throw error
//     }
// })


// reading table data -------------------------

// connection.query('select * from city_info', (error, results, fields) => {
//     if (error) {
//         throw error
//     }

//     results.forEach(item => {
//         console.log(item);
//     });
// })


// Updating table data -----------------

// connection.query('update city_info SET temperature = 29 where city_name = "jaipur";', 
// (error, results, fields) => {
//     if (error) {
//         throw error
//     }
// })


// Deleting the table ------------------

// connection.query('drop table city_info;', 
// (error, results, fields) => {
//     if (error) {
//         throw error
//     }
// })

connection.end();