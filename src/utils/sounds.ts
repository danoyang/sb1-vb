// Short, pleasant "ding" sound effect
const correctSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3');

export const playCorrectSound = () => {
  correctSound.currentTime = 0; // Reset sound to start
  return correctSound.play().catch(err => console.error('Error playing sound:', err));
};