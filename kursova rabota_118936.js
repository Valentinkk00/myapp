class MobileApp {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        this.projects = JSON.parse(localStorage.getItem('projects')) || [];
    }

    
    addUser(name, email) {
        if (!name || !email) {
            console.log("Грешка: Име и имейл са задължителни полета.");
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log("Грешка: Моля, въведете валиден имейл адрес.");
            return;
        }
        
        if (this.users.some(user => user.email === email)) {
            console.log("Грешка: Потребител с този имейл адрес вече съществува.");
            return;
        }
        const newUser = new User(name, email);
        this.users.push(newUser);
        console.log(`Потребител ${name} е добавен успешно.`);
    }

   
    addProject(name, description, teamSize, functionality) {
        if (!name || !description || !teamSize || !functionality) {
            console.log("Грешка: Име, описание, размер на екипа и функционалности са задължителни полета.");
            return;
        }
        const newProject = new Project(name, description, teamSize, functionality);
        this.projects.push(newProject);
        console.log(`Проект ${name} е добавен успешно.`);
    }

    
    listUsers() {
        console.log("Списък с потребители:");
        this.users.forEach(user => {
            console.log(`- ${user.name} (${user.email})`);
        });
    }

   
    listProjects() {
        console.log("Списък с проекти:");
        this.projects.forEach(project => {
            console.log(`- ${project.name}: ${project.description}`);
        });
    }
    
    
    saveData() {
        localStorage.setItem('users', JSON.stringify(this.users));
        localStorage.setItem('projects', JSON.stringify(this.projects));
        console.log("Данните са запазени успешно в локалното хранилище.");
    }
}


class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
}


class Project {
    constructor(name, description, teamSize, functionality) {
        this.name = name;
        this.description = description;
        this.teamSize = teamSize;
        this.functionality = functionality;
    }
}


function handleCommand(command) {
    const args = command.split(" ");
    const action = args.shift();

    switch (action) {
        case "addUser":
            const [name, email] = args;
            mobileApp.addUser(name, email);
            break;
        case "addProject":
            const [projectName, description, teamSize, ...functionality] = args;
            mobileApp.addProject(projectName, description, teamSize, functionality);
            break;
        case "listUsers":
            mobileApp.listUsers();
            break;
        case "listProjects":
            mobileApp.listProjects();
            break;
        
        default:
            console.log("Невалидна команда. Опитайте отново.");
    }
}


const mobileApp = new MobileApp();


window.addEventListener('beforeunload', () => {
    mobileApp.saveData();
});

// Примерно използване на CLI интерфейса
handleCommand("addUser Иван ivan@example.com");
handleCommand("addUser Петър peter@example.com");
handleCommand("addProject MobileApp1 Описание 5 Функционалност1 Функционалност2");
handleCommand("listUsers");
handleCommand("listProjects");
