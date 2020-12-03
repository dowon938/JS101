'use strict';

const footerBtn = document.querySelector('.footer-btn');
const footerInput = document.querySelector('#footer-input');
const items = document.querySelector('.items');



let i = 0;
//Create Items
function createItem(text) {
    const item = document.createElement('li');
    const itemCheck = document.createElement('input');
    const label = document.createElement('label');
    const itemDelete = document.createElement('div');
    const check = document.createElement('label');
    const circle = document.createElement('label');
    
    item.setAttribute('class', 'item'); 
    items.appendChild(item);
    itemCheck.setAttribute('type','checkbox');
    itemCheck.setAttribute('class','item-check');
    itemCheck.setAttribute('id', i);
    check.setAttribute('class', 'check');
    circle.setAttribute('class', 'circle');
    check.setAttribute('for', i);
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
    //scroll into item
    item.scrollIntoView();
    //Ellie's
    // itemDelete.addEventListener('click', ()=>{
    //     items.removeChild(item);
    // })
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
    const text = footerInput.value;
    if (text != '') {
        createItem(text);
    };
    deleteItem();
    // Delete inputText Box
    footerInput.value = '';
    footerInput.focus();
};

// Click event!
footerBtn.addEventListener('click',()=>createAndDel());
// Enter Key event!
footerInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        createAndDel();
    };
});    

// ellie's!!*********

// function onAdd() {
    // 1.사용자가 입력한 텍스트 받아오기
    // const text = footerInput.value;

    //*빈텍스트입력시 커서만 유지하고 리턴
    //if (text === '') {
        // footerInput.focus();
        // return;
    // }

    // 2.아이템생성 (삭제버튼 포함)
    // const item = createItem(text);
    // 3.아이템 배치 (items안으로)
    // items.appendChild(item);
    // 4.추가된 아이템으로 스크롤
    // item.scrollIntoView();
    // 5.인풋초기화
    // footerInput.value = '';
    // footerInput.focus();
// }

//코드의 기능을 그대로 설명하는 주석은 가독성을 해칠수있다.
//가능하면 주석은 그 코드를 왜 작성하게되었는지 의도를 설명하라