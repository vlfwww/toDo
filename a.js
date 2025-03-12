const inp =  document.querySelector('input');
const btn = document.querySelector('button');
async function show(){
    const pakage = await fetch('https://dummyjson.com/todos', {
        method:'GET',
    })
    const result = await pakage.json();
    console.log(result.todos);
    const div = document.querySelector('div');
    for(let el of result.todos){
        const p = document.createElement('p');
        p.textContent = el.todo;
        div.appendChild(p);
    }

}
show();
btn.addEventListener('click',async()=>{
    const pakage = await fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            todo: `${inp.value}`,
            completed: false,
            userId: 5,
        })
    })
    const res = await pakage.json();
    const p = document.createElement('p');
    const div = document.querySelector('div');
    p.textContent =  res.todo;
    div.appendChild(p);
    inp.value = ''
})