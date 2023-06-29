// Used to set up the server and define application routes.

require("dotenv").config();
const inquirer = require("inquirer");
const connection = require("./config/connection");

// Create connection to the database

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database.");
  start();
});

function start() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.action) {
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployeeRole();
          break;
      }
    });
}

function viewAllDepartments() {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function viewAllRoles() {
  connection.query("SELECT * FROM roles", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function viewAllEmployees() {
  connection.query("SELECT * FROM employees", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the department?",
      },
    ])
    .then((answer) => {
      connection.query("INSERT INTO department SET ?", answer, (err, res) => {
        if (err) throw err;
        console.log(`${res.affectedRows} department inserted!\n`);
        start();
      });
    });
}

function addRole() {
  connection.query("SELECT * FROM department", (err, departments) => {
    if (err) throw err;
    console.log("Here are the departments: ", departments);
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the title of the role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary of the role?",
        },
        {
          type: "list",
          name: "department_id",
          message: "Which department does this role belong to?",
          choices: department.map((department) => {
            return department.name;
          }),
        },
      ])
      .then((answers) => {
        const department = department.find((department) => {
          return department.name === answers.department_id;
        });
        connection.query(
          "INSERT INTO roles SET ?",
          {
            title: answers.title,
            salary: answers.salary,
            department_id: department.id,
          },
          (err, res) => {
            if (err) throw err;
            console.log(res.affectedRows + " role inserted!\n");
            start();
          }
        );
      });
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the first name of the employee?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the last name of the employee?",
      },
      {
        type: "input",
        name: "role_id",
        message: "What is the role id of the employee?",
      },
      {
        type: "input",
        name: "manager_id",
        message: "What is the manager's id of the employee?",
      },
    ])
    .then((answers) => {
      connection.query(
        "INSERT INTO employees SET ?",
        {
          first_name: answers.first_name,
          last_name: answers.last_name,
          role_id: answers.role_id,
          manager_id: answers.manager_id,
        },
        (err, res) => {
          if (err) throw err;
          console.log(res.affectedRows + " employee inserted!\n");
          start();
        }
      );
    });
}
