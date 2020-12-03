'use strict';

const createBtn = document.querySelector('.input-create');
const inputText = document.querySelector('#input-text');
const displayItem = document.querySelector('.display-item');



let i = 0;
//Create Items
function create(text) {
    const item = document.createElement('div');
    const itemCheck = document.createElement('input');
    const label = document.createElement('label');
    const itemDelete = document.createElement('div');
    const check = document.createElement('label');
    const circle = document.createElement('label');
    
    item.setAttribute('class', 'item'); 
    displayItem.appendChild(item);
    itemCheck.setAttribute('type','checkbox');
    itemCheck.setAttribute('class','item-check');
    itemCheck.setAttribute('id', i);
    check.setAttribute('class', 'check');
    check.setAttribute('for', i);
    circle.setAttribute('class', 'circle');
    circle.setAttribute('for', i);
    check.innerHTML = '<i class="fas fa-check-circle"></i>'
    circle.innerHTML = '<i class="far fa-circle"></i>'
    label.setAttribute('for', i);
    label.setAttribute('class','item-name');
    label.textContent = text; 
    itemDelete.setAttribute('class','item-delete');
    itemDelete.innerHTML = '<i class="fas fa-minus-circle"></i>'
    item.appendChild(itemCheck);
    item.appendChild(check);
    item.appendChild(circle);
    item.appendChild(label);
    item.appendChild(itemDelete);
    i=i+1;
};
// Delete Items
function deleteItem() {
    const deleteBtns = document.querySelectorAll('.item-delete i');  
    deleteBtns.forEach(deleteBtn => deleteBtn.addEventListener('click',(e)=>{
        e.target.parentNode.parentNode.remove();
    }));
};

function createAndDel() {
    const text = inputText.value;
    if (text != '') {
        create(text);
    };
    deleteItem();
    // Delete inputText Box
    inputText.value = '';
};

// Click event!
createBtn.addEventListener('click',()=>createAndDel());
// Enter Key event!
inputText.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        createAndDel();
    };
});    