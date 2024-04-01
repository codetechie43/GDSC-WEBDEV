document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const popupContainer = document.getElementById('popup-container');

    todoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const todoText = todoInput.value.trim();
        if (todoText !== '') {
            addTodoItem(todoText);
            todoInput.value = '';
            showPopup('Todo added successfully!');
        } else {
            showPopup('Please enter a todo item.');
        }
    });

    function addTodoItem(todoText) {
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `todo-${Date.now()}`;
        const todoTextElement = document.createElement('span');
        todoTextElement.textContent = todoText;
        todoTextElement.setAttribute('for', checkbox.id);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            todoItem.remove();
            showPopup('Todo deleted successfully!');
        });
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.classList.add('edit');
        editInput.value = todoText;
        editInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                todoTextElement.textContent = editInput.value;
                toggleEditMode(todoItem);
                showPopup('Todo edited successfully!');
            }
        });
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', function() {
            toggleEditMode(todoItem);
        });
        todoItem.appendChild(checkbox);
        todoItem.appendChild(todoTextElement);
        todoItem.appendChild(deleteButton);
        todoItem.appendChild(editInput);
        todoItem.appendChild(editButton);
        todoList.appendChild(todoItem);

        todoItem.offsetHeight; // Trigger reflow
        todoItem.classList.add('fade-in');
    }

    function toggleEditMode(todoItem) {
        const todoTextElement = todoItem.querySelector('span');
        const editInput = todoItem.querySelector('input[type="text"]');
        const editButton = todoItem.querySelector('button');
        const deleteButton = todoItem.querySelector('button');
        if (editInput.style.display === 'none') {
            editInput.value = todoTextElement.textContent;
            editInput.style.display = 'inline-block';
            todoTextElement.style.display = 'none';
            editButton.textContent = 'Save';
            deleteButton.style.display = 'none';
        } else {
            todoTextElement.textContent = editInput.value;
            editInput.style.display = 'none';
            todoTextElement.style.display = 'inline-block';
            editButton.textContent = 'Edit';
            deleteButton.style.display = 'inline-block';
        }
    }

    todoList.addEventListener('change', function(event) {
        const checkbox = event.target;
        const todoItem = checkbox.parentNode;
        if (checkbox.checked) {
            todoItem.classList.add('completed');
            showPopup('Todo completed!');
        } else {
            todoItem.classList.remove('completed');
            showPopup('Todo marked as incomplete.');
        }
    });

    function showPopup(message) {
        const popup = document.createElement('div');
        popup.classList.add('popup');
        popup.textContent = message;
        popupContainer.appendChild(popup);
        setTimeout(function() {
            popup.remove();
        }, 2000);
    }
});
