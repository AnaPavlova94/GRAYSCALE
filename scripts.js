document.addEventListener('DOMContentLoaded', function () {
    const navInit = () => {
        //изменение цвета меню
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
        }

        const links = document.querySelectorAll('.nav-link'); //ссылки
        const sections = document.querySelectorAll('section'); //секции

        sections.forEach(section => {
            if (window.scrollY >= (section.offsetTop - 100)) {
                console.log(window.scrollY + " >= " + section.offsetTop + " " + section.id);
                links.forEach(link => {
                    link.classList.remove('active')
                    if (link.href.split('#').pop() === section.id) {
                        link.classList.add('active')
                    }
                })
            }
        })
    }

    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.scrollX || document.documentElement.scrollLeft,
            scrollTop = window.scrollY || document.documentElement.scrollTop;
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft};
    }

    // js анимация
    const animItems = document.querySelectorAll('.animation');
    if (animItems.length > 0) {
       function onEntry(params) {
           animItems.forEach(item => {
               const itemHeight = item.offsetHeight; //высота анимируемого объекта
               const itemOffset = offset(item).top; // позиция объекта
               const startPos = 2; //парамерт старта анимации
               const animPoint = document.documentElement.clientHeight - itemHeight / startPos;

               if(itemHeight > document.documentElement.clientHeight) {
                   const animPoint = document.documentElement.clientHeight - document.documentElement.clientHeight / startPos;
               }
               if((scrollY > itemOffset - animPoint) && scrollY < itemOffset + itemHeight) {
                   item.classList.add('show');
               } else {
                   if(!item.classList.contains('no-hide')) {
                       item.classList.remove('show');
                   }
               }
           })
       }
    }

    onEntry();
    navInit();
    window.addEventListener('scroll', () => {
        navInit();
        onEntry();
    })
    window.addEventListener('resize', () => {
        navInit(); //запускаем ф-цию ресайса стр-цы
    })

})