
let menuIcon = document.querySelector('#menu-icon');
let nav = document.querySelector('.nav');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  nav.classList.toggle('active');
}
window.onscroll = () => {
  let header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 100);
  menuIcon.classList.remove('bx-x');
  nav.classList.remove('active');
}
let tl = gsap.timeline();
tl.from(".header,#logo,.nav>a",{
    y : -100,
    delay : 0.2,
    duration : 1,
    opacity:0,
    stagger:0.5
});
tl.from("#home",{
  y : -50,
  delay:-0.8,
  duration : 1,
  opacity:0,
});
tl.from(".btn-box",{
  duration : 1,
  opacity:0,
});
tl.from(".social>a",{
  duration : 2,
  opacity:0,
  stagger:0.2
});
