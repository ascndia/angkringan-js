let menus = [
    {
        name:"Drink",
        id:1,
        menu: [
            {
                name:"espresso",
                id:1,
                price:12000
            },
            {
                name:"milk tea",
                id:2,
                price:9000
            },
            {
                name:"hot chocolate coffe",
                id:3,
                price:13000
            },
            {
                name:"luwak coffe",
                id:4,
                price:13000
            },           
        ]
    },
    {
        name: "Ice Cream",
        id:2,
        menu:[
            {
                name:"banana ice cream",
                id:1,
                price:14000
            },
            {
                name:"vanilla ice cream",
                id:2,
                price:11000
            },
            {
                name:"melon ice cream",
                id:3,
                price:11000
            },
            {
                name:"strawberry ice cream",
                id:4,
                price:15000
            },
            ]
    },
    {
        name:"Snack",
        id:3,
        menu:[
            {
                name:"baked potato",
                id:1,
                price:6000
            },
            {
                name:"mini takoyaki",
                id:2,
                price:3000
            },
            {
                name:"potato crispy",
                id:3,
                price:8000
            },
            {
                name:"taiyaki",
                id:4,
                price:12000
            }
            ]
    }
]

let orders = [];

const menulist = document.querySelector("main");
const orderbottom = document.querySelector("order");
const categories = document.querySelector('#categories');
function RenderList(id = 0){
    menulist.textContent = "";
    if(id == 0){
        menus.forEach((r) => {
            r.menu.forEach(h => {
                const list = document.createElement("div");
        list.classList.add("list");
        
        const n = document.createElement('span');
        n.textContent = h.name;
        
        const o = document.createElement('div');
        o.classList.add('list-counter');
        
        const m = document.createElement('button');
        const i = document.createElement('input');
        const p = document.createElement('button');
        m.textContent = '-';
        m.dataset.a = "minus";
        p.dataset.a = "plus";
        p.textContent = '+';
        i.setAttribute('type','number');
        i.setAttribute('min','1');
        i.value = 1;        
        o.appendChild(m);
        o.appendChild(i);
        o.appendChild(p);
        
        const y = document.createElement('button');
        y.classList.add('add-to-order');
        y.textContent = h.price;
        list.appendChild(n);
        list.appendChild(o);
        list.appendChild(y);
        list.dataset.id = h.id;
        list.dataset.category = r.name;
        menulist.appendChild(list);
            })
        })
    } else {
    let newmenu = menus.find((e) => e.id == id).menu;
    let cat = menus.find((e) => e.id == id).name;
    newmenu.forEach(b => {
        const list = document.createElement("div");
        list.classList.add("list");
        
        const n = document.createElement('span');
        n.textContent = b.name;
        
        const o = document.createElement('div');
        o.classList.add('list-counter');
        
        const m = document.createElement('button');
        const i = document.createElement('input');
        const p = document.createElement('button');
        m.textContent = '-';
        m.dataset.a = "minus";
        p.dataset.a = "plus";
        p.textContent = '+';
        i.setAttribute('type','number');
        i.setAttribute('min','1');
        i.value = 1;        
        o.appendChild(m);
        o.appendChild(i);
        o.appendChild(p);
        
        const y = document.createElement('button');
        y.classList.add('add-to-order');
        y.textContent = b.price;
        list.appendChild(n);
        list.appendChild(o);
        list.appendChild(y);
        list.dataset.id = b.id;
        list.dataset.category = cat;
        menulist.appendChild(list);
    })
    }
}

RenderList();
RenderCategories();
RenderOrderBottom();

menulist.addEventListener('click', e => {
    if(e.target.dataset.a == 'plus'){
        const b = e.target.parentElement.querySelector('input');
        b.value++;
    } else if(e.target.dataset.a == 'minus'){
        const b = e.target.parentElement.querySelector('input');
        if(b.value <= 1){
            return;
        } else {
        b.value--;
        }
    } 
    
    // Add product to order list
    
    else if(e.target.classList.contains('add-to-order')){
            const b = e.target.parentElement;
        let new_order = {};
        new_order.id = b.dataset.id;
        new_order.orderid = new Date().getTime();
        new_order.categories = b.dataset.category;
        new_order.count = Number(b.querySelector('input').value);
        CheckDuplicateOrder(new_order)
        RenderOrderBottom()
        
    }
})

function RenderCategories(){
    categories.textContent = "";
    if(menus.length == 0){
        return;
    } else { 
    
    const category = document.createElement('option');
        category.textContent = 'All menu';
        category.dataset.id = 0;
        categories.appendChild(category);
           
    menus.forEach(e => {
        const category = document.createElement('option');
        category.textContent = e.name;
        category.dataset.id = e.id;
        categories.appendChild(category);
    })
    }
}
categories.addEventListener('change',(e) => {
    const cid = e.target.options[e.target.selectedIndex].dataset.id;
    RenderList(cid);
})
function CheckDuplicateOrder(Order){
    //console.log(JSON.stringify(Order))
    //let m = menus.find((z) => z.name == Order.category);
    if(orders.some( e => e.categories == Order.categories && e.id == Order.id))
    {
        let found = orders.find(e => e.categories == Order.categories && e.id == Order.id)       
        Order.count += found.count;
        orders = orders.filter(a => {                  
            return a.orderid !== found.orderid 
        });              
        orders.unshift(Order);        
    } else {
        orders.unshift(Order);
    }   
}

function RenderOrderBottom(){
    const items = orderbottom.querySelector('#total-items');
    const price= orderbottom.querySelector('#price')
    if(orders.length == 0){
        items.textContent = 'Empty';
        price.textContent = "";
    } else {
        let sum = 0;
        let totalprice = 0;        
        orders.forEach(e => {
            sum += e.count;
            const selected_menu = menus.find(k => {
                return k.name == e.categories 
                }).menu.find(s => {
                    return s.id == e.id;
                })
            totalprice += selected_menu.price * e.count;
        })
        const rp = ' Rp'
        items.textContent = sum + ' Items'
        price.textContent = 'Total: ' + totalprice.toLocaleString() + rp;
        
    }
}
        
