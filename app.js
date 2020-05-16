const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//to load all event listeners

loadEventListeners();

function loadEventListeners() {
  //DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  //add task event
  form.addEventListener('submit', addTask);
  //remove task addEventListener
  taskList.addEventListener('click',removeTask);
  //clear task addEventListener
  clearBtn.addEventListener('click',clearTask);
  //filter Tasks
  filter.addEventListener('keyup', filterTasks);
}
//get tasks from Local Storage
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
      const li = document.createElement('li');
      li.className = 'collection-item';
      li.appendChild(document.createTextNode(task));

      //create new link createElement

      const link = document.createElement('a');
      link.className = 'delete-item secondary-content';
      link.innerHTML = '<i class="fa fa-remove"></i>';
      li.appendChild(link);
      taskList.appendChild(li);
  });
}
function addTask(e){
  if(taskInput.value === ''){
    const errDiv = document.createElement('div');
    const card = document.querySelector('.card-content');
    const heading = document.querySelector('.card-title');
    errDiv.className = 'error';
    errDiv.appendChild(document.createTextNode('Add Something!'));
    card.insertBefore(errDiv, heading);
    setTimeout(()=>{document.querySelector('.error').remove();} ,2000);
  }
  else{
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
  }
  //store in local storage
  if(taskInput.value){
    storeTaskInLocalStorage(taskInput.value);
  }


  //clear input
  taskInput.value = '';

  e.preventDefault();
}

function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')){

      e.target.parentElement.parentElement.remove();

      //removeTask from localStorage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);


  }
}

function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}
function clearTask() {
  // taskList.innerHTML = '';

  //another approach
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

  //clear from ls
  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
  localStorage.clear();
}
function filterTasks(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(
    function(task){
      const item = task.firstChild.textContent;
      if(item.toLowerCase().indexOf(text) != -1){
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    }
  );
}
