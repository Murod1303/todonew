/* dark mode  */




let dark=localStorage.setItem("dark",JSON.stringify(""))
let elMode = document.querySelector(".todo__swtich");
function mode() {
    resDark=JSON.parse(localStorage.getItem("dark" || "false"))
    elMode.checked=resDark;
    let settheme = document.body;
    resDark?settheme.classList.add("dark"):settheme.classList.remove("dark")
}
mode()

elMode.addEventListener("click", ()=> {
    localStorage.setItem("dark",!resDark)
    mode()
})

let setTheme = document.body;
    setTheme.classList.toggle("dark");
    let theme;

    if(setTheme.classList.contains("dark")) {
        theme = "dark"
    }else {
        theme = "ligth"
    }


/* dark mode end  */

/* to bting html file with queryselector */
let elForm = document.querySelector(".todo__form");
let elInput = document.querySelector(".todo__input");
let elList = document.querySelector(".todo__list");


/* create arr for draw DOM  temporarly */
let arr = JSON.parse(localStorage.getItem(`newObj`) || "[]");
console.log(arr);
renderTodo(arr)

/*  create function  */
function renderTodo(dataa) {
    elList.innerHTML = "";
    /* rounded func */
    dataa.forEach(item => {
        
        /* create li element and add class */
        let liElement = document.createElement("li");
        liElement.classList.add("todo__item")
        
        /* create input , add class and setAtribute */
        let inputElement = document.createElement("input");
        inputElement.classList.add("todo__check")
        inputElement.setAttribute("type", "checkbox")
        
        let pElement = document.createElement("p")
        pElement.classList.add("todo__desc")
        pElement.textContent = item.task
        
        let divElement =document.createElement("div");
        divElement.classList.add("todo__btn-wrapper")
        
        let btnEditElement = document.createElement("button")
        btnEditElement.classList.add("todo__edit")
        btnEditElement.setAttribute("type", "button")
        btnEditElement.dataset.id = item.id;
        
        let btnDeleteElement = document.createElement("button")
        btnDeleteElement.classList.add("todo__delete")
        btnDeleteElement.setAttribute("type", "button")
        btnDeleteElement.dataset.id = item.id
        
        
        /* and then we appended elements */
        divElement.append(btnEditElement, btnDeleteElement);
        liElement.append(inputElement, pElement, divElement)
        elList.appendChild(liElement)
    });
}
renderTodo(arr)

/* form for add new obj  */
elForm.addEventListener("submit", (evt)=> {
    evt.preventDefault();
    
    let elInputValue = elInput.value.trim()
    
    let newObj = {
        id: arr.length ? arr.length + 1 : 1,
        task:elInputValue,
    };
    
    
    arr.push(newObj);
    localStorage.setItem("newObj", JSON.stringify(arr))
    renderTodo(arr)
    
    elInput.value = "";
})


elList.addEventListener("click", evt=> {
    if (evt.target.matches(".todo__delete")) {
        let deleteId = evt.target.dataset.id
        
        let findObject = arr.findIndex(function(item) {
            return item.id == deleteId
        })
        
        arr.splice(findObject, 1);
        localStorage.setItem("newObj", JSON.stringify(arr))
        renderTodo(arr);
    }
    
    if (evt.target.matches(".todo__edit")) {
        let editPrompt = prompt("Taskni kiriting")
        
        let editId = evt.target.dataset.id
        
        let findedit = arr.find(function(item) {
            return item.id == editId
        })
        findedit.task = editPrompt
        localStorage.setItem("newObj", JSON.stringify(arr))
        renderTodo(arr)
    }
})