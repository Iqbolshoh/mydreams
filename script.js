fetch('data.json')
    .then(response => response.json())
    .then(data => {
        displayProducts(data)
        calculateTotalPrice(data)
    })

function displayProducts(products) {
    const productsContainer = document.getElementById('products')
    productsContainer.innerHTML = ''
    products.forEach((product, index) => {
        const productBox = document.createElement('div')
        productBox.className = 'product-box'

        const imageBox = document.createElement('div')
        imageBox.className = 'product-image'

        let imgElement = document.createElement('img')
        imgElement.src = product.images[0]
        imgElement.dataset.index = 0
        imgElement.dataset.productIndex = index
        imageBox.appendChild(imgElement)

        const productInfo = document.createElement('div')
        productInfo.className = 'product-info'

        let price = parseFloat(product.price.replace(/[^0-9.]/g, ''))
        let availableMoney = parseFloat(product.availableMoney.replace(/[^0-9.]/g, ''))
        let range = (availableMoney / price) * 100

        productInfo.innerHTML = `<h2>${product.name}</h2><p>${product.price}</p><p><span class="range">Remaining: ${range.toFixed(2)}%</span></p>`

        productBox.appendChild(imageBox)
        productBox.appendChild(productInfo)
        productsContainer.appendChild(productBox)
    })

    setInterval(() => {
        const images = document.querySelectorAll('.product-image img')
        images.forEach(image => {
            let currentIndex = parseInt(image.dataset.index)
            const productIndex = parseInt(image.dataset.productIndex)
            currentIndex = (currentIndex + 1) % products[productIndex].images.length
            image.src = products[productIndex].images[currentIndex]
            image.dataset.index = currentIndex
        })
    }, 3000)
}

function calculateTotalPrice(products) {
    let totalPrice = 0
    let totalAvailableAmount = 0

    products.forEach(product => {
        let cleanedPrice = product.price.replace(/[^0-9.]/g, '')
        totalPrice += parseFloat(cleanedPrice)

        let cleanedAvailableMoney = product.availableMoney.replace(/[^0-9.]/g, '')
        totalAvailableAmount += parseFloat(cleanedAvailableMoney)
    })

    const neededAmount = Math.max(0, totalPrice - totalAvailableAmount)

    document.getElementById('total-price').innerHTML = `Total price: $${totalPrice.toFixed(2)}<br>Needed amount: $${neededAmount.toFixed(2)}`
}


