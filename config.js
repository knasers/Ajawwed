const phaserConfig = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    parent: "game",
    width: 1280,
    height: 720,
    resolution: 3,

    render: {
        pixelArt: false, 
        antialias: true 
    },
    

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
   backgroundColor: "#000000",
    scene: [Menu,Game,Level2,Level3,Level4,Credit,Story,Win,GameOver]
};

const game = new Phaser.Game(phaserConfig);
game.scene.start("Menu"); 

////remove cash
for(let type in this.cache) {
    console.log(type)

    if (type != 'game') {
        for (let entry in this.cache[type]) {
            this.cache[type].remove(entry);
        }
    }

}