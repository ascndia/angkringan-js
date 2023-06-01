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
let is = false;
let orders = [];
const orderheader = document.querySelector('#order-header');
const expand = document.querySelector('#expand');
const ordercontainer = document.querySelector('#ordercontainer');
const orderlist = document.querySelector('#orderlist');
const deleteorder = document.querySelector('#delete-order'); 
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
        n.classList.add('list-name');
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
        n.classList.add('list-name');
        
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
//RenderOrderTop();
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
        new_order.price = e.target.textContent;
        new_order.name = b.querySelector('.list-name').textContent;        
        new_order.orderid = new Date().getTime();
        new_order.categories = b.dataset.category;
        new_order.count = Number(b.querySelector('input').value);
        CheckDuplicateOrder(new_order)
        //RenderOrderTop();
        RenderOrderBottom();
        RenderOrderList();        
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
        orders.push(Order);        
    } else {
        orders.push(Order);
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
            sum += parseInt(e.count);
            const selected_menu = menus.find(k => {
                return k.name == e.categories 
                }).menu.find(s => {
                    return s.id == e.id;
                })
            totalprice += selected_menu.price * e.count;
        })
        const rp = ' Rp'
        items.textContent = parseInt(sum).toString() + ' Items'
        price.textContent = 'Total: ' + totalprice.toLocaleString() + rp;
        
    }
}
function RenderOrderList(){
    orderlist.textContent = "";
    if(!is){
        return;
    }
    const aa = 'Rp ';
    if(orders.length == 0){
        return;
    } else {
    orders.forEach(order => {
        const a = document.createElement('div');
        a.classList.add('olist');
        const b = document.createElement('div');
        b.classList.add('i');
        const c = document.createElement('span');
        c.textContent = order.name;
        const d = document.createElement('span');
        d.classList.add('mini');
        d.textContent = 'Price: ' + aa + parseInt(order.price).toLocaleString();
        const e = document.createElement('span');
        e.classList.add('mini');
        e.textContent = 'Total Price: ' + aa + parseInt(order.price * order.count).toLocaleString();
        const f = document.createElement('div');
        f.classList.add('c');
        const g = document.createElement('button');
        g.classList.add('min');
        g.textContent = '-';
        const h = document.createElement('button');
        h.classList.add('plus');
        h.textContent = '+';
        const i = document.createElement('input');
        i.setAttribute('type','number');
        i.value = order.count;
        i.classList.add('lololo');
        const j = document.createElement('button');
        j.classList.add('rmv');   
        j.textContent = 'Remove Order';      
        
        f.appendChild(g);
        f.appendChild(i);
        f.appendChild(h);
              
        b.appendChild(c);
        b.appendChild(d);
        b.appendChild(e);
        
        a.appendChild(b);
        a.appendChild(f);
        a.appendChild(j);
        a.dataset.orderid = order.orderid;        
        orderlist.appendChild(a);        
    }) 
    }
}
function DeleteOrder(){
    orders = [];
    RenderOrderList();
    RenderOrderBottom();
}
deleteorder.addEventListener('click',DeleteOrder);
orderlist.addEventListener('click',e => {
    if(e.target.classList.contains('min')){
        if(e.target.parentElement.querySelector('input').value <= 1){
            return;
        }
        const u = e.target.parentElement.parentElement;        
        orders.map(order => {
            if(order.orderid == u.dataset.orderid){
                order.count--;
            }
        })
        //RenderOrderTop();
        RenderOrderBottom();
        RenderOrderList();
    } else if(e.target.classList.contains('plus')){        
        const u = e.target.parentElement.parentElement;        
        orders.map(order => {
            if(order.orderid == u.dataset.orderid){
                order.count++;
            }
        })
        //RenderOrderTop();
        RenderOrderBottom();
        RenderOrderList();
    } else if(e.target.classList.contains('rmv')){
        const u = e.target.parentElement;                  
        orders = orders.filter(order => {               
            return order.orderid != u.dataset.orderid;
        })
        RenderOrderBottom();
        RenderOrderList();
    }
})
orderlist.addEventListener('change',e => {
    if(e.target.classList.contains('lololo')){
        const a = e.target.parentElement.parentElement;
        orders.map(order => {
            if(order.orderid == a.dataset.orderid){
            
                order.count = e.target.value;
            }
        })
        RenderOrderList();
        RenderOrderBottom();
    }
})

expand.addEventListener('click',() => {
    if(ordercontainer.classList.contains('expanded')){
           
      
       ordercontainer.classList.toggle('expanded'); 
       is = false;
        //RenderOrderTop();
        orderheader.classList.add('hidden')       
        RenderOrderList();
        RenderOrderBottom();
        expand.textContent = 'Expand';
                
        
    } else {
        ordercontainer.classList.toggle('expanded');
        is = true;
        //RenderOrderTop();       
        RenderOrderList();
        RenderOrderBottom();
        orderheader.classList.remove('hidden');
        expand.textContent = 'Shrink';        
    }
    
})
/*
function RenderOrderTop(){
    if(!is){
        return;
    } else {
    
    orderheader
        
        orderheader.textContent = "";
        const a = document.createElement('div');
        a.setAttribute('id','order-header');
        const b = document.createElement('span');
        b.textContent = 'Ruruw Cafe';
        const c = document.createElement('button');
        c.setAttribute('id','delete-order');
        c.textContent = 'Delete';
        a.appendChild(b);
        a.appendChild(c);
        orderheader.appendChild(a);
        
    }
}
*/
/*

    <div id="order-header">
                <span>Ruruw Cafe</span>
                <button id="delete-order">Delete</button>
            </div>

*/
