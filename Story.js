
var i = 1
var BackButton = 'assets/imagesnew/back_button.png';

var Story = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function () {

        Phaser.Scene.call(this, { "key": "Story" });
    },
    init: function (data) {
    }, preload: function () {

        this.load.image("bg0", "Asset/images/level1.png");
        for (var i = 1; i < 7; i++) {
            this.load.image("picture" + i, "Asset/images/level" + i + ".png");
        }

        this.load.image('icon', 'assets/imagesnew/next-icon.png');
        this.load.image('BackButton', BackButton);


    },
    create: function () {
        this.bg0 = this.add.image(400, 300, "bg0").setScale(1.5)


        this.anims.create({
            key: 'explosion',
            frames: [
                { key: 'picture1' },
                { key: 'picture2' },
                { key: 'picture3' },
                { key: 'picture4' },
                { key: 'picture5' },
                { key: 'picture6' }
            ],
            frameRate: 0.2,
            repeat: -1
        });
        pic = this.add.sprite(650, 320, "picture" + i).setScale(0.6)
        next = this.add.image(1200, 400, "icon").setScale(0.1).setInteractive()
        prev = this.add.image(90, 400, "icon").setScale(0.1).setInteractive()
        prev.flipX = true;



        next.on('pointerdown', loadImage1, this);
        function loadImage1() {
            this.load.once('complete', nextSprites, this);
            for (var i = 1; i < 7; i++) {
                this.load.image("picture" + i, "Asset/images/level" + i + ".png");

            }

            this.load.start();
        }
        function nextSprites() {
            pic.destroy();





            i++
            this.add.sprite(650, 320, "picture" + i).setScale(0.6)
            if (i > 5) { i = 1 }
        }
        prev.on('pointerdown', loadImage2, this);
        function loadImage2() {
            this.load.once('complete', prevSprites, this);
            for (var i = 1; i < 7; i++) {
                this.load.image("picture" + i, "Asset/images/level" + i + ".png");


            }

            this.load.start();
        }
        function prevSprites() {
            pic.destroy();

            if (i < 2) { i = 6 }
            this.add.sprite(650, 320, "picture" + i).setScale(0.6)
            i--

        }



        var text0 = this.add.text(
            600,
            20,
            "Game  القيم",
            {
                fontSize: 50,
                color: "#ffffff",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);




        Back = this.add.image(150, 670, 'BackButton').setInteractive()

        Back.on('pointerdown', function (pointer) {

            this.scene.scene.start('Menu');


        })
       





    },
    update: function () { }
});