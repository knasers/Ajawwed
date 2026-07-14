// loading.js
class Loading extends Phaser.Scene {
    constructor() {
        super({ key: 'Loading' });
    }

    preload() {
        // Add a background color or image for the loading screen
        this.cameras.main.setBackgroundColor('#2d2d2d'); // Dark gray background for loading screen

        // Alternatively, you can add an image:
        // this.load.image('loadingBackground', 'assets/loadingBackground.png');
        // this.add.image(400, 300, 'loadingBackground');

        // Display loading message and percentage text
        this.loadingText = this.add.text(400, 300, 'Loading... 0%', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        // Create a loading bar (optional, can be styled)
        this.loadingBar = this.add.graphics();
        this.loadingBar.fillStyle(0x00ff00, 1);
        this.loadingBar.fillRect(200, 350, 880, 30);

        // Set up the progress event listener
        this.load.on('progress', (value) => {
            // Update the loading percentage text and the loading bar width
            const percentage = Math.round(value * 100);
            this.loadingText.setText('Loading... ' + percentage + '%');
            this.loadingBar.clear();
            this.loadingBar.fillStyle(0x00ff00, 1);
            this.loadingBar.fillRect(200, 350, 880 * value, 30);
        });

        // Preload all assets for your scenes (images, sounds, etc.)

        // Add all other assets here
        // Example:
        // this.load.audio('bgMusic', 'assets/bgMusic.mp3');
        // this.load.spritesheet('playerSprite', 'assets/playerSprite.png', { frameWidth: 32, frameHeight: 32 });
    }

    create() {
        // Once assets are loaded, transition to the next scene (Menu)
        this.scene.start('Menu');
    }
}
