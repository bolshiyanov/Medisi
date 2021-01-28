// Это плагин headerModal


// НАЧАЛО КНОПКИ 
// Этот метод создает объект footer.appendAfter в dom дереве. В данной реализации элемент footer и 
// есть this который при помощи метода insertBefore добавляет в parentNode прототип класса Element
Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling);
}

// Пустая функция
function noop() { }

function _creatModalFooter(buttons = []) {
    if (buttons.length === 0) {
        return document.createElement('div')
    }
    // Создаем html контейнер для кнопок
    const wrapHeader = document.createElement('div')
    wrapHeader.classList.add('modal-footer')

    // Создаем button, если хотябы одна кнопка есть в options footerHeaderButtons 
    // которые пришли из index.js или из confirm.js при помощи forEach для перебора массива 
    buttons.forEach(btn => {
        //Реализация плагина $btn
        const $btn = document.createElement('button')
        $btn.textContent = btn.text
        $btn.classList.add('btn')
        $btn.classList.add(`btn-${btn.type || 'secondary'}`)
        $btn.onclick = btn.handler || noop
    // Встраиваем кнопки в контейнер
    wrapHeader.appendChild($btn)
    })
    // Отрисовываем в dom дереве
    return wrapHeader
}
// КОНЕЦ КНОПКИ


// С помощью _createHeaderModal этой приватной функуции мы генерируем  модальное окна, а динамический контент получен 
// из плагина headerModal 
function _createHeaderModal(options) {
    const DEFAULT_WIDTH = '400px'
    // Здесь мы определяем константу, которая получает в себя автоматически сгенерированный html 
    // для шаблона модального окна
    const headerModal = document.createElement('div')
    // Подключаем css класс vmodal
    headerModal.classList.add('vmodal')
    // Определяем шаблон  html для модального окна
    headerModal.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay" data-close="true">
      <div class="modal-window" style="width": ${options.width || DEFAULT_WIDTH}>
        <div class="modal-header">
          <span class="modal-title">${options.name || 'Текст по умолчанию'}</span>
          ${options.closable ? `<span class="modal-close" data-close="true">&times;</span>` : ''}
        </div>
        <div class="modal-body" data-content> ${options.content || ''}
        </div>
      </div>
    </div>
  `)
    // Здесь мы определяем константу, которая получает сгенерированный динамический footer
    const footer = _creatModalFooter(options.footerHeaderButtons)
    // Здесь мы определяем после какого элемента нужно встроить footer в html модального окна,
    // а именно полсле div с querySelector('[data-content')
    footer.appendAfter(headerModal.querySelector('[data-content'))
    document.body.appendChild(headerModal)
    return headerModal
}

// Вызываем функцию замыкания 
$.headerModal = function (options) {
    const ANIMATION_SPEED = 200
    // Здесь $headerModal передает свои свойства, которые он получил на странице index.js,
    // в функцию _createHeaderModal в ее (options)
    const $headerModal = _createHeaderModal(options)
    
    //Чтобы перезаписывать константы должны быть let
    let closing = false
    let destroyed = false

    // Описываем открытие и закрытие модального окна за счет изменения стилей css
    const headerModal = {
        openHeader() {
            // Чтобы избегать потенциальных утечек памяти в крупных проектах нужно удалять методы у удаленных объктов.
            if (destroyed) {
                console.log('Modal is destroyed')
            }
            // Так как у нас есть задержка при закрытии окна, из-за того что  наша анимация длится 200ms, 
            // то нам нужно запретить присвоение класса .open пока длится анимация
            !closing && $headerModal.classList.add('open')
        },
        closeHeader() {
            closing = true
            $headerModal.classList.remove('open')
            $headerModal.classList.add('hide')
            setTimeout(() => {
                $headerModal.classList.remove('hide')
                closing = false
                // Так как при каждом закрытии окна у нас остается модальное окно в dom,
                // что приводит к утечке памяти, реализуем Hook onClose 
                // для удаления Vmodal из Dom дерева: 
                // Учитывая, что у нас есть метод closeHeader и есть таймаут мы спрашиваем есть ли в прототипе метод
                // onClose и являетсяли он функцией и если true , то передаем в options значение onClose
                if (typeof options.onClose === 'function') {
                    options.onClose()
                }
                // Конец Хука тут

            }, ANIMATION_SPEED)

        }
    }

    // dataset получает значение true из атрибута data в строке 51 и 55. Если в dataset есть closeHeader 
    // то вызываем метод headerModal.closeHeader() и закрываем модальное окно
    const listner = event => {
        if (event.target.dataset.closeHeader) {
            headerModal.closeHeader()
        }
    }
    
    // Здесь представлен правильный способ удаления слушателя и для этого мы добавляем listner в саму ноду, 
    // чтобы позже мы согли удалить слушателя. Стоит обратить внимание, что это работает потому, что мы с вами находимся в замыкании.
    $headerModal.addEventListener('click', listner)
 
    // Наиважнейшей задачей в js является очистка dom дерева модального окна и его слушателя тогда, когда окно уже закрыто.
    // Для этого мы добавляем к объекту headerModal метод destroy  прямо в return с помощью Object.assign
    return Object.assign(headerModal, {
        destroy() {
            // Чтобы убрать объект headerModal из dom дерева мы обращаемся к ноде $headerModal (к его parentNode) и вызываем метод removeChild и удаляем mode.
            // Это обычный метод удаления ноды объектов из dom дерева и он может быть использован всегда.
            $headerModal.parentNode.removeChild($headerModal)
            // Во избежании потенциальных утечек памяти всегда удаляем слушателя события из закрытых и удаленных dom элементов.
            $headerModal.removeEventListener('click', listner)
            destroyed = true
        },

        //Контент полученый из index.html встраивается в шаблон как html
        setContent(html) {
            $headerModal.querySelector('[data-content]').innerHTML = html
        }
    })
}
