const sqlite3 = require('sqlite3').verbose();
const express = require('express')
const app = express()
const bodyParser = require('body-parser');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// open the database
let db = new sqlite3.Database('./db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the CAU BURGER database.');
});


// TODO implement user query
/*app.get("/api//:id", (req, res, next) => {
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
});*/

app.post("/api/addProductToOrder", (req, res, next) => {
    var data = {
        order_id: req.body.order_id,
        product_id: req.body.product_id,
    }
    db.run(
        "INSERT INTO OrderContent (order_id, product_id) values (?, ?)",
        [data.order_id, data.product_id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": err})
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
    db.all(`SELECT type_id, name price FROM Products`, function (err, rows){
        if (err) {
            console.error(err.message);
        } else {
            res.json({
                "message":"success",
                "data":rows
            })
        }
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
    });
})


app.post('/api/createOrder', function (req, res) {
    var data = {
        booth_id: req.body.name,
    }
    db.run(`INSERT INTO Orders (booth_id, confirmed) VALUES (?, '0')`[data.booth_id], function (err, result) {
        if (err) {
            console.error(err.message);
        } else {
            res.json({
                "message":"success",
                "id":this.lastID
            })
        }
    });
})

app.listen(8001, function () {
    console.log('Server listening on port 8001!')
})