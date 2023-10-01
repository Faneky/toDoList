const inputEl = document.querySelector('#input')
const list = document.querySelector('#list')
const btn = document.querySelector('#btn')

const todoList = JSON.parse(localStorage.getItem('list'))
if(todoList){
   todoList.forEach(listItem => createTask(listItem.text))
}

const message = document.createElement('p')
message.textContent = 'Задач нет'
message.style.color = '#fff'
message.style.textAlign = 'center'
list.appendChild(message)


function createTask(){
   const input = inputEl.value

   if(input.length > 0){
      //Создаем li элемент
      const listItem = document.createElement('li')
      listItem.textContent = input
      list.appendChild(listItem)
      inputEl.value = ''

      const listContainer = document.createElement('div')
      listContainer.style.display = 'flex'
      listItem.appendChild(listContainer)


      //Кнопка создать задачу
      const btnDone = document.createElement('button')
      btnDone.innerHTML = `<img src='./img/arrow.svg'>`
      btnDone.classList.add('btn-add')
      listContainer.appendChild(btnDone)
      //При нажатии на кнопку зачеркивает текст
      btnDone.addEventListener('click', () => {
         listItem.classList.toggle('done')
         btnDone.classList.toggle('darker')
      })

      //Кнопка удаления
      const btnRemove = document.createElement('button')
      btnRemove.innerHTML = `<img src='./img/cross.png'>`
      btnRemove.classList.add('btn-remove')
      listContainer.appendChild(btnRemove)
      //Удалить задачу
      btnRemove.addEventListener('click', () => {
         listItem.remove()
         updateLS()
      })
      message.remove()
      updateLS()
   } 
}
inputEl.addEventListener('keyup', (e) => {
   if(e.keyCode === 13){
      createTask()
      updateLS()
   }
})
btn.addEventListener('click', createTask)

function updateLS(){
   listItem = document.querySelectorAll('li')

   const todos = []

   listItem.forEach(listItem => {
      todos.push({
         text: listItem.innerText
      })
   })
   console.log(listItem)
   localStorage.setItem('list', JSON.stringify(todos))
}
