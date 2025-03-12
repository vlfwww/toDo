// const inp =  document.querySelector('input');
// const btn = document.querySelector('button');
// async function show(){
//     const pakage = await fetch('https://dummyjson.com/todos', {
//         method:'GET',
//     })
//     const result = await pakage.json();
//     console.log(result.todos);
//     const div = document.querySelector('div');
//     for(let el of result.todos){
//         const p = document.createElement('p');
//         p.textContent = el.todo;
//         div.appendChild(p);
//     }

// }
// show();
// btn.addEventListener('click',async()=>{
//     const pakage = await fetch('https://dummyjson.com/todos/add', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             todo: `${inp.value}`,
//             completed: false,
//             userId: 5,
//         })
//     })
//     const res = await pakage.json();
//     const p = document.createElement('p');
//     const div = document.querySelector('div');
//     p.textContent =  res.todo;
//     div.appendChild(p);
//     inp.value = ''
// })

const modal = document.querySelector('.modal')

async function show() {
    const package = await fetch('https://dummyjson.com/todos', {
        method: 'GET',
    })
    console.log(package);
    const parse = await package.json()
    console.log(parse.todos);
    const div = document.querySelector('div')
    for (let el of parse.todos) {
        const p = document.createElement('p')
        p.textContent = el.todo;
        div.appendChild(p);

        const delete1 = document.createElement('button');
        const update1 = document.createElement('button')

        delete1.textContent = 'Delete'
        update1.textContent = 'Update'

        div.appendChild(delete1);
        div.appendChild(update1);

        delete1.addEventListener('click', async () => {
            const package = await fetch(`https://dummyjson.com/todos/${el.id}`, {
                method: 'DELETE',
            })
            div.removeChild(delete1)
            div.removeChild(update1)
            div.removeChild(p)
            const res = await package.json()
            console.log(res)
        })

        update1.addEventListener('click', () => {
            modal.style.display = 'block'

            // Удаляем старые обработчики событий
            const putButton = document.querySelector('.put');
            putButton.replaceWith(putButton.cloneNode(true)); // Клонируем кнопку и заменяем её
            const newPutButton = document.querySelector('.put'); // Получаем новую кнопку

            newPutButton.addEventListener('click', async () => {
                const value = document.querySelector('.inputupdate').value
                const package = await fetch(`https://dummyjson.com/todos/${el.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        todo: value,
                    })
                })
                p.textContent = value;
                modal.style.display = 'none'
            })
        })
    }
}
show()

async function add() {
    const value = document.querySelector('input').value
    const div = document.querySelector('div')
    const pak = await fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            todo: value,
            completed: false,
            userId: 5,
        })
    })
    const res = await pak.json();
    const p = document.createElement('p')
    p.textContent = res.todo
    div.appendChild(p)
}
const button = document.querySelector('button')
button.addEventListener('click', add)