var arrow = 'Asset/images/arrow.png';
var bglevel = 'assets/imagesnew/6-mountain-parallax.png';
var mountain2 = 'assets/imagesnew/2-mountain-parallax.png';
var buildinglevel2 = 'Asset/images/building2.png';
var ground = 'assets/imagesnew/floor.png';
var groundfail = 'assets/imagesnew/groundfail.png';
var groundfailhit1 = 'assets/imagesnew/groundfailhit1.png';
var groundfailhit2 = 'assets/imagesnew/groundfailhit2.png';
var groundfailhit3 = 'assets/imagesnew/groundfailhit3.png';
var groundfailhit4 = 'assets/imagesnew/groundfailhit4.png';
var groundfailhit5 = 'assets/imagesnew/groundfailhit5.png';
var block2 ='Asset/images/block0003.png';
var cloud2 = 'Asset/images/cloudslevel2.png';
var movingBlockImg2 = 'Asset/images/block0004.png'; // صورة الكتلة المتحركة المضافة

var groundcollider = 'assets/imagesnew/groundcollider.png';
var blockcollider = 'assets/imagesnew/blockcollider.png';

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
var treasure2 = 'Asset/images/wins0002.png';
var questionborder = 'Asset/images/questionborder.png';
var buttons = 'Asset/images/button.png';

var shotright = true;
var shotleft = true;
this.moveCam = false;

