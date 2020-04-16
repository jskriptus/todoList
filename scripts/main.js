'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('#todo'),
    todoCompleted = document.querySelector('#completed');

const render = () => {
    todoList.textContent = '';
    todoCompleted.textContent = '';

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let valueLocalStorage = JSON.parse(localStorage.getItem(key));

        if (valueLocalStorage.value !== '') { // Пустые дела добавляться не должны
            const li = document.createElement('li');
            li.classList.add('todo-item');
            li.innerHTML = `<span class="text-todo">${valueLocalStorage.value}</span>` +
                `<div class="todo-buttons">` +
                `<button class="todo-remove"></button>` +
                `<button class="todo-complete"></button>` +
                `</div>`;

            if (valueLocalStorage.completed) {
                todoCompleted.append(li);
            } else {
                todoList.append(li);
            }

            const btnTodoCompleted = li.querySelector('.todo-complete');
            btnTodoCompleted.addEventListener('click', () => {
                valueLocalStorage.completed = !valueLocalStorage.completed;
                if (valueLocalStorage.completed) {
                    todoCompleted.append(li);
                } else {
                    todoList.append(li);
                }
            });

            const btnTodoRemove = li.querySelector('.todo-remove');
            btnTodoRemove.addEventListener('click', (event) => { // Удаление дел на кнопку КОРЗИНА
                li.remove();
                localStorage.removeItem(key);
            });
        }
    };
};

todoControl.addEventListener('submit', (event) => {
    event.preventDefault();

    const newTodo = {
        value: headerInput.value,
        completed: false
    };

    if (headerInput.value !== '') {
        localStorage.setItem(localStorage.length, JSON.stringify(newTodo));
    }
    headerInput.value = ''; // Поле ввода после добавления дела должно очищаться
    render();

});

render();