const sqlite3 = require('sqlite3').verbose();
const express = require('express')
const app = express()
const bodyParser = require('body-parser');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
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

app.post("/api/createOrder", (req, res, next) => {
    var OrderID;
    console.log("body:", req.body);
    var data = {
        user: req.body.user,
        booth_id: req.body.booth_id,
        takeout: req.body.takeout,
        total_price: req.body.total_price,
        products: req.body.products,
        id: 0
    }

    if (data.takeout == true) {
        data.takeout = 1;
    } else {
        data.takeout = 0;
    }
    if (data.user == null) {
        data.user = 0;
    }
    db.run(`INSERT INTO Orders (booth_id, confirmed, total_price, user, takeout) VALUES (?, '0', ?, ?, ?)`,[data.booth_id, data.total_price, data.user, data.takeout], function (err, result) {
        if (err) {
            console.error(err.message);
        } else {
            OrderID = this.lastID;
            data.id = OrderID;
            var i = 0;
            while (data.products[i]) {
                db.run(
                    "INSERT INTO OrderContent (order_id, product_id) values (?, ?)",
                    [OrderID, data.products[i].id]);
                i++;
            }
            res.json({
                "message":"success",
                "id":this.lastID
            })
        }
    });
})

app.get('/api/getAllProducts', function (req, res) {
    db.all(`SELECT p.id, p.name, p.price, pt.name as type_name FROM Products as p LEFT JOIN ProductType as pt ON p.type_id = pt.id`, function (err, rows){
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

app.get('/api/getAllCommandsContent', function (req, res) {
    var Commands =[];
    var product;
    var tmp = [];
    db.all(`SELECT OC.order_id, O.booth_id, O.confirmed, O.total_price, O.user, 
    O.takeout, group_concat(P.name, ',') as Products FROM OrderContent as OC LEFT JOIN Orders as
     O on OC.order_id = O.id LEFT JOIN Products as P on P.id = OC.product_id GROUP BY OC.order_id`, (err, rows) => {
        if (err) {
            console.error(err.message);
        } else {
            rows.forEach((row) => {
                product = row.Products;
                product = product.replace(product, '[{"name":"'+product+'"}]');
                product = product.replace(',', '"}, {"name":"');
                product = JSON.parse(product)
                tmp = {total_price: row.total_price, order_id: row.order_id, user: row.user, products:product, takeout: row.takeout, confirmed: row.confirmed};
                Commands.push(tmp);
                //console.log(row.name);
            });
            res.json({
                "message":"success",
                "data":Commands
            })
        }
    });
})

app.put('/api/confirmOrder/:orderId', function (req, res) {
    var data = {
        booth_id: req.body.booth_id,
        user: req.body.user,
        total_price: req.body.total_price,
        takeout: req.body.takeout
    }
    db.run(`UPDATE Orders set confirmed = '1'WHERE id = ?`,[req.params.orderId], function (err, result) {
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