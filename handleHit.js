function handleHit(charOne, fire, healthSprite, healthCount) {
    hitfires += 1;

    const healthSprites = [
        'Health2', 'Health3', 'Health4', 'Health5', 'Health6'
    ];


    if (hitfires <= healthSprites.length) {
        this['H' + (hitfires)] = this.add.sprite(150, 50, healthSprites[hitfires - 1]);
        this['H' + (hitfires)].setScrollFactor(0, 0);
    }

    charOne.x -= 40;
    fire.x += 40;

    if (hitfires >= 5) {
        if (this['H' + hitfires]) {
            this['H' + hitfires].destroy();
        }

        this.H6 = this.add.sprite(150, 50, 'Health6');
        this.H6.setScrollFactor(0, 0);

        charOne.x -= 40;
        fire.x += 40;

        this.time.addEvent({
            delay: 1500,
            callback: () => {
                this.scene.stop('Game');
                this.scene.start('GameOver', { playerScore: score, Hitfires: hitfires, HitMoneys: hitMoneys });
            },
            loop: false
        });

        clearInterval();
    }
}


