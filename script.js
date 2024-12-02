const canvas = document.getElementById('image-sequence');
const context = canvas.getContext('2d');

const frameCount = 83; // Deine Bilder gehen von 1 bis 83

// Funktion, um den Pfad zu jedem Bild zu generieren
const currentFrame = (index) => `images/Grußvideo Britta Deiters${index}.jpg`;

// Array für die Bilder
const images = [];
let loadedImages = 0;

// Lade alle Bilder vor
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  img.onload = () => {
    loadedImages++;
    if (loadedImages === frameCount) {
      render(); // Wenn alle Bilder geladen sind, rendere das erste Bild
    }
  };
  images.push(img);
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Funktion zum Rendern eines Frames
const render = () => {
  const scrollTop = document.documentElement.scrollTop;
  const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;

  // Ermittle den aktuellen Frame basierend auf dem Scroll-Fortschritt
  const frameIndex = Math.min(frameCount - 1, Math.ceil(scrollFraction * frameCount));

  // Zeichne das Bild auf das Canvas
  const image = images[frameIndex];
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
};

// Scroll- und Resize-Events
window.addEventListener('scroll', render);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
});

// Initiales Rendern
render();