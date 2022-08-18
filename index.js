import { createConnection } from 'mysql2';
import inquirer from 'inquirer';
import cTable from 'console.table';
import questions from './lib/questions.js';


const db = createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

const showDepartments = async ()=> {
    let data = await db.promise().query("SELECT * FROM department");

    console.table(data[0]);
    init();
};

const showRoles = async ()=> {
    let data = await db.promise().query("SELECT * FROM role");

    console.table(data[0]);
    init();
};

const showEmployees = async ()=> {
    let data = await db.promise().query("SELECT * FROM employee");

    console.table(data[0]);
    init();
};

const addDepartment = async (ans)=> {
    let data = await db.promise().query(`INSERT INTO department (name) VALUES ("${ans.addDepartment}")`);
    init();
};

const addRole = async ({title, salary})=> {
    var departments = await db.promise().query("SELECT name, id AS value FROM department");
    inquirer.prompt([
        {
            type: 'list',
            name: 'department_id',
            message: "Choose department.",
            choices: departments[0]
        }
    ]).then(({department_id}) => {
        let data = db.promise().query(`INSERT INTO role SET ?`, {title, salary, department_id});

        init();
    });
};

const addEmployee = async ({first_name, last_name})=> {
    let roles = await db.promise().query("SELECT title AS name, id AS value FROM role");
    let managers = await db.promise().query("SELECT CONCAT(first_name, ' ', last_name) AS name, id AS value FROM employee");

    inquirer.prompt([
        {
            type: 'list',
            name: 'role_id',
            message: "Select employee's role.",
            choices: roles[0]
        },
        {
            type: 'list',
            name: 'manager_id',
            message: "Select manager.",
            choices: managers[0]
        }
    ]).then(({role_id, manager_id}) => {
        let data = db.promise().query(`INSERT INTO employee SET ?`, {first_name, last_name, role_id, manager_id});

        init();
    });
};

const updateRole = async ()=> {
    let roles = await db.promise().query("SELECT title AS name, id AS value FROM role");
    let employees = await db.promise().query("SELECT CONCAT(first_name, ' ', last_name) AS name, id AS value FROM employee");

    inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: "Select employee to update.",
            choices: employees[0]
        },
        {
            type: 'list',
            name: 'role_id',
            message: "Select new role for employee.",
            choices: roles[0]
        }
    ]).then(({id, role_id}) => {
        let data = db.promise().query(`UPDATE employee SET ? WHERE ?`,[{role_id}, {id}]);

        init();
    });
};


function init() {
    inquirer.prompt(questions)
    .then(ans => {
        if(ans.options == "View all departments") showDepartments();
        if(ans.options == "View all roles") showRoles();
        if(ans.options == "View all employees") showEmployees();
        if(ans.options == "Add a department") addDepartment(ans);
        if(ans.options == "Add a role") addRole(ans);
        if(ans.options == "Add an employee") addEmployee(ans);
        if(ans.options == "Update employee role") updateRole();
    })

};


init();