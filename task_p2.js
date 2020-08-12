class Product {
    name = ''
    price = 0
    count = 1

    constructor(name, price) {
        this.name = name
        this.price = price
        this.getMainTemplate()
    }

    increment() {
        this.count++
    }

    decrement() {
        this.count--
    }

    getAddButton() {
        const button = document.createElement('button')
        button.classList.add('btn')
        button.classList.add('btn-sm')
        button.classList.add('btn-primary')
        button.classList.add('button')
        button.setAttribute('type', 'button');

        button.innerText = 'Купить'

        button.addEventListener('click', () => {
            const BasketInstance = new Basket()
            BasketInstance.add(this)
        })
        return button
    }
    getIncButton() {
        const button = document.createElement('button')
        button.classList.add('btn')
        button.classList.add('btn-sm')
        button.classList.add('btn-primary')
        button.classList.add('button')
        button.setAttribute('type', 'button');
        button.innerText = 'Добавить'

        button.addEventListener('click', () => {
            const BasketInstance = new Basket()
            BasketInstance.add(this)
        })
        return button
    }
    getMinusButton() {
        const button = document.createElement('button')
        button.classList.add('btn')
        button.classList.add('btn-sm')
        button.classList.add('btn-light')
        button.classList.add('button')
        button.setAttribute('type', 'button');
        button.innerText = 'Убрать'

        button.addEventListener('click', () => {
            const BasketInstance = new Basket()
            BasketInstance.remove(this)
        })

        return button
    }
    getMainTemplate() {
        const { price, name } = this
        const block = document.createElement('div')
        block.classList.add('anyProduct')
        block.classList.add('border')
        block.classList.add('border-white')
        block.innerHTML = `
            <div class = "anyProduct__img">
                <div>image not available</div>
                </div>
            <div class="anyProduct__meta">Товар: ${name}</div>
            <div class="anyProduct__meta">Стоимость: ${price}</div>
        `

        block.appendChild(this.getAddButton())

        return block
    }



    getBasketTemplate() {
        const { price, name, count } = this
        const block = document.createElement('div')
        block.classList.add('basket')

        block.innerHTML = `
            <div class = "basket__product">
                ${name}: ${price} x ${count} = ${price * count}
            </div>
        `

        block.appendChild(this.getIncButton())
        block.appendChild(this.getMinusButton())
        return block
    }
}

class MainList {
    products = []
    constructor(products = []) {
        this.products = products;
    }

    findProduct(thing) {
        return this.products.filter(product => product.name === thing.name)[0]
    }

    add(product) {
        const exist = this.findProduct(product)
        if (exist) {
            exist.increment()
        } else {
            this.products.push(product)
        }
        this.render()
    }

    remove(product) {
        const exist = this.findProduct(product)
        if (exist.count > 1) {
            exist.decrement()
        } else {
            this.products = this.products.filter(thing => product.name !== thing.name)
        }
        this.render()
    }

    render() {
    }
}

class ProductsList extends MainList {
    constructor() {
        super()

    }
    render() {
        const placeToRender = document.querySelector('.products-list')
        placeToRender.innerHTML = ''
        if (placeToRender) {
            this.products.forEach(thing => {
                const block = thing.getMainTemplate()
                placeToRender.appendChild(block)
            })
        }
    }
}

class Basket extends MainList {
    constructor() {
        if (Basket._instance) {
            return Basket._instance
        }
        super()
        this.init()
        Basket._instance = this
    }
    init() {
        const block = document.createElement('div')
        block.classList.add('basket')
        block.classList.add('border')
        block.classList.add('border-light')

        const button = document.createElement('button')
        button.innerText = 'Корзина'
        button.classList.add('btn')
        button.classList.add('btn-light')
        button.classList.add('button')
        button.setAttribute('type', 'button');
        button.addEventListener('click', () => {
            this.toggle()
        })

        const list = document.createElement('div')
        list.classList.add('basket_list')
        block.appendChild(list)
        let placeToRender = document.querySelector('header')
        if (placeToRender) {
            placeToRender.appendChild(block)
        }
        placeToRender = document.querySelector('[class="logo"]')
        if (placeToRender) {
            placeToRender.appendChild(button)
        }
        this.render()
    }

    toggle() {
        const button = document.querySelector('.basket_list')
        button.classList.toggle('shown')
    }

    getEmptyBlock() {
        const block = document.createElement('div')
        block.classList.add('basket__empty')
        block.innerText = 'Корзина пуста'

        return block
    }
    getSumBlock() {
        const sum = this.products.reduce((sum, thing) => {
            return sum + thing.price * thing.count
        }, 0)

        const block = document.createElement('div')
        block.classList.add('.basket__sum')
        block.innerText = `Итого: ${sum}`

        return block
    }
    render() {
        const placeToRender = document.querySelector('.basket_list')
        placeToRender.innerHTML = ''
        if (!this.products.length) {
            placeToRender.appendChild(this.getEmptyBlock())
        } else {
            this.products.forEach(thing => {
                placeToRender.appendChild(thing.getBasketTemplate())
            })
            placeToRender.appendChild(this.getSumBlock())
        }
    }

}

const ProductsListInstance = new ProductsList()
ProductsListInstance.add(new Product('Подушка белая', 1000))
ProductsListInstance.add(new Product('Подушка-облако', 2200))
ProductsListInstance.add(new Product('Подушка-полумесяц', 3000))

const BasketInstance = new Basket()

ProductsListInstance.render()