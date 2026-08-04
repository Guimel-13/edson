// --- LÓGICA DE NAVEGACIÓN ---
function nextScreen(currentId, nextId) {
    document.getElementById(`screen${currentId}`).classList.add('hidden');
    document.getElementById(`screen${currentId}`).classList.remove('active');
    
    document.getElementById(`screen${nextId}`).classList.remove('hidden');
    // Pequeño delay para que la transición css se note
    setTimeout(() => {
        document.getElementById(`screen${nextId}`).classList.add('active');
    }, 50);
}

// --- LÓGICA DE LA HUELLA DACTILAR Y MÚSICA ---
const fingerprintBtn = document.getElementById('fingerprintBtn');
const fingerprintContainer = document.querySelector('.fingerprint-container');
const bgMusic = document.getElementById('bgMusic'); // Seleccionamos el audio
let holdTimer;
const holdDuration = 2000; // 2 segundos manteniendo presionado

function startScan(e) {
    e.preventDefault(); // Previene comportamientos raros en móviles
    fingerprintContainer.classList.add('scanning');
    
    holdTimer = setTimeout(() => {
        fingerprintContainer.classList.remove('scanning');
        nextScreen(1, 2);
        
        // Reproducir la música de fondo al desbloquear
        bgMusic.play().catch(error => {
            console.log("El navegador bloqueó el autoplay. Se requiere interacción del usuario.", error);
        });
        
    }, holdDuration);
}

function stopScan() {
    clearTimeout(holdTimer);
    fingerprintContainer.classList.remove('scanning');
}

// Eventos para PC (Mouse) y Móviles (Touch)
fingerprintBtn.addEventListener('mousedown', startScan);
fingerprintBtn.addEventListener('mouseup', stopScan);
fingerprintBtn.addEventListener('mouseleave', stopScan);

fingerprintBtn.addEventListener('touchstart', startScan);
fingerprintBtn.addEventListener('touchend', stopScan);

// --- LÓGICA DE FECHAS Y CONTADORES ---
const startDate = new Date('2019-08-04T00:00:00'); // 04 de agosto de 2019

function updateCounters() {
    const now = new Date();
    const diffTime = Math.abs(now - startDate);
    
    // Cálculo total de días (Pantalla 2)
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    document.getElementById('total-days').innerHTML = `${totalDays} <i class="fa-solid fa-heart heart-icon"></i>`;

    // Cálculo detallado (Pantalla 3)
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();
    
    if (days < 0) {
        months--;
        // Días en el mes anterior
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    document.getElementById('c-years').innerText = years;
    document.getElementById('c-months').innerText = months;
    document.getElementById('c-days').innerText = days;
    document.getElementById('c-hours').innerText = hours;
    document.getElementById('c-minutes').innerText = minutes;
    document.getElementById('c-seconds').innerText = seconds;
}

// Actualizar el contador cada segundo
setInterval(updateCounters, 1000);
updateCounters(); // Ejecutar inmediatamente al cargar


// --- LÓGICA DE LA GALERÍA DE RECUERDOS (Pantalla 4) ---
// Aquí puedes agregar tantas frases como quieras. El código creará las 45 imágenes automáticamente.
const loveQuotes = [
    "Mi lugar favorito es contigo.",
    "Desde que te conocí, todo es mejor.",
    "Coleccionando momentos...",
    "Mi persona favorita.",
    "Edson y Viviana por siempre.",
    "Eres mi mejor casualidad.",
    "Amor de mi vida.",
    "Infinitamente tú."
];

const gallery = document.getElementById('gallery');

// 1. Crear un arreglo con todos los números del 1 al 38
let availablePhotos = [];
for (let i = 1; i <= 38; i++) {
    // 2. Excluir la foto 1 y la 26, que ya están en uso
    if (i !== 1 && i !== 26) {
        availablePhotos.push(i);
    }
}

// 3. Recorrer los 36 números restantes para armar la galería
availablePhotos.forEach(num => {
    // Escoge una frase al azar
    const randomQuote = loveQuotes[Math.floor(Math.random() * loveQuotes.length)];
    
    const div = document.createElement('div');
    div.className = 'memory-item';
    
    // Aseguramos que la extensión sea .jpeg como nos indicaste
    div.innerHTML = `
        <img src="img/foto${num}.jpeg" alt="Recuerdo ${num}" onerror="this.src='https://via.placeholder.com/400x500/1c1a1a/daba94?text=Foto+${num}'">
        <div class="memory-overlay">${randomQuote}</div>
    `;
    gallery.appendChild(div);
});