let menu = document.querySelector('#burger');
let navlist = document.querySelector('nav');

menu.onclick = () => {
    menu.classList.toggle('bx-menu');
    menu.classList.toggle('bx-x');
    navlist.classList.toggle('open');
  };