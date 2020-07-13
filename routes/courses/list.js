'use strict';
var express = require('express');
var router = express.Router();
var sql = require('mssql');
var dbConn = require('../../connect')();

//var config = {
//    user: 'sa',
//    password: 'Rubel@root',
//    server: 'CIMBD-DT-04\\SQLEXPRESS',
//    port: 1433,
//    database: 'TestDB',
//};

/* GET home page. Get all employees */
router.get('/list', function (req, res) {
    //res.render('index', { title: 'Simple Application Server', data: employees, "imgdata": getData() });
    //res.json(employees); // sends json
    //res.json({ "Message": "Welcome to course list page" });


    //var dbConn = new sql.ConnectionPool(config);
    dbConn.connect().then(function () {
        var request = new sql.Request(dbConn);
        request.query("select * from Course").then(function (recordSet) {
            console.log(recordSet);
            res.json(recordSet);
            dbConn.close();
        }).catch(function (err) {
            console.log(err);
            dbConn.close();
            res.status(400).send("Error while fetching data")
        });
    }).catch(function (err) {
        console.log(err);
    });


}); // list callback function


//router.post('/save', function (req, res) {
//    dbConn.connect().then(function () {
//        var transaction = new sql.transaction(dbConn);
//        transaction.begin().then(function () {
//            var request = new sql.request(transaction);
//            request.input("CourseName", sql.VarChar(20), "Algo");
//            request.input("CourseDescription", sql.VarChar(50), "learn algorithm");
//            request.execute("sp_InsertCourse").then(function () {
//                transaction.commit().then(function (recordSet) {
//                    dbConn.close();
//                    res.status(200).send(req.body);
//                }).catch(function (err) {
//                    dbConn.close();
//                    res.status(400).send("Error while inserting data");
//                });//transaction commit function
//            }).catch(function (err) {
//                dbConn.close();
//                res.status(400).send("Error while inserting data");
//            });//stored procedure execute function
//        }).catch(function (err) {
//            dbConn.close();
//            res.status(400).send("Error while inserting data");
//        });// transaction begin function
//    }).catch(function (err) {
//        dbConn.close();
//        res.status(400).send("Error while inserting data");
//    }); // connect function
//}); // post callback function


router.post('/save', function (req, res) {
    dbConn.connect().then(function () {
        var request = new sql.Request(dbConn);
        request.input('CourseName', sql.VarChar(20), req.body.CourseName);
        request.input("CourseDescription", sql.VarChar(50), req.body.CourseDescription);
        request.execute("sp_InsertCourse").then(function (recordSet) {
                console.log(recordSet);
                dbConn.close();
            }).catch(function (err) {
                console.log(err);
                dbConn.close();
            });
    }).catch(function (err) {
        console.log(err);
    });
});

router.put('/:id', function (req, res) {
    var _courseID = req.params.id;
    dbConn.connect().then(function () {
        var transaction = new sql.Transaction(dbConn);
        transaction.begin().then(function () {
            var request = new sql.Request(transaction);
            request.input("CourseID", sql.Int, _courseID);
            request.input("CourseName", sql.VarChar(20), req.body.CourseName);
            request.input("CourseDescription", sql.VarChar(50), req.body.CourseDescription);
            request.execute("sp_updateCourse").then(function () {
                transaction.commit().then(function (recordSet) {
                    conn.close();
                    res.status(200).send(req.body);
                }).catch(function (err) {
                    conn.close();
                    res.status(400).send("Error while updating data");
                });
            }).catch(function (err) {
                conn.close();
                res.status(400).send("Error while updating data");
            });
        }).catch(function (err) {
            conn.close();
            res.status(400).send("Error while updating data");
        });
    }).catch(function (err) {
        conn.close();
        res.status(400).send("Error while updating data");
    });
});

router.delete('/:id', function (req, res) {
    var _courseID = req.params.id;
    dbConn.connect().then(function () {
        var transaction = new sql.Transaction(dbConn);
        transaction.begin().then(function () {
            var request = new sql.Request(transaction);
            request.input("CourseID", sql.Int, _courseID)
            request.execute("sp_courseDelete").then(function () {
                transaction.commit().then(function (recordSet) {
                    conn.close();
                    res.status(200).json("CourseID:" + _courseID);
                }).catch(function (err) {
                    conn.close();
                    res.status(400).send("Error while Deleting data");
                });
            }).catch(function (err) {
                conn.close();
                res.status(400).send("Error while Deleting data");
            });
        }).catch(function (err) {
            conn.close();
            res.status(400).send("Error while Deleting data");
        });
    })
});

module.exports = router;