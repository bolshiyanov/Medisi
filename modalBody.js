const fruts = [
    {id: 1, title: 'Яблоки', img: 'https://7ogorod.ru/wp-content/uploads/2018/09/bd0db605aee5bfe315ae429559447695_big.jpeg'},
    {id: 2, title: 'Апельсины', img: 'https://live.staticflickr.com/65535/49098795842_af0d66f74c_b.jpg'},
    {id: 3, title: 'Манго', img: 'https://samui-site.ru/wp-content/uploads/2019/01/ExternalLink_shutterstock_388186099-768x619.jpg'}
]


const modal = $.modal({
    title: 'Medisi modal',
    closable: true,
    content:`
    <h4>Medisi is started</h4>
    <p>Lorem ipsum dolor sit amet</p>
    `,
    width: '400px',
    footerButtons: [
        {text: 'OK', type: 'primary', handler() {
            console.log('Primary brn clicked')
            modal.close()
        }},
        {text: 'CANCEL', type: 'danger', handler() {
            console.log('Danger brn clicked')
            modal.close()
        }}

    ]
})