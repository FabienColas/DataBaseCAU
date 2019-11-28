const sqlite3 = require('sqlite3').verbose();
const express = require('express')
const app = express()

// open the database
let db = new sqlite3.Database('./db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the CAU BURGER database.');
});

app.get('/getAllProducts', function (req, res) {
    db.all(`SELECT type_id, name price FROM Products`, (err, rows) => {
        if (err) {
            console.error(err.message);
        } else {
            res.json({
                "message":"success",
                "data":rows
            })
        }
        //console.log(row.name + "\t\t" + row.price);
    });
})

app.listen(8001, function () {
    console.log('Server listening on port 8001!')
})