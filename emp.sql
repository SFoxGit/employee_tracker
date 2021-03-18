DROP DATABASE IF EXISTS employeeManagementSystem;
CREATE DATABASE employeeManagementSystem;

USE employeeManagementSystem;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (id)
);
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id),
  PRIMARY KEY (id)
);
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  CONSTRAINT role FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id),
  PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Accounting");
INSERT INTO role (title, salary, department_id)
VALUES ("Sales-Lead", "250000", 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Head-Engineer", "200000", 2);
INSERT INTO role (title, salary, department_id)
VALUES ("CFO", "250000", 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", "80000", 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Engineer", "70000", 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", "50000", 3);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Shawn", "Fox", 1);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Anthony", "Cooper", 2);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Warren", "B", 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Max", "Allee", 5, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Al", "Bundy", 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Trevor", "Lahey", 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kevin", "Malone", 6, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Snow", 6, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tina", "Faye", 5, 2);
