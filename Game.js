var Boss;
var Moneys;
var Gf1, Gf2, Gf3, Gf4, Gf5;
var Tre1, Tre2, Tre3, Tre4;
var bombs;
var platforms;
var cursors;
var score = 0;
var score1 = 0;
var score2 = 0;
var score3 = 0;
var score4 = 0;

var movingBlock; // الكتلة المتحركة المضافة
var M1,M2 ,M3, M4,M5 ,M6;
var playerScore;
var Hitfires;
var gameOver = false;
var scoreText;
var liveText;
var level = 1;
var right_lives = 12;
var left_lives = 12;
var alllives = right_lives + left_lives;
var shot = 0;
var hit = 3;
var randscale;
var hitfires = 0;
var remainingTime = 20;

var levels = 'data/level1.json';
var levelname = 'المستوى الاول : الصدق';
var arrow = 'Asset/images/arrow.png';
var arrowover = 'Asset/images/arrowover.png';

var bglevel = 'assets/imagesnew/6-mountain-parallax.png';
var mountain1 = 'assets/imagesnew/1-mountain-parallax.png';
var building1 = 'Asset/images/building1.png';
var ground = 'assets/imagesnew/floor.png';
var groundfail = 'assets/imagesnew/groundfail.png';
var groundfailhit1 = 'assets/imagesnew/groundfailhit1.png';
var groundfailhit2 = 'assets/imagesnew/groundfailhit2.png';
var groundfailhit3 = 'assets/imagesnew/groundfailhit3.png';
var groundfailhit4 = 'assets/imagesnew/groundfailhit4.png';
var groundfailhit5 = 'assets/imagesnew/groundfailhit5.png';
var block1 = 'Asset/images/block0002.png';
var cloud = 'Asset/images/cloudslevel1.png';
var groundcollider = 'assets/imagesnew/groundcollider.png';
var blockcollider = 'assets/imagesnew/blockcollider.png';
var movingBlockImg = 'Asset/images/block0003.png'; // صورة الكتلة المتحركة المضافة

var Health1 = 'Asset/images/health1.png';
var Health2 = 'Asset/images/health2.png';
var Health3 = 'Asset/images/health3.png';
var Health4 = 'Asset/images/health4.png';
var Health5 = 'Asset/images/health5.png';
var Health6 = 'Asset/images/health6.png';

var Money = 'Asset/images/question.png';
var Money01 = 'Asset/images/question0.png';
var Money02 = 'Asset/images/question1.png';
var Money03 = 'Asset/images/question2.png';
var Money04 = 'Asset/images/question3.png';
var Money05 = 'Asset/images/question4.png';
var Money06 = 'Asset/images/question5.png';

var coin = 'Asset/images/coin.png';
var bullet = 'assets/imagesnew/bullet.png';
var treasure1 = 'Asset/images/wins0001.png';
var questionborder = 'Asset/images/questionborder.png';
var buttons = 'Asset/images/button.png';

var shotright = true;
var shotleft = true;
this.moveCam = false;

