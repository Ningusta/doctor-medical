const counters = [
  { start: 0, end: 10, element: document.getElementById("contador1") },
  { start: 0, end: 5, element: document.getElementById("contador2") },
  { start: 0, end: 200, element: document.getElementById("contador3") },
];

const duration = 3000; // Tiempo en ms

function animateCounter(timestamp, counter) {
  if (!counter.startTime) counter.startTime = timestamp;
  const progress = Math.min((timestamp - counter.startTime) / duration, 1);
  counter.element.textContent =
    "+ " + Math.floor(progress * (counter.end - counter.start) + counter.start);
  if (progress < 1) {
    requestAnimationFrame((timestamp) => animateCounter(timestamp, counter));
  }
}

const observerOptions = {
  threshold: 0.5, // Ejecutar cuando el 50% de la sección esté visible
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      counters.forEach((counter) => {
        requestAnimationFrame((timestamp) =>
          animateCounter(timestamp, counter)
        );
      });
      observer.disconnect(); // Detener la observación después de la primera ejecución
    }
  });
}, observerOptions);

observer.observe(document.getElementById("contador-section"));

let currentSlide = 0;
const diapositivas = document.querySelectorAll("#car"); // Selecciona todos por clase
const indicatorsContainer = document.getElementById("indicators");

diapositivas.forEach((_, index) => {
  const indicator = document.createElement("div");
  indicator.classList.add("indicator");
  if (index === 0) indicator.classList.add("active");
  indicator.addEventListener("click", () => updateSlide(index));
  indicatorsContainer.appendChild(indicator);
});

// Cambiar diapositiva
function cambiarDiap(direccion) {
  cambio = currentSlide + direccion;
  console.log(cambio);
  console.log(direccion);
  if (cambio >= 0 && cambio < diapositivas.length) updateSlide(cambio);
  if (cambio < 0) updateSlide(diapositivas.length - 1);
  if (cambio >= diapositivas.length) updateSlide(0);
}

// Ir a una diapositiva específica
function goToSlide(index) {
  updateSlide(index);
}

// Actualizar contenido y estilos
function updateSlide(newSlide) {
  diapositivas[currentSlide].style.display = "none";
  diapositivas[newSlide].style.display = "grid";
  currentSlide = newSlide;
  const indicators = document.querySelectorAll(".indicator");
  indicators.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}
