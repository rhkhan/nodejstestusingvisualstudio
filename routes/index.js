'use strict';
var express = require('express');
var router = express.Router();
//const path = require("path");
const models = require('../models');

var employees = [
    {
        Id: 1,
        FirstName: "Rashedul",
        LastName: "Khan",
        Designation: "Senior Software Engineer"
    },
    {
        Id: 2,
        FirstName: "x",
        LastName: "xx",
        Designation: "Senior ss"
    }
];


var getData = function () {
    var data = {
        'item1': 'http://public-domain-photos.com/free-stock-photos-1/flowers/cactus-76.jpg',
        'item2': 'http://public-domain-photos.com/free-stock-photos-1/flowers/cactus-77.jpg',
        'item3': 'http://public-domain-photos.com/free-stock-photos-1/flowers/cactus-78.jpg'
    }
    return data;
}

/* GET home page. Get all employees */
router.get('/', function (req, res) {
    res.render('index', { title: 'Simple Application Server', data: employees, "imgdata": getData() });
    //res.render('index', { title: 'Simple Application Server'});
    //res.json(employees); // sends json
});

router.post('/', function (req,res) {
    //console.log("lead email:", req.body.lead_email);
    return models.Lead.create({
        email:req.body.lead_email
    }).then(lead => {
        res.redirect('/leads');
    })
})

router.get('/leads', function (req, res) {
    return models.Lead.findAll().then(leads => {
        res.render('index', { title: 'Express', leads: leads, data: employees, "imgdata": getData() });
    })
})

router.get('/lead/:lead_id', function (req, res) {
    return models.Lead.findOne({
        where: {
            id:req.params.lead_id
        }
    }).then(lead => {
        res.render('lead', { lead: lead });
    })
})

router.get("/lead/:lead_id/edit", function (req, res) {
    return models.Lead.findOne({
        where: {
            id: req.params.lead_id
        }
    }).then(lead => {
        res.render('lead/edit_lead', { lead: lead });
    })
})

router.post("/lead/:lead_id/edit", function (req, res) {
    return models.Lead.update(
        {
        email: req.body.lead_email
        },
        {
                where: {
                  id:req.params.lead_id
            }
        }).then(result => {
            res.redirect('/lead/' + req.params.lead_id); 
        })
})

router.post("/lead/:lead_id/delete", function (req, res) {
    return models.Lead.destroy({
        where: {
            id:req.params.lead_id
        }
    }).then(result => {
        res.redirect('/leads'); 
    })
})

router.post("/lead/:lead_id/delete-json", function (req, res) {
    return models.Lead.destroy({
        where: {
            id: req.params.lead_id
        }
    }).then(result => {
        res.send({ msg: "Success" });
    })
})


//get specific employee based on Id
//router.get("/:Id", function (req, res) {
//    var employeeId = parseInt(req.params.Id);
//    var current_employee = employees.filter(e => e.Id == employeeId)[0];
//    if (current_employee) {
//        res.json(current_employee);
//    }
//    else
//        res.sendStatus(404);
//});

//Add employee
//router.post("/", function (req, res) {
//    var emp = req.body;
//    if (isValidEmployee(emp)) {
//        employees.push(emp);
//        res.send(emp);
//    }
//    res.send(404);
//});

//Update employee
//router.put("/:Id", function (req, res) {
//    var employeeId = parseInt(req.params.Id);
//    var current_employee = employees.filter(e => e.Id == employeeId);
//    if (current_employee) {
//        let employee = req.body;
//        if (isValidEmployee(current_employee)) {
//            current_employee.FirstName = employee.FirstName;
//            current_employee.LastName = employee.LastName;
//            current_employee.Designation = employee.Designation;
//            res.sendStatus(204);
//        }
//        else
//            res.sendStatus(500);
//    }
//    else
//        res.sendStatus(404);
//});

//Delete employee
//router.delete("/:Id", function (req, res) {
//    var employeeId = parseInt(req.params.Id);
//    var current_employee = employees.filter(e => e.Id == employeeId);
//    if (current_employee) {
//        employees = employees.filter(e => e.Id != employeeId);
//        res.sendStatus(204);
//    }
//    else
//        res.sendStatus(404);
//});

//validation for employee
//function isValidEmployee(employee) {
//    if (!employee.Id) {
//        return false;
//    }
//    if (!employee.FirstName) {
//        return false;
//    }
//    if (!employee.LastName) {
//        return false;
//    }
//    if (!employee.Designation) {
//        return false;
//    }
//    return true;
//}

module.exports = router;
