var finalScore
var finalHitfires
var finalHitMoneys
var BackButton = 'assets/imagesnew/back_button.png';
var coin ='assets/imagesnew/coin.png';
var heart ='assets/imagesnew/Hearts_Singoli.png';
var Money ='assets/imagesnew/Money_Singoli.png';
var GameOver = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function () {

        Phaser.Scene.call(this, { "key": "GameOver" });
    },
    init: function (data) {
        console.log('init', data);
        this.finalScore = data.playerScore;
        this.finalHitfires= data.Hitfires;
        hitMoneys = 0;
        

    }, preload: function () {
        this.load.image('bg0', 'Asset/images/win.png');
        this.load.image('pic1', 'Asset/images/win.png');
        this.load.image('BackButton', BackButton);
        this.load.image('coin', coin);
        this.load.image('heart', heart);
        this.load.image('Money', Money);

     },
    create: function () {

    // إيقاف جميع الأصوات (بما في ذلك bgsound)
    this.sound.stopAll();




        var levelFail = this.sound.add('levelFail');
        levelFail.play({ loop: false});


        this.pic1 = this.add.image(600, 300, "pic1").setScale(1.5)
        var r4 = this.add.graphics({ fillStyle: { color: 0x000000, alpha: 0.7 } });
        r4.fillRoundedRect(600 - 250, 300 - 200, 600, 400, 50);
    


    
        this.tweens.add({
    
            targets: r4,
            scaleX: 1,
            scaleY: 1,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
    
        });


        this.tweens.add({

            targets: r4,
            alpha: 1,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
    
        });

     

       

        this.coin = this.add.image(820, 150, "coin").setOrigin(0,0).setScale(2)
        this.heart = this.add.image(820, 250, "heart").setOrigin(0,0).setScale(1)

      
        var scoreText = this.add.text(
            650,
            180,
            'عدد النقاط: '+  this.finalScore,
            { fontFamily: 'CustomFont',
                fontSize: 50,
                color: "#ffff00",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);
              
        var scoreText = this.add.text(
            650,
            280,
            'الحياة: '+  (5-this.finalHitfires),
            { fontFamily: 'CustomFont',
                fontSize: 50,
                color: "#ffff00",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);

        

        var text0 = this.add.text(
            650,
            50,
            "انتهت اللعبة",
            { fontFamily: 'CustomFont',
                fontSize: 50,
                color: "#ffffff",
                fontStyle: "bold"
            }
        ).setOrigin(0.5); 
        
        

        Back = this.add.image(150, 670, 'BackButton').setInteractive()

        Back.on('pointerdown', function (pointer) {

    //this.sound.stopAll(); // إيقاف الأصوات

            this.scene.scene.start('Menu');


        })



    },
    update: function () { }
});