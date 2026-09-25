document.addEventListener('DOMContentLoaded', () => {
    
   let tasks = [];
let currentFilter = 'all';
let nextId = 1;

    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');
    const counter = document.getElementById('counter');
    const filterBtns = document.querySelectorAll('.filter-btn');

    function updateCounter() {
        const activeCount = tasks.filter(task => !task.completed).length;
        const completedCount = tasks.filter(task => task.completed).length;
        counter.textContent = `Осталось: ${activeCount}, Выполнено: ${completedCount}`;
    }

    function render() {
        taskList.innerHTML = '';

        const filteredTasks = tasks.filter(task => {
            if (currentFilter === 'active') return !task.completed;
            if (currentFilter === 'completed') return task.completed;
            return true;
        });

        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'task-item';
            if (task.completed) {
                li.classList.add('completed');
            }

            const contentDiv = document.createElement('div');
            contentDiv.className = 'task-content';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', () => toggleTask(task.id));

            const span = document.createElement('span');
            span.className = 'task-text';
            span.textContent = task.text;

            contentDiv.appendChild(checkbox);
            contentDiv.appendChild(span);

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'Удалить';
            deleteBtn.addEventListener('click', () => deleteTask(task.id));

            li.appendChild(contentDiv);
            li.appendChild(deleteBtn);

            taskList.appendChild(li);
        });

        updateCounter();
    }

    function addTask() {
        const text = taskInput.value.trim();

        if (text === '') {
            alert('Текст задачи не должен быть пустым!');
            return;
        }

        const newTask = {
            id: nextId++,
            text: text,
            completed: false
        };

        tasks.push(newTask);
        taskInput.value = '';
        render();
    }

    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        render();
    }

    function toggleTask(id) {
        tasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        render();
    }

    function setFilter(filter) {
        currentFilter = filter;
        
        filterBtns.forEach(btn => {
            if (btn.dataset.filter === filter) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        render();
    }

    addBtn.addEventListener('click', addTask);

    taskInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setFilter(btn.dataset.filter);
        });
    });

    render();
});