var Game = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function () {
        Phaser.Scene.call(this, { "key": "Game" });
        this.levelConfig = {
            file: 'data/level1.json',
            name: 'المستوى الاول : الصدق'
        };
    },

    init: function (data) {
        this.levelConfig = {
            file: 'data/level1.json',
            name: 'المستوى الاول : الصدق'
        };

        if (data) {
            score = 0;
            hitfires = 0;
            hitMoneys = 0;
        }



        
    },

    preload: function () {
        this.load.json('questionsData', levels);
        this.load.image('arrow', arrow);
        this.load.image('bglevel', bglevel);
        this.load.image('mountain1', mountain1);
        this.load.image('building1', building1);
        this.load.image('groundcollider', groundcollider);
        this.load.image('blockcollider', blockcollider);
        this.load.image('groundfail', groundfail);
        this.load.image('groundfailhit1', groundfailhit1);
        this.load.image('groundfailhit2', groundfailhit2);
        this.load.image('groundfailhit3', groundfailhit3);
        this.load.image('groundfailhit4', groundfailhit4);
        this.load.image('groundfailhit5', groundfailhit5);
        this.load.image('ground', ground);
        this.load.image('block1', block1);
        this.load.image('movingBlock', movingBlockImg); // تحميل صورة الكتلة المتحركة
        this.load.image('cloud', cloud);
        this.load.image('treasure1', treasure1);
        this.load.image('Money', Money);
        this.load.image('coin', coin);
        this.load.image('bullet', bullet);
        this.load.image('BackButton', BackButton);
        this.load.image('Health1', Health1);
        this.load.image('Health2', Health2);
        this.load.image('Health3', Health3);
        this.load.image('Health4', Health4);
        this.load.image('Health5', Health5);
        this.load.image('Health6', Health6);
        this.load.image('Money01', Money01);
        this.load.image('Money02', Money02);
        this.load.image('Money03', Money03);
        this.load.image('Money04', Money04);
        this.load.image('Money05', Money05);
        this.load.image('Money06', Money06);

        //fire
        this.load.spritesheet('fire', 'assets/imagesnew/enemy.png', { frameWidth: 72, frameHeight: 72 });

        this.load.image('win', 'assets/images/win.png');
        this.load.image('gameover', 'assets/images/gameover.png');
        this.load.image('menu', 'assets/images/menu.png');
        this.load.image('replay', 'assets/images/replay.png');
        this.load.image('questionborder', 'Asset/images/questionborder.png');
        this.load.image('btn', 'Asset/images/button.png');

        //run   الولد
        this.load.image('mage', 'Asset/images/char/idle0001.png');
        this.load.image('mageRun1', 'Asset/images/char/idle0002.png');
        this.load.image('mageRun2', 'Asset/images/char/idle0003.png');
        this.load.image('mageRun3', 'Asset/images/char/idle0004.png');
        this.load.image('mageRun4', 'Asset/images/char/idle0005.png');
        this.load.image('mageRun5', 'Asset/images/char/idle0006.png');
        this.load.image('mageRun6', 'Asset/images/char/idle0007.png');
        this.load.image('mageRun7', 'Asset/images/char/idle0008.png');
        this.load.image('mageRun8', 'Asset/images/char/idle0009.png');
        this.load.image('magejumb', 'Asset/images/char/jumb0001.png');

        ///audio sounds
        this.load.audio('bgsound', ['Asset/Sounds/bgsoundlevel1.mp3', 'Asset/Sounds/bgsoundlevel1.mp3']);
        this.load.audio('levelWin', ['Asset/Sounds/levelWin.mp3', 'Asset/Sounds/levelWin.mp3']);
        this.load.audio('levelFail', ['Asset/Sounds/levelFail.mp3', 'Asset/Sounds/levelFail.mp3']);
        this.load.audio('MoneybubblePop', ['Asset/Sounds/bubblePop.mp3', 'Asset/Sounds/bubblePop.mp3']);
        this.load.audio('coinclick', ['Asset/Sounds/click.mp3', 'Asset/Sounds/click.mp3']);
        this.load.audio('rightAnswer', ['Asset/Sounds/click.mp3', 'Asset/Sounds/rightAnswer.mp3']);
        this.load.audio('wrongAnswer', ['Asset/Sounds/wrongAnswer.mp3', 'Asset/Sounds/wrongAnswer.mp3']);

        



        //  Input Events
        cursors = this.input.keyboard.createCursorKeys();
    },

    create: function () {
        this.cameras.main.setBounds(0, 0, 3500, 720);
        this.physics.world.bounds.width = 3500;
        this.physics.world.bounds.height = 720;

        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        bgl = this.add.image(0, 0, 'bglevel').setOrigin(0, 0);
        cloud = this.add.image(640, 350, 'cloud');

        this.add.image(1100, 390, 'mountain1').setScale(0.5);
        this.add.image(3350, 400, 'mountain1').setScale(0.5);
        this.add.image(5600, 390, 'mountain1').setScale(0.5);

        this.add.image(630, 310, 'building1').setScale(1);
        this.add.image(630*3, 310, 'building1').setScale(1);
        this.add.image(630*5, 310, 'building1').setScale(1);
    
        Gr = this.add.image(0, 615, 'ground').setOrigin(0, 0);
        Gr = this.add.image(1400, 615, 'ground').setOrigin(0, 0);
        Gr = this.add.image(3000, 615, 'ground').setOrigin(0, 0);

        this.add.image(350, 400, 'block1').setScale(0.7);
        this.add.image(700, 250, 'block1').setScale(0.7);
        this.add.image(1100, 400, 'block1').setScale(0.7);
        this.add.image(1700, 200, 'block1').setScale(0.7);
        this.add.image(2100, 350, 'block1').setScale(0.7);
        this.add.image(2400, 150, 'block1').setScale(0.7);
        this.add.image(2800, 300, 'block1').setScale(0.7);
        this.add.image(3225, 450, 'block1').setScale(0.7);
        this.add.image(3700, 200, 'block1').setScale(0.7);
        this.add.image(4100, 350, 'block1').setScale(0.7);
        this.add.image(4500, 100, 'block1').setScale(0.7);
        this.add.image(4900, 250, 'block1').setScale(0.7);

        // إضافة الكتلة المتحركة
        movingBlock = this.physics.add.sprite(1000, 400, 'movingBlock').setScale(0.7);
        movingBlock.setCollideWorldBounds(true);
        movingBlock.setBounce(1);
        movingBlock.setVelocityX(100);

        this.anims.create({
            key: 'mageStatic',
            frames: [{ key: 'mage', frame: 1 }],
            frameRate: 20,
        });
        this.anims.create({
            key: 'magej',
            frames: [{ key: 'magejumb', frame: 1 }],
            frameRate: 20,
        });

        this.anims.create({
            key: 'mageRun',
            frames: [
                { key: 'mageRun1' },
                { key: 'mageRun2' },
                { key: 'mageRun3' },
                { key: 'mageRun4' },
                { key: 'mageRun5' },
                { key: 'mageRun6' },
                { key: 'mageRun7' },
                { key: 'mageRun8' },
            ],
            frameRate: 10,
            repeat: -1
        });


        Back = this.add.image(1200, 670, 'BackButton').setInteractive();
        Back.on('pointerdown', function (pointer) {
            this.scene.scene.start('Menu');
            this.scene.scene.pause('Game');
        });

        H1 = this.add.sprite(150, 50, 'Health1');
        M1 = this.add.sprite(1100, 50, 'Money01');
        bgl.setScrollFactor(0, 0);
        cloud.setScrollFactor(0, 0);
        H1.setScrollFactor(0, 0);
        M1.setScrollFactor(0, 0);
        Back.setScrollFactor(0, 0);

        const mummyAnimation = this.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNumbers('fire'),
            frameRate: 24
        });

        f1 = this.physics.add.sprite(Phaser.Math.Between(500, 700), 0, 'fire');
        f1.play({ key: 'move', repeat: -1 });
        f2 = this.physics.add.sprite(Phaser.Math.Between(1000, 1700), 0, 'fire');
        f2.play({ key: 'move', repeat: -1 });
        f3 = this.physics.add.sprite(Phaser.Math.Between(1900, 2100), 0, 'fire');
        f3.play({ key: 'move', repeat: -1 });
        f4 = this.physics.add.sprite(Phaser.Math.Between(2500, 2800), 0, 'fire');
        f4.play({ key: 'move', repeat: -1 });

        Gf1 = this.physics.add.sprite(1290, 660, 'groundfailhit1').setOrigin(0, 0);
        Gf2 = this.physics.add.sprite(2690, 660, 'groundfailhit2').setOrigin(0, 0);
        Gf3 = this.physics.add.sprite(4300, 660, 'groundfailhit3').setOrigin(0, 0);
        Gf4 = this.physics.add.sprite(6000, 660, 'groundfailhit4').setOrigin(0, 0);
        Gf5 = this.physics.add.sprite(7800, 660, 'groundfailhit5').setOrigin(0, 0);

      

        Moneys = this.physics.add.group({
            key: 'Money',
            repeat: 4,
            setXY: {
                x: 400,
                y: 0,
                stepX: 500
            }
        });
        Moneys.setVisible(false);
        Moneys.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.2));
        });

        coins = this.physics.add.group({
            key: 'coin',
            repeat: Phaser.Math.Between(50, 80),
            setXY: {
                x: Phaser.Math.Between(20, this.game.config.width / 2), y: 0,
                stepX: Phaser.Math.Between(70, 90)
            }
        });

        coins.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.5));
        });

        const groundPositions = [
            { x: 0, y: 615 }, { x: 1400, y: 615 }, { x: 3000, y: 615 }, { x: 4700, y: 615 }
        ];

        const blockPositions = [
            { x: 350, y: 400 }, { x: 700, y: 250 }, { x: 1100, y: 400 }, { x: 1700, y: 200 },
            { x: 2100, y: 350 }, { x: 2400, y: 150 }, { x: 2800, y: 300 }, { x: 3225, y: 450 },
            { x: 3700, y: 200 }, { x: 4100, y: 350 }, { x: 4500, y: 100 }, { x: 4900, y: 250 }
        ];
        Tre1 = this.physics.add.image(3200, 20, 'treasure1').setScale(1);
        Tre1.setVisible(false);
        
        Tre1.body.setEnable(false);
        platforms = this.physics.add.staticGroup();
        
        groundPositions.forEach(position => {
            platforms.create(position.x, position.y, 'groundcollider').setOrigin(0, 0).refreshBody();
        });

        blockPositions.forEach(position => {
            platforms.create(position.x, position.y, 'blockcollider').setScale(0.7).refreshBody();
        });

        const colliderGroups = [Moneys, coins, f1, f2, f3, f4, Gf1, Gf2, Gf3, Gf4, Gf5, Tre1, movingBlock]; // إضافة الكتلة المتحركة إلى المجموعات المتصادمة

        colliderGroups.forEach(group => {
            this.physics.add.collider(group, platforms);
        });

 

        charOne = this.physics.add.sprite(20, 100, 'mage');
        charOne.body.offset.x = 20;
        charOne.body.offset.y = 50;
        charOne.body.width = 80;
        charOne.body.height = 60;
        charOne.setBounce(0.5);
        charOne.setCollideWorldBounds(true);
        charOne.flipX = false;
        this.questionborder = this.add.image(640, 360, 'questionborder').setOrigin(0.5, 0.5).setVisible(false);

        this.cameras.main.startFollow(charOne);

        this.physics.add.overlap(charOne, Tre1, TreHit1, null, this);

        function TreHit1(charOne, TreHit) {
            this.time.addEvent({
              
                delay: 1000,
                callback: () => {
                    this.scene.start('Win', { 
                        playerScore: score,
                        Hitfires: hitfires,
                        HitMoneys: hitMoneys,
                        currentLevel: 'Level1'
                    });
                },
                loop: false
            });
        }

        function handleFail(charOne) {
            charOne.y = -2000;
            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.scene.start('GameOver', { playerScore: score, Hitfires: hitfires, HitMoneys: hitMoneys });
                },
                loop: false
            });
        }
        
        this.physics.add.overlap(charOne, Gf1, () => handleFail.call(this, charOne), null, this);
        this.physics.add.overlap(charOne, Gf2, () => handleFail.call(this, charOne), null, this);
        this.physics.add.overlap(charOne, Gf3, () => handleFail.call(this, charOne), null, this);
        this.physics.add.overlap(charOne, Gf4, () => handleFail.call(this, charOne), null, this);
        this.physics.add.overlap(charOne, Gf5, () => handleFail.call(this, charOne), null, this);
        
        this.physics.add.collider(charOne, platforms);
        this.physics.add.collider(charOne, movingBlock); // تصادم اللاعب مع الكتلة المتحركة

        this.physics.add.overlap(charOne, Moneys, (charOne, money) => {
            if (money.visible) {
                collectMoneys.call(this, charOne, money);
                var MoneybubblePop = this.sound.add('MoneybubblePop');
                MoneybubblePop.play({ loop: false});
            }
        }, null, this);

        this.physics.add.overlap(charOne, coins, collectCoin1, null, this);

        
        
        this.physics.add.overlap(charOne, f1, () => handleHit.call(this, charOne, f1, 'Health2', hitfires), null, this);
        this.physics.add.overlap(charOne, f2, () => handleHit.call(this, charOne, f2, 'Health2', hitfires), null, this);
        this.physics.add.overlap(charOne, f3, () => handleHit.call(this, charOne, f3, 'Health2', hitfires), null, this);
        this.physics.add.overlap(charOne, f4, () => handleHit.call(this, charOne, f4, 'Health2', hitfires), null, this);
        scoreText = this.add.text(
            640,
            30,
            levelname,
            {
                fontFamily: 'CustomFont',
                fontSize: 38,
                color: "#ffff00",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);
        scoreText.setScrollFactor(0);
        
        scoreText = this.add.text(
            640,
            85,
            'عدد النقاط: 0',
            {
                fontFamily: 'CustomFont',
                fontSize: 30,
                color: "#ff0000",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);
        scoreText.setScrollFactor(0);
        function collectCoin1(charOne, coin) {
                            var coinclick = this.sound.add('coinclick');
                            coinclick.play({ loop: false});
            coin.disableBody(true, true);

            score += 10;
            score1+=1;
            const moneyChildren = Moneys.getChildren();
            moneyChildren.forEach(child => child.setVisible(false));

            if (score1 >= 5 && score1 < 10) {
                moneyChildren[0].setVisible(true);
                moneyChildren[0].x = charOne.x;
                moneyChildren[0].y = charOne.y - 600;
            } else if (score1 >= 10 && score1 < 15) {
                moneyChildren[1].setVisible(true);
                moneyChildren[1].x = charOne.x;
                moneyChildren[1].y = charOne.y - 600;
            } else if (score1 >= 15 && score1 < 20) {
                moneyChildren[2].setVisible(true);
                moneyChildren[2].x = charOne.x;
                moneyChildren[2].y = charOne.y - 600;
            } else if (score1 >= 20 && score1 < 25) {
                moneyChildren[3].setVisible(true);
                moneyChildren[3].x = charOne.x;
                moneyChildren[3].y = charOne.y - 600;
            } else if (score1 >= 25) {
                moneyChildren[4].setVisible(true);
                moneyChildren[4].x = charOne.x;
                moneyChildren[4].y = charOne.y - 600;
             
                this.time.delayedCall(5000, () => {
                    hitMoneys = 5;

                }, [], this);
            }
        
            if (hitMoneys >= 5) {  // تغيير من score1 >= 25 إلى hitMoneys >= 5
                Tre1.setVisible(true);
                Tre1.body.setEnable(true);

            }

            scoreText.setText('عدد النقاط: ' + score);

            if (coins.countActive(true) === 0) {
                coins.children.iterate(function (child) {
                    child.enableBody(true, child.x, 0, true, true);
                });

                var x = (charOne.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            }
        }

        var bgsound = this.sound.add('bgsound');
        bgsound.play({ loop: true });
    },

    update: function () {
        if (gameOver) {
            return;
        }

        if (charOne.x < 10) { charOne.x = 10; }

        // Right arrow button
        arrowright = this.add.image(1000, 650, 'arrow').setInteractive();
        arrowright.on('pointerdown', function (pointer) {
            charOne.setVelocityX(300);
            charOne.flipX = false;
            charOne.anims.play('mageRun', true);
        });
        arrowright.on('pointerup', function (pointer) {
            charOne.setVelocityX(0);
            charOne.anims.play('mageStatic');
        });

        // Left arrow button
        arrowleft = this.add.image(150, 650, 'arrow').setInteractive();
        arrowleft.setScale(-1, 1);
        arrowleft.on('pointerdown', function (pointer) {
            charOne.setVelocityX(-300);
            charOne.flipX = true;
            charOne.anims.play('mageRun', true);
        });
        arrowleft.on('pointerup', function (pointer) {
            charOne.setVelocityX(0);
            charOne.anims.play('mageStatic');
        });

        // Up arrow button
        arrowup = this.add.image(600, 650, 'arrow').setInteractive();
        arrowup.rotation = Phaser.Math.DegToRad(-90);
        arrowup.on('pointerdown', function (pointer) {
            charOne.setVelocityY(-400);
            charOne.anims.play('magej');
        });
        arrowup.on('pointerup', function (pointer) {
            charOne.setVelocityY(0);
            charOne.anims.play('mageStatic');
        });

        arrowright.setScrollFactor(0, 0);
        arrowleft.setScrollFactor(0, 0);
        arrowup.setScrollFactor(0, 0);

        this.input.keyboard.on('keydown', function (event) {
            if (event.key === 'ArrowRight' || event.key === 'd') {
                charOne.setVelocityX(300);
                charOne.flipX = false;
                charOne.anims.play('mageRun', true);
            } else if (event.key === 'ArrowLeft' || event.key === 'a') {
                charOne.setVelocityX(-300);
                charOne.flipX = true;
                charOne.anims.play('mageRun', true);
            } else if (event.key === 'ArrowUp' || event.key === 'w') {
                charOne.setVelocityY(-400);
                charOne.anims.play('magej');
            }
        });

        this.input.keyboard.on('keyup', function (event) {
            if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'ArrowLeft' || event.key === 'a') {
                charOne.setVelocityX(0);
                charOne.anims.play('mageStatic');
            }
            if (event.key === 'ArrowUp' || event.key === 'w') {
                charOne.setVelocityY(0);
                charOne.anims.play('mageStatic');
            }
        });

        if (cursors.down.isDown) { charOne.setVelocityY(400); }
    }
});