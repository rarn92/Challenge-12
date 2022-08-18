INSERT INTO department (name)
VALUES
    ("HR"),
    ("SALES"),
    ("ENGINEERING");

INSERT INTO role (title, salary, department_id)
VALUES
    ("HR_REP", 50000, 1),
    ("SALES_REP", 60000, 2),
    ("ENGINEER", 70000, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("JOHN", "DOE", 1, NULL),
    ("JANE", "DOE", 2, 1),
    ("JAMES", "DOE", 3, 1);