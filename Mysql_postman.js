const http = require('http')
const mysql = require('mysql2')
const port = 3000

var connection = mysql.createConnection({
    host: 'localhost',
    database: 'demo_database',
    user: 'root',
    password: 'Harshit@123'
});

// connecting to mysql 
connection.connect((err) => {
    if (err) {
        console.log('error in connecting : ', err.stack);
        return;
    }

    console.log('connected as id : ', connection.threadId)
})


const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        const viewQuery = 'select * from person_info'
        connection.query(viewQuery, (err, result) => {
            if (err) {
                console.log(err.message);
                return null;
            }
            res.statusCode = 200;
            res.end(JSON.stringify(result))
        })
    }

    if(req.url === '/' && req.method === 'POST') {
        let data = '';
        req.on('data', chunk=>{
            data += chunk
        })

        req.on('end', ()=>{
                const record = JSON.parse(data);
                const addQuery = 'INSERT INTO person_info (name, age) VALUES (? , ?)'
                connection.query(addQuery, [record.name, record.age], (err, result) => {
                    if (err) {
                        console.log(err)
                        res.end(JSON.stringify({message: err.message}))
                    }
                    res.end(JSON.stringify({message: 'Inserted Successfully'}))
                })
        })
    }

    if (req.url.startsWith('/') && req.method === 'PUT') {
        let data = '';

        req.on('data', chunk => {
            data += chunk;
        });

        req.on('end', () => {

                const record = JSON.parse(data);
                const query = 'UPDATE person_info SET name=?, age=? WHERE id=?';
                connection.query(query, [record.name, record.age, record.id], (err, result) => {

                    if (err) {
                        res.end(JSON.stringify({ message: err.message }));
                        return;
                    }

                    if (result.affectedRows === 0) {
                        res.end(JSON.stringify({ message: 'Invalid ID or record not found' }));
                    } else {
                        res.end(JSON.stringify({ message: 'Record updated successfully' }));
                    }
                });
        });
    }

    if(req.url.startsWith('/') && req.method === 'DELETE'){
        let data = '';

        req.on('data', chunk => {
            data += chunk;
        });

        req.on('end', () => {
        const record = JSON.parse(data);
        const query = 'DELETE FROM person_info WHERE id=?';
        connection.query(query, [record.id], (err, result) => {
            if (err) {
                res.end(JSON.stringify({message: err.message}))
            }
            if(result.affectedRows === 0){
                res.end(JSON.stringify({ message: 'Invalid ID' }));
            }
            res.end(JSON.stringify({message:'deleted'}))
        })
    });
    
    }

})

server.listen(port)

server.on('close', () => {
    console.log('server connection closed')
    connection.end();
})