const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "swarajdb",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM todolist";
  db.query(sqlGet, (error, result) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    } else {
      res.send(result);
    }
  });
});


app.post("/api/post", (req, res) => {
  const { title, content } = req.body;
  const sqlInsert = "INSERT INTO todolist (title,content) VALUES (?,?)";
  db.query(sqlInsert, [title, content], (error, result) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).send("Data saved successfully");
    }
  });
});
app.delete("/api/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM todolist WHERE id= ?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).send("Data saved successfully");
    }
  });
});

app.get("/api/get/:id", (req, res) => {
  const{id}=req.params;
  const sqlGet = "SELECT * FROM todolist where id=?";
  db.query(sqlGet, id,(error, result) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    } else {
      res.send(result);
    }
  });
});

app.put("/api/update/:id", (req, res) => {
  const{id}=req.params;
  const {title, content}=req.body;
  const sqlUpdate = "UPDATE todolist SET title=?,content=? WHERE id=?";
  db.query(sqlUpdate, [title,content,id],(error, result) => {
    if (error) {
      console.error("Error:", error);
      res.send("Internal Server Error");
    } else {
      res.send(result);
    }
  });
});

app.get("/",(req,res)=>{res.send("Hello Express")})
app.listen(3500, () => {
  console.log("Server is running on port: 3500");
});
