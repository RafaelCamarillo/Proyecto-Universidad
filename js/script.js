


console.log(" script.js cargado correctamente");
fetch('http://localhost:3000/monstruos')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        // Aquí renderizas los monstruos en tu HTML
    })
    .catch(err => console.error(err));


const monstruos = [
{
    nombre: "Rathalos",
    tipo: "Wyvern volador",
    habitat: "Bosques y montañas",
    desc: "El Rathalos, conocido como el Rey de los Cielos, patrulla su territorio desde el aire y escupe bolas de fuego.",
    debilidades: "Dragón, Rayo",
    resistencias: "Fuego",
    tamano: "Grande",
    img: "img/rathalos.png",
    consejos: [
      "Lleva armas con daño de rayo.",
      "Usa trampas eléctricas cuando baje al suelo.",
      "Evita quedarte debajo cuando esté volando."
    ]
  },
  {
    nombre: "Zinogre",
    tipo: "Wyvern con colmillos",
    habitat: "Llanuras",
    desc: "Un wyvern ágil cargado de electricidad. Puede acumular energía para entrar en modo sobrecarga.",
    debilidades: "Hielo, Agua",
    resistencias: "Rayo",
    tamano: "Grande",
    img: "img/zinogre-card.png",
    consejos: [
      "Ataca cuando esté descargado.",
      "Evita su salto eléctrico.",
      "Rompe su espalda para interrumpir su carga."
    ]
  },
  {
    nombre: "Nargacuga",
    tipo: "Wyvern volador",
    habitat: "Selva",
    desc: "Rápido, sigiloso y letal con su cola. Ataca desde las sombras.",
    debilidades: "Rayo, Hielo",
    resistencias: "Oscuridad",
    tamano: "Grande",
    img: "img/nargacuga-card.png",
    consejos: [
      "Golpea su cabeza cuando se detenga.",
      "Usa trampas sónicas para romper su ritmo.",
      "Evita ponerte detrás de él."
    ]
  },
    {
    nombre: "Anjanath",
    tipo: "Wyvern",
    habitat: "Bosque primitivo",
    desc: "Un wyvern feroz que caza cualquier cosa que invada su territorio. Su aliento de fuego es devastador.",
    debilidades: "Agua, Hielo",
    resistencias: "Fuego",
    tamano: "Grande",
    img: "img/anjanath.png",
    consejos: [
      "Apunta a la cabeza o la garganta para derribarlo.",
      "Evita su carga, es muy rápida.",
      "Llévate bombas de agua."
    ]
  },
{
  nombre: "Nergigante",
  tipo: "Dragón anciano",
  habitat: "Zonas volcánicas y cavernas profundas",
  desc: "Un dragón anciano extremadamente agresivo que se lanza contra sus presas sin dudar. Sus espinas crecen rápidamente y se endurecen con el tiempo, volviéndose mortales.",
  debilidades: "Dragón, Rayo",
  resistencias: "Oscuridad, Fuego",
  tamano: "Grande",
  img: "img/nerguigante.png",
  consejos: [
    "Ataca sus espinas antes de que se endurezcan.",
    "Evita estar frente a él cuando se lance.",
    "Lleva armas con daño de dragón para debilitarlo rápidamente."
  ]
},

  {
    nombre: "Pukei-Pukei",
    tipo: "Pterrordax",
    habitat: "Bosques y pantanos",
    desc: "Una criatura colorida que almacena veneno en su garganta para escupirlo a los enemigos.",
    debilidades: "Rayo, Fuego",
    resistencias: "Veneno",
    tamano: "Mediano",
    img: "img/pukei.png",
    consejos: [
      "Ataca cuando recargue su veneno.",
      "Evita su cola y boca.",
      "Usa ataques a distancia."
    ]
  }
];

// ==== Elementos del DOM ====
const grid = document.getElementById("monstersGrid");
const searchInput = document.getElementById("searchInput");
const filterTipo = document.getElementById("filterTipo");

// ==== Modal ====
const modal = document.getElementById("monsterModal");
const modalClose = document.getElementById("modalClose");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalTipo = document.getElementById("modalTipo");
const modalHabitat = document.getElementById("modalHabitat");
const modalDesc = document.getElementById("modalDesc");
const modalDebilidades = document.getElementById("modalDebilidades");
const modalResistencias = document.getElementById("modalResistencias");
const modalTamano = document.getElementById("modalTamano");
const modalConsejos = document.getElementById("modalConsejos");
const modalFavBtn = document.getElementById("modalFavBtn");

const toast = document.getElementById("toast");


function mostrarMonstruos(lista) {
  grid.innerHTML = "";
  lista.forEach(m => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${m.img}" alt="${m.nombre}">
      <div class="card-body">
        <h3>${m.nombre}</h3>
        <p class="muted">${m.tipo} • ${m.habitat}</p>
        <p>${m.desc.slice(0, 80)}...</p>
        <button class="btn verMas">Ver más</button>
      </div>
    `;
    card.querySelector(".verMas").addEventListener("click", () => abrirModal(m));
    grid.appendChild(card);
  });
}

function abrirModal(m) {
  modalImg.src = m.img;
  modalTitle.textContent = m.nombre;
  modalTipo.textContent = m.tipo;
  modalHabitat.textContent = m.habitat;
  modalDesc.textContent = m.desc;
  modalDebilidades.textContent = m.debilidades;
  modalResistencias.textContent = m.resistencias;
  modalTamano.textContent = m.tamano;

  modalConsejos.innerHTML = "";
  m.consejos.forEach(c => {
    const li = document.createElement("li");
    li.textContent = c;
    modalConsejos.appendChild(li);
  });

  modalFavBtn.onclick = () => mostrarToast(`${m.nombre} añadido a favoritos`);
  modal.setAttribute("aria-hidden", "false");
}


modalClose.addEventListener("click", () => {
  modal.setAttribute("aria-hidden", "true");
});


function filtrarMonstruos() {
  const texto = searchInput.value.toLowerCase();
  const tipo = filterTipo.value;
  const filtrados = monstruos.filter(m =>
    (tipo === "all" || m.tipo.toLowerCase() === tipo) &&
    (m.nombre.toLowerCase().includes(texto) ||
     m.desc.toLowerCase().includes(texto) ||
     m.habitat.toLowerCase().includes(texto))
  );
  mostrarMonstruos(filtrados);
}

searchInput.addEventListener("input", filtrarMonstruos);
filterTipo.addEventListener("change", filtrarMonstruos);


function mostrarToast(mensaje) {
  toast.textContent = mensaje;
  toast.style.opacity = "1";
  setTimeout(() => (toast.style.opacity = "0"), 2500);
}


mostrarMonstruos(monstruos);
