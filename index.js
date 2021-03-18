const mysql = require('mysql');
const inquirer = require('inquirer');
require('console.table');

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



const initQuestions = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "toDo",
    choices: ['Add Employee', 'Add Role', 'Add Department', 'View Employees', 'View Roles', 'View Departments', 'Update Employee Roles', 'exit']
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
      // if (answers.toDo === 'Update Employee Managers') { updateEmployeeManagers(answers) }
      // if (answers.toDo === 'View Employees by Managers') { viewEmployeesbyManagers(answers) }
      // if (answers.toDo === 'Delete Employees') { deleteEmployees(answers) }
      // if (answers.toDo === 'Delete Roles') { deleteRoles(answers) }
      // if (answers.toDo === 'Delete Departments') { deleteDepartments(answers) }
      // if (answers.toDo === 'View Department Budget') { viewDepartmentBudget(answers) }
      if (answers.toDo === 'exit') { connection.end() }
    })
    .catch(err => {
      console.log(err);
    })

};


// secondary functions, called from init
const addEmployee = (answers) => {
  connection.query('SELECT * FROM role', (err, res) => {
    inquirer
      .prompt(
        {
          type: "list",
          message: "What is the employee's role?",
          name: "role",
          choices:
            res.map((empRole) => {
              return { name: empRole.title, value: empRole.id }
            }),
        },
      )
      .then((answer) => {
        managerArr(answer)
      })
  })
  const managerArr = (answer) => {
    connection.query('SELECT * FROM employee', (err, res) => {
      inquirer
        .prompt(
          [
            {
              type: "list",
              message: "Who is the employee's manager?",
              name: "manager",
              choices:
                res.map((empMan) => {
                  return { name: `${empMan.first_name} ${empMan.last_name}`, value: empMan.id }
                })
            }
          ]
        )
        .then((manSelect) => {
          writeEmp(answer, manSelect);
        });
    });
  }
  const writeEmp = (answer, manSelect) => {
    connection.query(
      'INSERT INTO employee SET ?',
      {
        first_name: answers.name,
        last_name: answers.last,
        role_id: Object.values(answer)[0],
        manager_id: Object.values(manSelect)[0],
      },
      (err, res) => {
        if (err) throw err;
        console.log('Employee added!');
      }
    )
    init();
  }
}


const addRole = (answers) => {
  connection.query('SELECT * FROM department', (err, res) => {
    inquirer
      .prompt(
        [
          {
            type: "list",
            message: "What is the department of the new role?",
            name: "roleDept",
            choices:
              res.map((deptNames) => {
                return { name: deptNames.name, value: deptNames.id }
              })


          }
        ]
      )
      .then((second) => {
        connection.query(
          'INSERT INTO role SET ?',
          {
            title: answers.roleName,
            salary: answers.salary,
            department_id: Object.values(second)[0],
          },
          (err, res) => {
            if (err) throw err;
            console.log('role added!');
          }
        )
        init();

      });
  });

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
  init();
}
const viewEmployees = (answers) => {
  let query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
  CONCAT(manager.first_name, ' ', manager.last_name)
  AS manager
  FROM employee
  INNER JOIN role
  ON role.id = employee.role_id
  INNER JOIN department
  ON role.department_id = department.id
  LEFT JOIN employee manager ON employee.manager_id = manager.id;`;
  connection.query(query, (err, res) => {
    console.log('---------------------------------------')
    console.table(res);
    init();
  }
  )
}
const viewRoles = (answers) => {
  connection.query('SELECT title, salary, department.name FROM role INNER JOIN department on department.id = role.department_id', (err, res) => {
    if (err) throw err;
    console.log('---------------------------------------')
    console.table(res);
  }
  )
  init();
}
const viewDepartments = (answers) => {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    console.log('---------------------------------------')
    console.table(res);
  })
  init();
}
const updateEmployeeRoles = (answers) => {
  connection.query('SELECT * FROM employee', (err, res) => {
    inquirer
      .prompt(
        [
          {
            type: "list",
            message: "Which employee would you like to edit?",
            name: "empEdit",
            choices:
              res.map((empMan) => {
                return { name: `${empMan.first_name} ${empMan.last_name}`, value: empMan.id }
              })
          }
        ]
      )
      .then((empSelect) => {
        upRole(empSelect);
      });
  });
  const upRole = (empSelect) => {
    connection.query('SELECT * FROM role', (err, res) => {
      inquirer
        .prompt(
          {
            type: "list",
            message: "What is the employee's new role?",
            name: "role",
            choices:
              res.map((empRole) => {
                return { name: empRole.title, value: empRole.id }
              }),
          },
        )
        .then((answer) => {
          writeNewRole(answer, empSelect)
        })
    })
  }
  const writeNewRole = (answer, empSelect) => {
    let newRole = Object.values(answer)[0]
    let currentEmp = Object.values(empSelect)[0]
    connection.query(`UPDATE employee SET role_id = ${newRole} WHERE employee.id = ${currentEmp}`,
      (err, res) => {
        if (err) throw err;
        console.log('Employee added!');
      }
    )
    init();
  }
}
// const updateEmployeeManagers = (answers) => {

// }
// const viewEmployeesbyManagers = (answers) => {

// }
// const deleteEmployees = (answers) => {

// }
// const deleteRoles = (answers) => {

// }
// const deleteDepartments = (answers) => {

// }
// const viewDepartmentBudget = (answers) => {

// };

// bonus prompt 'Update Employee Managers', 'View Employees by Managers', 'Delete Employees', 'Delete Roles', 'Delete Departments', 'View Department Budget', 