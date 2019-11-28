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

app.get("/api//:id", (req, res, next) => {
    var sql = "select * from user where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":row
        })
    });
});

app.patch("/api/addProductToOrder:order_id", (req, res, next) => {
    var data = {
        order_id: req.body.name,
        product_id: req.body.product_id,
    }
    db.run(/*
        `UPDATE user set 
           name = COALESCE(?,name), 
           email = COALESCE(?,email), 
           password = COALESCE(?,password) 
           WHERE id = ?`*/
        'INSERT INTO OrderContent order_id, product_id values (?, ?)',
        [data.order_id, data.product_id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
        });
})

app.get('/api/getAllProducts', function (req, res) {
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

app.get('/api/getAllProductType', function (req, res) {
    db.all(`SELECT * FROM ProductType`, (err, rows) => {
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


app.get('/api/createOrder', function (req, res) {
    db.run(`INSERT INTO Orders (booth_id, confirmed) VALUES ('0', '0')`, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            // get the last insert id
            console.log(`A row has been inserted with rowid ${this.lastID}`);
            var id = this.lastID;
            console.log(id);
            res.json({
                "message":"success",
                "data":id
            })
        }
        //console.log(row.name + "\t\t" + row.price);
    });
})

app.listen(8001, function () {
    console.log('Server listening on port 8001!')
})