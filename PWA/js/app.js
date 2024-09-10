const container = document.querySelector(".container");
const coffees = [
  { name: "Perspiciatis", image: "images/coffee1.jpg" },
  { name: "Voluptatem", image: "images/coffee2.jpg" },
  { name: "Explicabo", image: "images/coffee3.jpg" },
  { name: "Rchitecto", image: "images/coffee4.jpg" },
  { name: "Beatae", image: "images/coffee5.jpg" },
  { name: "Vitae", image: "images/coffee6.jpg" },
  { name: "Inventore", image: "images/coffee7.jpg" },
  { name: "Veritatis", image: "images/coffee8.jpg" },
  { name: "Accusantium", image: "images/coffee9.jpg" }
];

const showCoffees = () => {
  let output = "";
  coffees.forEach(({ name, image }) => {
    output += `
      <div class="card">
        <img class="card--avatar" src=${image} />
        <h1 class="card--title">${name}</h1>
        <a class="card--link" href="#">Taste</a>
      </div>
    `;
  });
  container.innerHTML = output;
};

document.addEventListener("DOMContentLoaded", () => {
  updateOnlineStatus(); // Detectar el estado al cargar la página
  showCoffees(); // Mostrar los cafés inicialmente
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function(registration) {
    console.log('Service Worker registrado con éxito:', registration);
  }).catch(function(error) {
    console.log('Error al registrar el Service Worker:', error);
  });
}

function updateOnlineStatus() {
  if (!navigator.onLine) {
    container.innerHTML = '<h2>Conéctate al Wi-Fi por favor 😔</h2>';
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.justifyContent = "center";
    container.style.alignItems = "center";
    container.style.height = "100vh"; // Para centrar verticalmente en la pantalla completa
    container.style.textAlign = "center";
    container.style.padding = "20px";
    container.style.fontSize = "24px"; // Aumentar el tamaño de la fuente para móviles
  } else {
    container.style.display = ""; // Restablecer el estilo cuando esté en línea
    container.style.height = ""; 
    showCoffees(); // Restaurar las tarjetas de café cuando vuelva a estar online
  }
}

window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOnlineStatus);
