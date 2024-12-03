// Canvas und Kontext initialisieren
const canvas = document.getElementById('image-sequence');
const context = canvas.getContext('2d');
const debugInfo = document.getElementById('debug-info');

// Anzahl der Frames
const frameCount = 87; // Bilder von 200 bis 286

// Funktion, um den Bildpfad zu generieren
const currentFrame = (index) => `images/Sequenz ${index.toString().padStart(4, '0')}.jpg`;

// Array für die Bilder
const images = [];
let loadedImages = 0;

// Debugging-Funktion
const updateDebugInfo = (message) => {
  debugInfo.innerText = message;
};

// Bilder vorladen
for (let i = 200; i <= 286; i++) {
  const img = new Image();
  img.src = currentFrame(i);

  img.onload = () => {
    loadedImages++;
    updateDebugInfo(`Bild geladen: ${img.src} (${loadedImages}/${frameCount})`);
    if (loadedImages === frameCount) {
      updateDebugInfo('Alle Bilder geladen. Scroll zur Animation.');
      render(); // Starte die Animation, wenn alle Bilder geladen sind
    }
  };

  img.onerror = () => {
    console.error(`Fehler beim Laden des Bildes: ${img.src}`);
    updateDebugInfo(`Fehler beim Laden des Bildes: ${img.src}`);
  };

  images.push(img);
}

// Canvas-Größe einstellen
const setCanvasSize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

setCanvasSize();

// Funktion zum Rendern eines Frames
const render = () => {
  // Scroll-Position abrufen
  const scrollTop = document.documentElement.scrollTop || window.scrollY; // Aktuelle Scroll-Position
  const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight; // Maximale Scrollhöhe

  // Berechnung des Scroll-Fortschritts mit Überprüfung
  const scrollFraction = maxScrollTop > 0 ? Math.min(scrollTop / maxScrollTop, 1) : 0; // Begrenzen auf 1 oder 0

  // Berechnung des Frame-Index
  const frameIndex = Math.floor(scrollFraction * (frameCount - 1)) + 200; // Index zwischen 200 und 286

  // Debugging: Zeige den aktuellen Frame-Index und Fortschritt
  updateDebugInfo(`ScrollTop: ${scrollTop}, MaxScroll: ${maxScrollTop}, Frame: ${frameIndex}, Fortschritt: ${scrollFraction.toFixed(2)}`);

  // Hole das Bild für den aktuellen Frame
  const image = images[frameIndex - 200]; // Array-Index anpassen (beginnt bei 0)

  if (image) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
  } else {
    console.error(`Kein Bild gefunden für Frame ${frameIndex}`);
    updateDebugInfo(`Kein Bild gefunden für Frame ${frameIndex}`);
  }
};

let ticking = false;

// Optimierte Scroll-Event-Listener mit requestAnimationFrame
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      render();
      ticking = false;
    });
    ticking = true;
  }
});

window.addEventListener('resize', () => {
  setCanvasSize();
  render();
});

// Test-Render für ein Bild, um sicherzustellen, dass das Canvas funktioniert
const testImage = new Image();
testImage.src = 'images/Sequenz 0200.jpg';
testImage.onload = () => {
  context.drawImage(testImage, 0, 0, canvas.width, canvas.height);
  updateDebugInfo(`Testbild geladen: ${testImage.src}`);
};
testImage.onerror = () => {
  console.error("Fehler beim Laden des Testbildes");
  updateDebugInfo("Fehler beim Laden des Testbildes");
};