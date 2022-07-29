const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: '*'
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;

//db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync().then(() => {

console.log('Drop and Resync Database with { force: true }');
initial();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/survey.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {

  Role.findByPk(1)
    .then(data => {
      if (data) {
        
      } else {
        Role.create({
          id: 1,
          name: "user"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving album with id=" + id
      });
    });

    Role.findByPk(3)
    .then(data => {
      if (data) {
        
      } else {
        Role.create({
          id: 3,
          name: "admin"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving album with id=" + id
      });
    });

    Role.findByPk(2)
    .then(data => {
      if (data) {
        
      } else {
        Role.create({
          id: 2,
          name: "moderator"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving album with id=" + id
      });
    }); 
}