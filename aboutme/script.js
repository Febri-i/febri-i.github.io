document.querySelector('.main').style.height = `${window.innerHeight}px`;
const febriStr = document.querySelector('.febri-i').textContent.split('');
document.querySelector('.febri-i').textContent = '';
febriStr.forEach(item => {
  document.querySelector('.febri-i').innerHTML += `<span class='febriStr'>${item}</span>`
});
let i = 0;
const febriInt = setInterval(function() {
  document.querySelectorAll('.febriStr')[i].classList.add('fade');
  if(i == Array.from(document.querySelectorAll('.febriStr')).length - 1) {
    clearInterval(febriInt);
  }
  i++
}, 50);
let a = 0;
window.addEventListener('scroll', ev => {
  const position = document.querySelector('.about').getBoundingClientRect()
  if(position.top < window.innerHeight && position.bottom >= 0) {
    document.querySelector('html').style.filter = 'invert()';
  } else {
    document.querySelector('html').style.filter = 'none';
  }
});
document.querySelector('.aboutMe').addEventListener('click', m => scrolly('about'));
document.querySelector('.Contact').addEventListener('click', m => scrolly('contact'));
document.querySelector('.about').addEventListener('click', ev => scrolly('main'));
document.querySelector('.contact').addEventListener('click', ev => scrolly('main'));

function scrolly(elementClass) {
  const offsetTop = document.querySelector(`.${elementClass}`).offsetTop;
  scroll({
    top: offsetTop,
    behavior: "smooth"
  });
}
document.querySelector('.febri-i').addEventListener('mouseover', ev => {
  document.querySelector('.febri').style.boxShadow = '0px 0px 100px purple';
  document.querySelector('.febri-i').addEventListener('mouseleave', ev => {
    document.querySelector('.febri').style.boxShadow = '';
  });
});