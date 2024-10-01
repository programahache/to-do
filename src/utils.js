export const playSound = (filepath) => {
    const audio = new Audio(filepath);
    audio.play();
};

