var sql = require("mssql");
var connect = function () {
    //var conn = new sql.ConnectionPool({
    //    user: 'sa',
    //    password: 'Rubel@root',
    //    server: 'CIMBD-DT-04\\SQLEXPRESS',
    //    options: {
    //        port: 7980,
    //        database: 'TestDB',
    //        instancename: 'SQLEXPRESS'
    //    }
    //});

    //return conn;

    var config = {
        user: 'sa',
        password: 'Rubel@root',
        server: 'CIMBD-DT-04\\SQLEXPRESS',
        port: 1433,
        database: 'TestDB',
    };

    var dbConn = new sql.ConnectionPool(config);

    return dbConn;
};

module.exports = connect;