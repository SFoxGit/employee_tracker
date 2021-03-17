const mysql = require('mysql');
const inquirer = require('inquirer');
require('console.table')

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'employeeManagementSystem'
})

connection.connect(err => {
  if (err) throw err;
  console.log('connected');
  init();
})


// array functions for choices
const roleArr = () => {
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    res.map((roleNames) => {
      return { name: roleNames.title, value: roleNames.id }
    })
  })
}
const deptArr = () => {
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    res.map((deptNames) => {
      return { name: deptNames.name, value: deptNames.id }
    })
  })
}
const managerArr = () => {
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    res.map((managerNames) => {
      if (managerNames.manager_id == null) {
        return { name: managerNames.first_name, value: managerNames.id }
      }
    })
  })
}

const initQuestions = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "toDo",
    choices: ['Add Employee', 'Add Role', 'Add Department', 'View Employees', 'View Roles', 'View Departments', 'Update Employee Roles', 'Update Employee Managers', 'View Employees by Managers', 'Delete Employees', 'Delete Roles', 'Delete Departments', 'View Department Budget', 'exit']
  },
  // Add Employee Prompts
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
    choices: roleArr(),
    when: (answers) => answers.toDo === 'Add Employee'
  },
  {
    type: "list",
    message: "Who is the employee's manager?",
    name: "manager",
    choices: managerArr(),
    when: (answers) => answers.toDo === 'Add Employee'
  },
  // Add department Prompt
  {
    type: "input",
    message: "What is the name of the new department?",
    name: "department",
    when: (answers) => answers.toDo === 'Add Department'
  },
  // add role prompts
  {
    type: "input",
    message: "What is the name of the new role?",
    name: "roleName",
    when: (answers) => answers.toDo === 'Add Role'
  },
  {
    type: "input",
    message: "What is the salary of the new role?",
    name: "salary",
    when: (answers) => answers.toDo === 'Add Role'
  },
  {
    type: "input",
    message: "What is the department of the new role?",
    name: "roleDept",
    choices: deptArr(),
    when: (answers) => answers.toDo === 'Add Role'
  }
  // {
  //   type: "",
  //   message: "",
  //   name: "",
  //   choices: [],
  //   when: (answers) => answers.toDo === 
  // },
]

// initial function called after connection, returns all questions then delegates other functions
const init = () => {
  inquirer
    .prompt(initQuestions)
    .then((answers) => {
      if (answers.toDo === 'Add Employee') { addEmployee(answers) }
      if (answers.toDo === 'Add Role') { addRole(answers) }
      if (answers.toDo === 'Add Department') { addDepartment(answers) }
      if (answers.toDo === 'View Employees') { viewEmployees(answers) }
      if (answers.toDo === 'View Roles') { viewRoles(answers) }
      if (answers.toDo === 'View Departments') { viewDepartments(answers) }
      if (answers.toDo === 'Update Employee Roles') { updateEmployeeRoles(answers) }
      if (answers.toDo === 'Update Employee Managers') { updateEmployeeManagers(answers) }
      if (answers.toDo === 'View Employees by Managers') { viewEmployeesbyManagers(answers) }
      if (answers.toDo === 'Delete Employees') { deleteEmployees(answers) }
      if (answers.toDo === 'Delete Roles') { deleteRoles(answers) }
      if (answers.toDo === 'Delete Departments') { deleteDepartments(answers) }
      if (answers.toDo === 'View Department Budget') { viewDepartmentBudget(answers) }
      if (answers.toDo === 'exit') { connection.end() }
    })
    .catch(err => {
      console.log(err);
    })

};


// secondary functions, called from init
const addEmployee = (answers) => {
  connection.query(
    'INSERT INTO employee SET ?',
    {
      first_name: answers.name,
      last_name: answers.last,
      role_id: answers.role,
      manager_id: answers.manager,
    },
    (err, res) => {
      if (err) throw err;
      console.log('Employee added!');
    }
  )
}
const addRole = (answers) => {
  connection.query(
    'INSERT INTO role SET ?',
    {
      title: answers.roleName,
      salary: answers.salary,
      department_id: answers.roleDept,
    },
    (err, res) => {
      if (err) throw err;
      console.log('role added!');
    }
  )

}
const addDepartment = (answers) => {
  connection.query(
    'INSERT INTO department SET ?',
    {
      name: answers.department,
    },
    (err, res) => {
      if (err) throw err;
      console.log('department added!');
    }
  )

}
const viewEmployees = (answers) => {
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    console.table(res);
  }
  )
  init();
}
const viewRoles = (answers) => {
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    console.table(res);
  }
  )
  init();
}
const viewDepartments = (answers) => {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    console.table(res);
  }
  )
  init();
}
const updateEmployeeRoles = (answers) => {

}
const updateEmployeeManagers = (answers) => {

}
const viewEmployeesbyManagers = (answers) => {

}
const deleteEmployees = (answers) => {

}
const deleteRoles = (answers) => {

}
const deleteDepartments = (answers) => {

}
const viewDepartmentBudget = (answers) => {

};