var Level2 = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function () {
        Phaser.Scene.call(this, { "key": "Level2" });
        this.levelConfig = {
            file: 'data/level2.json',
            name: 'المستوى الثاني : الانتماء'
        };
    },
    
    init: function (data) {
        this.levelConfig = {
            file: (data && data.levelFile) || 'data/level2.json',
            name: (data && data.levelName) || 'المستوى الثاني : الانتماء'
        };
        
        if (data) {
            score = data.playerScore || 0;
            hitfires = data.Hitfires || 0;
            hitMoneys = 0;
        }
    }, 
    
    preload: function () {
        // Clear existing JSON cache to prevent stale data
        if (this.cache.json.exists('questionsData')) {
            this.cache.json.remove('questionsData');
        }

        // Load the correct JSON file for Level 2
        this.load.json('questionsData', this.levelConfig.file);

        this.load.image('arrow', arrow);
        this.load.image('bglevel', bglevel);
        this.load.image('mountain2', mountain2);
        this.load.image('buildinglevel2', buildinglevel2);
        this.load.image('groundcollider', groundcollider);
        this.load.image('blockcollider', blockcollider);
        this.load.image('groundfail', groundfail);
        this.load.image('groundfailhit1', groundfailhit1);
        this.load.image('groundfailhit2', groundfailhit2);
        this.load.image('groundfailhit3', groundfailhit3);
        this.load.image('groundfailhit4', groundfailhit4);
        this.load.image('groundfailhit5', groundfailhit5);
        this.load.image('ground', ground);
        this.load.image('block2', block2);
        this.load.image('movingBlock2', movingBlockImg2); // تحميل صورة الكتلة المتحركة
        this.load.image('cloud2', cloud2);
        this.load.image('treasure2', treasure2);
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

        if (this.sound.get('bgsound')) {
            this.sound.get('bgsound').stop();
        }

        var bgsound = this.sound.add('bgsound');
        bgsound.play({ loop: true });

        this.cameras.main.setBounds(0, 0, 3500, 720);
        this.physics.world.bounds.width = 3500;
        this.physics.world.bounds.height = 720;

        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        bgl = this.add.image(0, 0, 'bglevel').setOrigin(0, 0);
        cloud2 = this.add.image(640, 350, 'cloud2');

        this.add.image(1100, 390, 'mountain2').setScale(0.5);
        this.add.image(3350, 400, 'mountain2').setScale(0.5);
        this.add.image(5600, 390, 'mountain2').setScale(0.5);

        this.add.image(630, 310, 'buildinglevel2').setScale(1);
        this.add.image(630*3, 310, 'buildinglevel2').setScale(1);
        this.add.image(630*5, 310, 'buildinglevel2').setScale(1);

        Gr = this.add.image(0, 615, 'ground').setOrigin(0, 0);
        Gr = this.add.image(1400, 615, 'ground').setOrigin(0, 0);
        Gr = this.add.image(3000, 615, 'ground').setOrigin(0, 0);

        // إضافة الكتل الثابتة
        this.add.image(350, 500, 'block2').setScale(0.7);
        this.add.image(700, 300, 'block2').setScale(0.7);
        this.add.image(1100, 500, 'block2').setScale(0.7);
        this.add.image(1700, 350, 'block2').setScale(0.7);
        this.add.image(2100, 150, 'block2').setScale(0.7);
        this.add.image(2400, 350, 'block2').setScale(0.7);
        this.add.image(2800, 500, 'block2').setScale(0.7);
        this.add.image(3225, 300, 'block2').setScale(0.7);
        this.add.image(3700, 500, 'block2').setScale(0.7);

        // إضافة كتلتين متحركتين
        movingBlock1 = this.physics.add.sprite(1200, 200, 'movingBlock2').setScale(0.7);
        movingBlock2 = this.physics.add.sprite(2500, 400, 'movingBlock2').setScale(0.7);
        
        // حركة الكتلة المتحركة الأولى بين 1200 و 1700 على المحور X
        this.tweens.add({
            targets: movingBlock1,
            x: 1700,
            duration: 3000,
            yoyo: true,
            repeat: -1
        });
        
        // حركة الكتلة المتحركة الثانية بين 2500 و 3000 على المحور X
        this.tweens.add({
            targets: movingBlock2,
            x: 3000,
            duration: 4000,
            yoyo: true,
            repeat: -1
        });

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
        
        const healthSprites = ['Health1', 'Health2', 'Health3', 'Health4', 'Health5', 'Health6'];
        H1 = this.add.sprite(150, 50, healthSprites[Math.min(hitfires, 5)]);
        H1.setScrollFactor(0, 0);

        M1 = this.add.sprite(1100, 50, 'Money01');
        bgl.setScrollFactor(0, 0);
        cloud2.setScrollFactor(0, 0);
        H1.setScrollFactor(0, 0);
        M1.setScrollFactor(0, 0);
        Back.setScrollFactor(0, 0);

        const mummyAnimation = this.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNumbers('fire'),
            frameRate: 24
        });
        
        // النار العدو 
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

        // نهاية المرحلة

        // علامات الاسئلة
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

        // المنصات الثابتة
        platforms = this.physics.add.staticGroup();
        Tre2 = this.physics.add.image(3200, 20, 'treasure2').setScale(1);
        Tre2.setVisible(false);
        
        // Disable physics interaction with the world
        Tre2.body.setEnable(false);
        // الأرضية
        platforms.create(0, 615, 'groundcollider').setOrigin(0, 0).refreshBody();
        platforms.create(1400, 615, 'groundcollider').setOrigin(0, 0).refreshBody();
        platforms.create(3000, 615, 'groundcollider').setOrigin(0, 0).refreshBody();
        platforms.create(4700, 615, 'groundcollider').setOrigin(0, 0).refreshBody();

        // الكتل الثابتة
        platforms.create(350, 500, 'blockcollider').setScale(0.7).refreshBody();
        platforms.create(700, 300, 'blockcollider').setScale(0.7).refreshBody();
        platforms.create(1100, 500, 'blockcollider').setScale(0.7).refreshBody();
        platforms.create(1700, 350, 'blockcollider').setScale(0.7).refreshBody();
        platforms.create(2100, 150, 'blockcollider').setScale(0.7).refreshBody();
        platforms.create(2400, 350, 'blockcollider').setScale(0.7).refreshBody();
        platforms.create(2800, 500, 'blockcollider').setScale(0.7).refreshBody();
        platforms.create(3225, 300, 'blockcollider').setScale(0.7).refreshBody();
        platforms.create(3700, 500, 'blockcollider').setScale(0.7).refreshBody();

        // تصادم الكتل المتحركة مع المنصات
        this.physics.add.collider(movingBlock1, platforms);
        this.physics.add.collider(movingBlock2, platforms);

        // تصادمات أخرى
        this.physics.add.collider(Moneys, platforms);
        this.physics.add.collider(coins, platforms);
        this.physics.add.collider(f1, platforms);
        this.physics.add.collider(f2, platforms);
        this.physics.add.collider(f3, platforms);
        this.physics.add.collider(f4, platforms);
        this.physics.add.collider(Gf1, platforms);
        this.physics.add.collider(Gf2, platforms);
        this.physics.add.collider(Gf3, platforms);
        this.physics.add.collider(Gf4, platforms);
        this.physics.add.collider(Gf5, platforms);
        this.physics.add.collider(Tre2, platforms);

      

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

        // تصادم اللاعب مع الكتل المتحركة
        this.physics.add.collider(charOne, movingBlock1);
        this.physics.add.collider(charOne, movingBlock2);

        this.physics.add.overlap(charOne, Tre2, TreHit2, null, this);

        function TreHit2(charOne, TreHit2) {
            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.scene.pause('Game');
                    this.scene.start('Win', { 
                        playerScore: score, 
                        Hitfires: hitfires, 
                        HitMoneys: hitMoneys,
                        currentLevel: 'Level2'
                    });
                },
                loop: false
            });
        }

        this.physics.add.overlap(charOne, Gf1, faildown1, null, this);
        function faildown1(charOne, Gf1) {
            charOne.y = -2000;
            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.scene.start('GameOver', { playerScore: score, Hitfires: hitfires, HitMoneys: hitMoneys });
                },
                loop: false
            });
        }
        
        this.physics.add.overlap(charOne, Gf2, faildown2, null, this);
        function faildown2(charOne, Gf2) {
            charOne.y = -2000;
            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.scene.start('GameOver', { playerScore: score, Hitfires: hitfires, HitMoneys: hitMoneys });
                },
                loop: false
            });
        }

        this.physics.add.overlap(charOne, Gf3, faildown3, null, this);
        function faildown3(charOne, Gf3) {
            charOne.y = -2000;
            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.scene.start('GameOver', { playerScore: score, Hitfires: hitfires, HitMoneys: hitMoneys });
                },
                loop: false
            });
        }

        this.physics.add.overlap(charOne, Gf4, faildown4, null, this);
        function faildown4(charOne, Gf4) {
            charOne.y = -2000;
            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.scene.start('GameOver', { playerScore: score, Hitfires: hitfires, HitMoneys: hitMoneys });
                },
                loop: false
            });
        }

        this.physics.add.overlap(charOne, Gf5, faildown5, null, this);
        function faildown5(charOne, Gf5) {
            charOne.y = -2000;
            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.scene.start('GameOver', { playerScore: score, Hitfires: hitfires, HitMoneys: hitMoneys });
                },
                loop: false
            });
        }
        
        this.physics.add.collider(charOne, platforms);
        
        this.physics.add.overlap(charOne, Moneys, (charOne, money) => {
            if (money.visible) {
                collectMoneys.call(this, charOne, money);
                var MoneybubblePop = this.sound.add('MoneybubblePop');
                MoneybubblePop.play({ loop: false});
            }
        }, null, this);

        this.physics.add.overlap(charOne, coins, collectCoin2, null, this);
        
       
        
        this.physics.add.overlap(charOne, f1, () => handleHit.call(this, charOne, f1, 'Health2', hitfires), null, this);
        this.physics.add.overlap(charOne, f2, () => handleHit.call(this, charOne, f2, 'Health2', hitfires), null, this);
        this.physics.add.overlap(charOne, f3, () => handleHit.call(this, charOne, f3, 'Health2', hitfires), null, this);
        this.physics.add.overlap(charOne, f4, () => handleHit.call(this, charOne, f4, 'Health2', hitfires), null, this);
        scoreText = this.add.text(
            640,
            30,
            this.levelConfig.name,
            {
                fontFamily: 'CustomFont',
                fontSize: 38,
                color: "#ffff00",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);
        scoreText.setScrollFactor(0, 0);
        
        scoreText = this.add.text(
            640,
            85,
            'عدد النقاط: ' + score,
            {
                fontFamily: 'CustomFont',
                fontSize: 30,
                color: "#ff0000",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);
        scoreText.setScrollFactor(0, 0);
        function collectCoin2(charOne, coin) {
            console.log('hitMoneys',hitMoneys)

                              var coinclick = this.sound.add('coinclick');
                            coinclick.play({ loop: false});
            coin.disableBody(true, true);

            score += 10;
            score2 += 1;

            const moneyChildren = Moneys.getChildren();
            moneyChildren.forEach(child => child.setVisible(false));

            if (score2 >= 5 && score2 < 10) {
                moneyChildren[0].setVisible(true);
                moneyChildren[0].x = charOne.x;
                moneyChildren[0].y = charOne.y - 600;
            } else if (score2 >= 10 && score2 < 15) {
                moneyChildren[1].setVisible(true);
                moneyChildren[1].x = charOne.x;
                moneyChildren[1].y = charOne.y - 600;
            } else if (score2 >= 15 && score2 < 20) {
                moneyChildren[2].setVisible(true);
                moneyChildren[2].x = charOne.x;
                moneyChildren[2].y = charOne.y - 600;
            } else if (score2 >= 20 && score2 < 25) {
                moneyChildren[3].setVisible(true);
                moneyChildren[3].x = charOne.x;
                moneyChildren[3].y = charOne.y - 600;
            } else if (score2 >= 25) {
                moneyChildren[4].setVisible(true);
                moneyChildren[4].x = charOne.x;
                moneyChildren[4].y = charOne.y - 600;


                this.time.delayedCall(5000, () => {
                    hitMoneys = 5;

                }, [], this);

            }

            if (hitMoneys >= 5) {  // تغيير من score2 >= 25 إلى hitMoneys >= 5
                Tre2.setVisible(true);
                Tre2.body.setEnable(true);

            }

            scoreText.setText('عدد النقاط: ' + score);

            if (coins.countActive(true) === 0) {
                coins.children.iterate(function (child) {
                    child.enableBody(true, child.x, 0, true, true);
                });

                var x = (charOne.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            }
        }


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