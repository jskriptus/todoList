'use strict';

const todoControl = document.querySelector(".todo-control"),
    headerInput = document.querySelector(".header-input"),
    todoList = document.getElementById("todo"),
    todoCompleted = document.getElementById("completed");

let todoData = [];

const getLocal = () => {
    localStorage.setItem('todoLists', JSON.stringify(todoData));
};

const render = () => {
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData = JSON.parse(localStorage.getItem('todoLists')) || [];

    todoData.forEach((item, index) => {

        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        let todoCompletedButton = li.querySelector('.todo-complete');
        todoCompletedButton.addEventListener('click', () => {
            item.completed = !item.completed;
            if (item.completed) {
                todoCompleted.append(li);
            } else {
                todoList.append(li);
            }
            getLocal();
            render();
        });

        let removeItemsFromTodo = li.querySelector('.todo-remove');
        removeItemsFromTodo.addEventListener('click', () => {
            todoData.splice(todoData.indexOf(item), 1);
            getLocal();
            render();
        });

    });

};

todoControl.addEventListener('submit', (event) => {
    event.preventDefault();
    if (headerInput.value !== '') {
        const newTodo = {
            value: headerInput.value,
            completed: false,
        };

        headerInput.value = '';

        todoData.push(newTodo);
        getLocal();
        render();
    }
});

render();