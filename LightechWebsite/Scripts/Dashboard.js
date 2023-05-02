var menuItem = document.querySelectorAll('.item-menu');
var expandirList = document.querySelector('#expandir-list');
var menuSite = document.querySelector('.menu-lateral');

function selectLink() {
    menuItem.forEach((item) => 
        item.classList.remove('ativo')
    );
    this.classList.add('ativo');
}

menuItem.forEach((item) => 
    item.addEventListener('click', selectLink)
);

// EXPANDIR o menu list

expandirList.addEventListener('click', function(){
    menuSite.classList.toggle('expandir');
    // expandirList.classList.toggle('expandir');
})