const mysql = require('mysql');
const inquirer = require('inquirer')

const connection = mysql.createConnection({
  host: 'localhost',

  port: 3306,

  user: 'root',

  password: '',
  database: 'employeeDB',
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}\n`);
  init();
});

const initQuestions = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "toDo",
    choices: ['Add Employee', 'Add Role', 'Add Department', 'View Employees', 'View Roles', 'View Departments', 'Update Employee Roles', 'Update Employee Managers', 'View Employees by Managers', 'Delete Employees', 'Delete Roles', 'Delete Departments', 'View Department Budget']
  },
  {
    type: "input",
    message: "Employee's first name:",
    name: "name",
    when: (answers) => answers.toDo === 'Add Employee'
  },
  {
    type: "input",
    message: "Employee's last name:",
    name: "last",
    when: (answers) => answers.toDo === 'Add Employee'
  },
  {
    type: "list",
    message: "What is the employee's role?",
    name: "role",
    choices: [PUT AN ARRAY HERE FROM SQL],
    when: (answers) => answers.toDo === 'Add Employee'
  },
  {
    type: "list",
    message: "Who is the employee's manager?",
    name: "manager",
    choices: [ARRAY OF ALL MANAGERS],
    when: (answers) => answers.toDo === 'Add Employee'
  },
  {
    type: "input",
    message: "What is the name of the new department?",
    name: "department",
    when: (answers) => answers.toDo === 'Add Department'
  },
  {
    type: "input",
    message: "What is the name of the new role?",
    name: "role",
    when: (answers) => answers.toDo === 'Add Role'
  },
  // {
  //   type: "",
  //   message: "",
  //   name: "",
  //   choices: [],
  //   when: (answers) => answers.toDo === 
  // },
]

const init = () => {
  inquirer
    prompt(initQuestions)
    .then((answers) => {
      if (answers.toDo === 'Add Employee') {addEmployee(answers)}
      if (answers.toDo === 'Add Role') {addRole(answers)}
      if (answers.toDo === 'Add Department') {addDepartment(answers)}
      if (answers.toDo === 'View Employees') {viewEmployees(answers)}
      if (answers.toDo === 'View Roles') {viewRoles(answers)}
      if (answers.toDo === 'View Departments') {viewDepartments(answers)}
      if (answers.toDo === 'Update Employee Roles') {updateEmployeeRoles(answers)}
      if (answers.toDo === 'Update Employee Managers') {updateEmployeeManagers(answers)}
      if (answers.toDo === 'View Employees by Managers') {viewEmployeesbyManagers(answers)}
      if (answers.toDo === 'Delete Employees') {deleteEmployees(answers)}
      if (answers.toDo === 'Delete Roles') {deleteRoles(answers)}
      if (answers.toDo === 'Delete Departments') {deleteDepartments(answers)}
      if (answers.toDo === 'View Department Budget') {viewDepartmentBudget(answers)}
    })
    .catch(err => {
      console.log(err);
    })
}














