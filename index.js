
let todoArray = [];


const markDoneColor = 'lightgreen';
const unMarkColor = '#f1f2f6';


function retriveData(){
    const data = JSON.parse(localStorage.todo); 
    return data;
}


function retriveId(){
    const numberId = document.activeElement;
    deleteToDo(numberId.id);
}

function loadData(){

    // Load the data from todoarray
    const data = retriveData();
    // update the todoaary with the lastest data
    todoArray = data;

    let tododiv = document.querySelector('#todo-div');

    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const colorDiv = item[2];

        let time = new Date(item[0]);
        time = time.toDateString();
        
        const divTag = document.createElement("div");
        divTag.id = `${item[0]+item[1]}`;
        divTag.className = 'item-divs';
        divTag.style.backgroundColor = `${colorDiv}`; 

        const heading = document.createElement('h2');
        heading.className = 'todo-heading';
        heading.innerText = `${item[1]}`;

        const timeCreated = document.createElement('p');
        timeCreated.className = 'time-created';
        timeCreated.innerText = `${time}`;

        const buttonDiv = document.createElement('div');
        buttonDiv.className = 'button-div';


        const buttonMarker = document.createElement('button');
        buttonMarker.className = 'mark-button';
        if (item[2] === markDoneColor) {
            buttonMarker.innerText = 'UnCheck';
        }
        else{
            buttonMarker.innerText = 'Check';
        }
        buttonMarker.onclick = () => {
            if(item[2] === markDoneColor) {
                unMark();
            }
            else{
                markDone();               
            }
        }
        
        const buttonDelete = document.createElement('button');
        buttonDelete.className = 'delete-button';
        buttonDelete.innerText = 'Delete Entry';
        buttonDelete.onclick = () => {
            deleteToDo()
        }


        tododiv.appendChild(divTag);
        divTag.appendChild(heading);
        divTag.appendChild(timeCreated);
        divTag.appendChild(buttonDiv);
        buttonDiv.appendChild(buttonMarker);
        buttonDiv.appendChild(buttonDelete);

 
    }
} 


function collectToDo () {
    const newToDo = document.querySelector('#ToDoLabel').value;
    
    // test to make sure there is an entry on submit
    if(newToDo === '') {
        alert("Nothing Was Entered in TO-DO!")
    } 
    else {

    // Clear the text box
    document.querySelector('#ToDoLabel').value = '';
    // set unique number for id in array
    const id_time = Date.now();

    let colordiv = unMarkColor;

    // Arrange data to be sent to local Storage
    const datatoarray = [ id_time, newToDo, colordiv ];
    todoArray.unshift(datatoarray);

    localStorage.todo = JSON.stringify(todoArray);

    // Refresh Html
    document.querySelector('#todo-div').innerHTML = "";
    loadData()
    }           

}


function deleteToDo () {

    const data1 = document.activeElement.parentElement;
    const data = data1.parentElement.id;

    for (let i = 0; i < todoArray.length; i++) {
        
        // Find the id number and remove it from todo array
        if (data == (todoArray[i][0]+todoArray[i][1])) {
            todoArray.splice(i, 1);
            localStorage.todo = JSON.stringify(todoArray)    
        }
    }

    // Refresh Html
    document.querySelector('#todo-div').innerHTML = "";
    loadData()

}


function markDone () {    

    const ele1 = document.activeElement.parentElement;
    const ele = ele1.parentElement.id

    for (let i = 0; i < todoArray.length; i++) {

        if ( ele == (todoArray[i][0]+todoArray[i][1])) {
            todoArray[i][2] = markDoneColor;
            const moveToDo = todoArray[i];
            todoArray.splice(i,1);
            todoArray.push(moveToDo);

            localStorage.todo = JSON.stringify(todoArray);
           
        }
        
    }
    // Refresh Html with updates 
    document.querySelector('#todo-div').innerHTML = "";
    loadData()
    
}

function unMark() {
    
    const ele1 = document.activeElement.parentElement;
    const ele = ele1.parentElement.id

    for (let i = 0; i < todoArray.length; i++) {

        if ( ele == (todoArray[i][0]+todoArray[i][1])) {
            todoArray[i][2] = unMarkColor;
            const moveToDo = todoArray[i];
            todoArray.splice(i,1);
            todoArray.unshift(moveToDo);
            localStorage.todo = JSON.stringify(todoArray);    
        }    
    }
    // Refresh Html with updates 
    document.querySelector('#todo-div').innerHTML = "";
    loadData()
}






loadData();

