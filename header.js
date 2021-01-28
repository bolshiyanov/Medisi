// Это главная страница 

// Здесь отрисован статический массив для header использования в приложении. В боевом приложении этот массив дожен быть получен с сервера.
let headers = [
    { id: 1, name: 'Яблоки', price: 20, img: 'https://7ogorod.ru/wp-content/uploads/2018/09/bd0db605aee5bfe315ae429559447695_big.jpeg' },
    { id: 2, name: 'Апельсины', price: 30, img: 'https://live.staticflickr.com/65535/49098795842_af0d66f74c_b.jpg' },
    { id: 3, name: 'Манго', price: 40, img: 'https://samui-site.ru/wp-content/uploads/2019/01/ExternalLink_shutterstock_388186099-768x619.jpg' }
]


//Здесь генерируется html разметка с данными из объектов массива header
const toHTML = header => `
    <div class="card">
        <img class="cardj-img-top" style="height: 300px;"
          src="${header.img}" alt="${header.name}" class="card-img-top"/>
        <div class="card-body">
          <h5 class="card-title">${header.name}</h5>
          <a href="#" class="btn btn-primary" data-btn="price" data-id=${header.id}>Открыть</a>
        </div>
    </div>
      `
//Здесь встраивается html разметка для div #header на index.html   
function render() {
    const html = headers.map(toHTML).join('')
    document.querySelector('#header').innerHTML = html
}
// Чтобы созданный html был отрисован в index.html нужно вызвать метод render()
render()

// Здесь формируется контент для плагина modal и пробрасывается в options плагин modal
const headerModal = $.headerModal({
    name: 'Цена на товар',
    closable: true,
    width: '400px',
    footerHeaderButtons: [
        {
            text: 'Закрыть', type: 'primary', handler() {
                headerModal.closeHeader()
            }
        }
    ]
})
// Прослушиваем click и ловим event который мы определили в строках 15 и 16 в атрибутах data
document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    // Чтобы поиск по id сработал мы должны переопределить 
    // его в тип Number поэтому добавляем + 
    const id = +event.target.dataset.id
    
    const header = headers.find(f => f.id === id)

   // Обращение к кнопке у которой data атрибут равен price и добавление текста в сontent плагина modalчерез setContent
    if (btnType === "price") {
        headerModal.setContent(`
        <p>Цена на ${header.name}: <strong>${header.price}$</strong></p>
        `)
        headerModal.openHeader()
    } 
   
})





