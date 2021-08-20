const list = document.querySelector('ol.todo-list div.items')

// event listeners
document.querySelector('.fas.fa-plus').addEventListener('click', () => {
    const input = document.querySelector('.list-item input')
    addChore(input)
})

const clearList = () => {
    list.innerHTML = null
}




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

const renderList = (chores) => {

    // set total number
    document.querySelector('.taskbar div:nth-child(1)').innerHTML = `${chores.length} items`

    chores.length > 0 && chores.forEach((chore, iteration) => {
        var node = document.createElement('div');
        node.setAttribute('class', 'list-item')
        node.setAttribute('id', `item-${iteration + 1}`)
        node.innerHTML = createListItem(chore, iteration + 1)
        list.appendChild(node);
        // cross event listener
        document.querySelector(`i.cross-${iteration + 1}`).addEventListener('click', () => {
            removeChore(chore.name, `item-${iteration + 1}`)
        })
        // check event listener
        document.querySelector(`#check-${iteration + 1}`).addEventListener('click', () => {
            handleCheck(chore.name, `check-${iteration + 1}`)
        })
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
    const itemToRemove = document.querySelector(`#${id}`)
    itemToRemove.classList.add("remove")

    setTimeout(() => {
        // remove from array 
        chores.splice(chores.indexOf(chores.find(item => item.name === chore)), 1)
        // & update localStorage
        storage('set', 'chores', chores)
        // update the markup
        list.removeChild(itemToRemove)
        // set total number
        document.querySelector('.taskbar div:nth-child(1)').innerHTML = `${chores.length} items`
    }, 500)


}

const addChore = (input) => {
    const { value: chore } = input
    const handleValidChore = (chore) => {
        chores.push({ name: chore, status: "pending" })
        storage('set', "chores", chores)
        clearList()
        renderList(chores)
    }
    chore.length === 0 ? alert("Enter something") : chores.find(item => item.name == chore) ? alert("Chore already exists") : handleValidChore(chore)
}



let chores = storage('get', 'chores') ? storage('get', 'chores') : []
console.log(chores)


renderList(chores)

