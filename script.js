const hide_sidebar = document.querySelector('#hide');
const menulist = document.querySelector('.menu-list');
const drop_button = document.querySelector('.drop-icon');
const dropdown_list = document.querySelector('.dropdown');

let categories = [
    {
        name_categories : "Es krim",
        id : 1,
        list_menu : [
            {
                name: "es krim matcha",
                id:1,
                price:6000.00,
                imgurl: ""
            },
            {
                name: "es krim vanilla",
                id:2,
                price:5000.00,
                imgurl: ""
            },
            {
                name: "es krim coklat",
                id:3,
                price:6500.00,
                imgurl: ""
            },
            {
                name: "es krim stoberi",
                id:4,
                price:6000.00,
                imgurl: ""
            },
            {
                name: "es krim durian",
                id:5,
                price:7500.00,
                imgurl: ""
            },
            {
                name: "es krim nanas",
                id:6,
                price:6000.00,
                imgurl: ""
            },
            {
                name: "es krim semangka",
                id:7,
                price:4000.00,
                imgurl: ""
            },
            {
                name: "es krim jeruk",
                id:8,
                price:5000.00,
                imgurl: ""
            },
        ]
    }
]


hide_sidebar.addEventListener('click', () => {
     
});

drop_button.addEventListener('click',() => {
 dropdown_list.classList.toggle('dropdown-checked');
})

let selected_categories_id = 1;
function RenderMenu(){

    menulist.textContent = "";
    const selected_menu_list = categories.find(e => e.id == selected_categories_id).list_menu;
    
   selected_menu_list.forEach(menu => {
     
       
       
        
       const list = document.createElement('div');
       list.classList.add('list');
       list.dataset.id = menu.id;
       
       const img = document.createElement('img');
       if(menu.imgurl === ""){
           img.src = "noimg.png";
       } else {
           img.src = menu.imgurl;
       }
       const name = document.createElement('button');
       name.textContent = menu.name;
       name.classList.add('name');
       
       
       const d = document.createElement('div');
       const p = document.createElement('button');
       const m = document.createElement('button');
       p.classList.add('plus');
       m.classList.add('minus');
       p.textContent = '+';
       m.textContent = '-';
       
       const num = document.createElement('input');
       num.setAttribute('type','number');
       num.value = 1;
       
       d.appendChild(m);
       d.appendChild(num);
       d.appendChild(p);
       
       list.appendChild(img);
       list.appendChild(name);
       list.appendChild(d);
       
       menulist.appendChild(list);
       
   })
}
RenderMenu();
