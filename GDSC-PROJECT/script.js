document.addEventListener('DOMContentLoaded', function() {
    // Getting references to HTML elements
    const todoForm = document.getElementById('todo-form'); // Form for adding new todos
    const todoInput = document.getElementById('todo-input'); // Input field for new todos
    const todoList = document.getElementById('todo-list'); // List to display todos
    const popupContainer = document.getElementById('popup-container'); // Container for popup messages

    // Event listener for submitting the todo form
    todoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const todoText = todoInput.value.trim();
        if (todoText !== '') {
            // Add a new todo item
            addTodoItem(todoText);
            todoInput.value = ''; // Clear the input field
            showPopup('Todo added successfully!'); // Display a success message
        } else {
            showPopup('Please enter a todo item.'); // Display an error message if input is empty
        }
    });

    // Function to add a new todo item
    function addTodoItem(todoText) {
        const todoItem = document.createElement('li'); // Create a new list item
        todoItem.classList.add('todo-item'); // Add CSS class to the todo item
        const checkbox = document.createElement('input'); // Create a checkbox for the todo item
        checkbox.type = 'checkbox'; // Set the type of the checkbox
        checkbox.id = `todo-${Date.now()}`; // Generate a unique ID for the checkbox
        const todoTextElement = document.createElement('span'); // Create a span element to display the todo text
        todoTextElement.textContent = todoText; // Set the text content of the span element
        todoTextElement.setAttribute('for', checkbox.id); // Associate the label with the checkbox
        const deleteButton = document.createElement('button'); // Create a button to delete the todo item
        deleteButton.textContent = 'Delete'; // Set the text content of the delete button
        deleteButton.addEventListener('click', function() {
            todoItem.remove(); // Remove the todo item when the delete button is clicked
            showPopup('Todo deleted successfully!'); // Display a success message
        });
        const editButton = document.createElement('button'); // Create a button to edit the todo item
        editButton.textContent = 'Edit'; // Set the text content of the edit button
        editButton.addEventListener('click', function() {
            openEditDialog(todoTextElement); // Open the edit dialog when the edit button is clicked
        });
        // Append elements to the todo item
        todoItem.appendChild(checkbox);
        todoItem.appendChild(todoTextElement);
        todoItem.appendChild(deleteButton);
        todoItem.appendChild(editButton);
        todoList.appendChild(todoItem); // Append the todo item to the todo list

        todoItem.offsetHeight; // Trigger reflow to enable CSS transition
        todoItem.classList.add('fade-in'); // Apply fade-in animation to the todo item
    }

    // Function to open the edit dialog
    function openEditDialog(todoTextElement) {
        const todoText = todoTextElement.textContent; // Get the current todo text
        const updatedTodoText = prompt('Edit Todo:', todoText); // Display a prompt to edit the todo text
        if (updatedTodoText !== null && updatedTodoText.trim() !== '') {
            // If the user entered a new todo text, update the todo item
            todoTextElement.textContent = updatedTodoText.trim(); // Update the todo text
            showPopup('Todo edited successfully!'); // Display a success message
        }
    }

    // Event listener for changing the state of a checkbox (completing or uncompleting a todo)
    todoList.addEventListener('change', function(event) {
        const checkbox = event.target; // Get the checkbox element that triggered the event
        const todoItem = checkbox.parentNode; // Get the parent element (todo item)
        if (checkbox.checked) {
            todoItem.classList.add('completed'); // Add CSS class to mark todo as completed
            showPopup('Todo completed!'); // Display a success message
        } else {
            todoItem.classList.remove('completed'); // Remove CSS class to mark todo as incomplete
            showPopup('Todo marked as incomplete.'); // Display a success message
        }
    });

    // Function to display a popup message
    function showPopup(message) {
        const popup = document.createElement('div'); // Create a new div element for the popup
        popup.classList.add('popup'); // Add CSS class to the popup
        popup.textContent = message; // Set the text content of the popup
        popupContainer.appendChild(popup); // Append the popup to the popup container
        setTimeout(function() {
            popup.remove(); // Remove the popup after 2 seconds
        }, 2000);
    }
});
