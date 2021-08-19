const list = document.querySelector('ol.todo-list')

// event listeners
document.querySelector('.fas.fa-plus').addEventListener('click', () => {
    const input = document.querySelector('.list-item input')
    addChore(input)
})


const handleClick = id => {
    console.log(id)
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



const createListItem = (str, id) => {
    return `
    <section title=".roundedTwo">
        <div class="roundedTwo">
            <input type="checkbox" value="None" name=check-${id}  />
            <label class="status" for=check-${id}></label>
        </div>
    </section>
    <div class="list-input" >${str}</div>
    <i class="fas fa-times cross-${id}"></i>
    <i class="fas fa-grip-lines"></i>
`
}

const removeChore = (id) => {
    console.log(id)
    const itemToRemove = document.querySelector(`#${id}`)
    console.log(itemToRemove)
    itemToRemove.classList.add("remove")

    setTimeout(() => {
        // remove from array & update localStorage
        chores.splice(id.split('-')[1] - 1, 1)
        storage('set', 'chores', chores)
        // update the markup
        list.removeChild(itemToRemove)
    }, 1000)

}

const addChore = (input) => {
    const { value: chore } = input
    const handleValidChore = (chore) => {
        chores.push(chore)
        storage('set', "chores", chores)
        var node = document.createElement('div');
        node.setAttribute('class', 'list-item')
        node.setAttribute('id', `item-${chores.length}`)
        node.innerHTML = createListItem(chore, chores.length)
        list.appendChild(node);
        const index = chores.length
        // add cross event listener
        document.querySelector(`i.cross-${chores.length}`).addEventListener('click', () => {
            removeChore(`item-${index}`)
        }
        )
    }
    console.log(chores)
    chore.length === 0 ? alert("Enter something") : chores.includes(chore) ? alert("Chore already exists") : handleValidChore(chore)
}



let chores = storage('get', 'chores') ? storage('get', 'chores') : []
console.log(chores)

chores.length > 0 && chores.forEach((chore, iteration) => {
    var node = document.createElement('div');
    node.setAttribute('class', 'list-item')
    node.setAttribute('id', `item-${iteration + 1}`)
    node.innerHTML = createListItem(chore, iteration + 1)
    list.appendChild(node);
    document.querySelector(`i.cross-${iteration + 1}`).addEventListener('click', () => {
        removeChore(`item-${iteration + 1}`)
    })
})





