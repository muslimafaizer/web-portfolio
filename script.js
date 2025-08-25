
const navToggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');
navToggle.addEventListener('click', () => nav.classList.toggle('show'));


nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('show')));


const typer = document.getElementById('typewriter');
const words = JSON.parse(typer.getAttribute('data-words'));
let w = 0, i = 0, deleting = false, pause = 1200;

function tick(){
  const full = words[w];
  typer.textContent = full.substring(0, i);
  if(!deleting && i < full.length){ i++; setTimeout(tick, 80); }
  else if(!deleting && i === full.length){ deleting = true; setTimeout(tick, pause); }
  else if(deleting && i > 0){ i--; setTimeout(tick, 50); }
  else { deleting = false; w = (w + 1) % words.length; setTimeout(tick, 200); }
}
tick();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
},{ threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


document.getElementById('year').textContent = new Date().getFullYear();
