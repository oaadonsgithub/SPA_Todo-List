const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const e = require("express");

const app = express();

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "practice",
});

con.connect((err) => {
    if (err) throw err;
    console.log("connected");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/admin", (req, res) => {
    const value = req.body;
    console.log(value.data);
    let sql = "";
    if (value.task === "admin") {
        let isadmin = false;
        console.log("Admin", value.data.name);
        con.query(
            `select isadmin from todos where name ="${value.data.name}"`,
            (err, result) => {
                console.log("he is admin", result);
                if (err) throw err;
                isadmin = result[0].isadmin == 1 ? true : false;
            }
        );
        if (isadmin == false) {
            console.log("not admin");
            sql = `update todos set isadmin=1 where name="${value.data.name}";`;
        } else {
            sql = `update todos set isadmin=NULL where name="${value.data.name}";`;
        }
    } else if (value.task === "update") {
        console.log("Update", value.data.preName);
        sql = `update todos set name="${value.data.name}",email="${value.data.email}" where name="${value.data.preName}";`;
    } else if (value.task === "delete") {
        sql = `delete from todos where name='${value.data.name}';`;
    }

    con.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Done somthing", result);
    });

    con.query("select * from todos;", (err, result) => {
        if (err) throw err;
        // console.log(result);
        res.send(JSON.stringify(result));
    });
});

app.post("/gettodos", (req, res) => {
    const data = req.body;
    console.log("I am here ", data);
    var sql = `select items, wip, done from todos where email = "${data.email}";`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
});

app.get("/multiuser", (req, res) => {
    const value = req.body;
    let sql = "select * from todos;";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
});

app.post("/signup", (req, res) => {
    const data = req.body;
    var sql = `INSERT INTO auth ( name, email, password) values ("${data.name}","${data.email}","${data.password}");`;
    con.query(sql, (err, res) => {
        if (err) throw err;
    });
});

app.post("/todo", (req, res) => {
    const data = req.body;
    var a = "onkarabirajdar@gmail.com";
    let sql3 = `select * from todos where email='${data.email}'`;
    con.query(sql3, (err, result) => {
        console.log("I am here,", result);
        if (result.length == 0) {
            let sql2 = `INSERT INTO todos ( email,name, items,done,wip) values ("${data.email}","${data.name}","${data.todos}", "${data.wip}", "${data.done}");`;
            con.query(sql2, (err, result) => {
                console.log("added!");
                if (err) throw err;
                res.send(JSON.stringify(result));
            });
        } else {
            var sql2 = `update todos set items='${data.todos}', done = '${data.done}', wip = '${data.wip}' where email='${data.email}';`;
            con.query(sql2, (err, result) => {
                console.log("updated", result);
                if (err) throw err;
                res.send(JSON.stringify(result));
            });
        }
    });
});

app.post("/", (req, res) => {
    const { name, password } = req.body;
    var sql = `select name,email,password,isadmin from auth where name='${name}' and password='${password}';`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result.length);
        if (result.length) {
            return res.json({
                auth: true,
                email: result[0].email,
                name: result[0].name,
                isadmin: result[0].isadmin,
            });
        } else {
            return res.json({ auth: false });
        }
    });
});

app.listen(8003, () => console.log("running!!"));
