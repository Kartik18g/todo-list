const select = (query) => document.querySelector(query)
const addClass = (query, value) => select(query).classList.add(value)
const removeClass = (query, value) => select(query).classList.remove(value)
const checkForClass = (query, value) => select(query).classList.contains(value)

let filter = 'all'
const list = select('ol.todo-list div.items')


// event listeners

select('#switch').addEventListener('click', () => {
    // select('body').toggleClass('dark')

    // console.log(select('body'))
    storage('set', "mode", checkForClass('body', 'dark') ? 'light' : 'dark')
    select('body').classList.toggle('dark')
})

select('.fas.fa-plus').addEventListener('click', () => {
    const input = select('.list-item input')
    addChore(input)
})
select('.clear').addEventListener('click', () => {
    clearList()
    // update array
    chores = []
    // update localstorage
    storage('set', 'chores', [])
    // set total number
    select('.taskbar div:nth-child(1)').innerHTML = `${countItems(chores, filter)} items`
})

select('#all').addEventListener('click', () => {
    filter = 'all'
    if (!checkForClass('#all', 'active')) {
        addClass("#all", 'active')
        removeClass("#pending", 'active')
        removeClass("#complete", 'active')
        clearList()
        renderList(chores, 'all')
    }

})

select('#pending').addEventListener('click', () => {
    filter = 'pending'

    if (!checkForClass('#pending', 'active')) {
        addClass("#pending", 'active')
        removeClass("#all", 'active')
        removeClass("#complete", 'active')
        clearList()
        renderList(chores, 'pending')
    }

})

select('#complete').addEventListener('click', () => {
    filter = 'complete'
    if (!checkForClass('#complete', 'active')) {
        addClass("#complete", 'active')
        removeClass("#pending", 'active')
        removeClass("#all", 'active')
        clearList()
        renderList(chores, 'complete')
    }
})
// event listeners


const storage = (action, item, data = []) => {
    if (item.length > 0) switch (action) {
        case "get":
            return JSON.parse(localStorage.getItem(item))
        case "set":
            localStorage.setItem(item, JSON.stringify(data))
            break
        default:
            alert("Enter a valid action");
            break

    }
}


const clearList = () => {
    list.innerHTML = null
}

const countItems = (chores, filter) => filter === 'all' ? chores.length : chores.filter(item => item.status === filter).length




const renderList = (chores, filter = 'all') => {

    // set total number
    select('.taskbar div:nth-child(1)').innerHTML = `${countItems(chores, filter)} items`

    chores.length > 0 && chores.forEach((chore, iteration) => {

        if (filter == 'all') {
            var node = document.createElement('div');
            node.setAttribute('class', 'list-item')
            node.setAttribute('id', `item-${iteration + 1}`)
            node.innerHTML = createListItem(chore, iteration + 1)
            list.appendChild(node);
            // cross event listener
            select(`i.cross-${iteration + 1}`).addEventListener('click', () => {
                removeChore(chore.name, `item-${iteration + 1}`)
            })
            // check event listener
            select(`#check-${iteration + 1}`).addEventListener('click', () => {
                handleCheck(chore.name, `check-${iteration + 1}`)
            })

        } else {
            if (chore.status === filter) {
                var node = document.createElement('div');
                node.setAttribute('class', 'list-item')
                node.setAttribute('id', `item-${iteration + 1}`)
                node.innerHTML = createListItem(chore, iteration + 1)
                list.appendChild(node);
                // cross event listener
                select(`i.cross-${iteration + 1}`).addEventListener('click', () => {
                    removeChore(chore.name, `item-${iteration + 1}`)
                })
                // check event listener
                select(`#check-${iteration + 1}`).addEventListener('click', () => {
                    handleCheck(chore.name, `check-${iteration + 1}`)
                })
            }
        }
    })
}


const handleCheck = (chore, id) => {
    const item = chores.find(item => item.name === chore)
    const index = chores.indexOf(item)
    chores[index] = { name: item.name, status: item.status === 'pending' ? 'complete' : 'pending' }
    // save to storage
    storage('set', 'chores', chores)
    clearList()
    renderList(chores)
}


const createListItem = (chore, id) => {
    return `
    <section title=".roundedTwo">
        <div class="roundedTwo">
            <input id=check-${id} type="checkbox" ${chore.status === 'complete' ? 'checked' : ''} value="None" name=check-${id}  />
            <label class="status" for=check-${id}></label>
        </div>
    </section>
    <div  class="list-input ${chore.status === 'complete' ? 'strike' : ''} " >${chore.name}</div>
    <i class="fas fa-times cross-${id}"></i>
    <i class="fas fa-grip-lines"></i>
`
}

const removeChore = (chore, id) => {
    const itemToRemove = select(`#${id}`)
    itemToRemove.classList.add("remove")

    setTimeout(() => {
        // remove from array 
        chores.splice(chores.indexOf(chores.find(item => item.name === chore)), 1)
        // & update localStorage
        storage('set', 'chores', chores)
        // update the markup
        list.removeChild(itemToRemove)
        // set total number
        select('.taskbar div:nth-child(1)').innerHTML = `${countItems(chores, filter)} items`
    }, 500)


}


// let mode = storage('get', 'mode') ? storage('get', 'mode') : 'light'
// console.log(mode)
// addClass('body', mode)
const addChore = (input) => {
    const { value: chore } = input
    const handleValidChore = (chore) => {
        chores.push({ name: chore, status: "pending" })
        storage('set', "chores", chores)
        clearList()
        select('.list-item input').value = ""
        renderList(chores, filter)
    }
    chore.length === 0 ? alert("Enter something") : chores.find(item => item.name == chore) ? alert("Chore already exists") : handleValidChore(chore)
    select('.taskbar div:nth-child(1)').innerHTML = `${countItems(chores, filter)} items`

}


let chores = storage('get', 'chores') ? storage('get', 'chores') : []

renderList(chores, filter)


