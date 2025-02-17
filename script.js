let taskList = [];
let timerInterval;
let timerRunning = false;
let seconds = 0;
let minutes = 0;

document.getElementById('addTaskButton').addEventListener('click', addTask);
document.getElementById('startStopButton').addEventListener('click', toggleTimer);
document.getElementById('resetButton').addEventListener('click', resetTimer);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    if (taskText) {
        taskList.push({ text: taskText, completed: false });
        taskInput.value = '';
        renderTaskList();
    }
}

function renderTaskList() {
    const taskListElement = document.getElementById('taskList');
    taskListElement.innerHTML = '';

    taskList.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="task-text ${task.completed ? 'completed' : ''}" onclick="toggleCompletion(${index})">
                <span class="check-icon ${task.completed ? 'checked' : ''}">&#10003;</span>
                ${task.text}
            </span>
            <button class="remove-btn" onclick="removeTask(${index})">Remover</button>
        `;
        taskListElement.appendChild(li);
    });
}

function toggleCompletion(index) {
    taskList[index].completed = !taskList[index].completed;
    renderTaskList();
}

function removeTask(index) {
    taskList.splice(index, 1);  // Remove a tarefa do array
    renderTaskList();  // Atualiza a lista de tarefas
}

function toggleTimer() {
    if (timerRunning) {
        clearInterval(timerInterval);
        document.getElementById('startStopButton').textContent = 'Iniciar';
    } else {
        timerInterval = setInterval(updateTimer, 1000);
        document.getElementById('startStopButton').textContent = 'Parar';
    }
    timerRunning = !timerRunning;
}

function updateTimer() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }

    document.getElementById('timer').textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
}

function resetTimer() {
    clearInterval(timerInterval); // Para o cronômetro se estiver rodando
    timerRunning = false;
    seconds = 0;
    minutes = 0;
    document.getElementById('timer').textContent = '00:00';
    document.getElementById('startStopButton').textContent = 'Iniciar';
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}
