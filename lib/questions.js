const questions = [
    {
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update employee role"],
    },
    {
        type: 'input',
        name: 'addDepartment',
        message: "Enter department name.",
        when: ({options}) => options == "Add a department"
    },
    {
        type: 'input',
        name: 'title',
        message: "Enter role title.",
        when: ({options}) => options == "Add a role"
    },
    {
        type: 'input',
        name: 'salary',
        message: "Enter role salary.",
        when: ({options}) => options == "Add a role"
    },
    {
        type: 'input',
        name: 'first_name',
        message: "Enter employee's first name.",
        when: ({options}) => options == "Add an employee"
    },
    {
        type: 'input',
        name: 'last_name',
        message: "Enter employee's last name.",
        when: ({options}) => options == "Add an employee"
    },
];

export default questions;
