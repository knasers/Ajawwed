var finalScore;
var finalHitfires;
var finalHitMoneys;
var BackButton = 'assets/imagesnew/back_button.png';
var NextButton = 'Asset/images/next.png';

var coin = 'assets/imagesnew/coin.png';
var heart = 'assets/imagesnew/Hearts_Singoli.png';
var Money = 'assets/imagesnew/Money_Singoli.png';

var Win = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function () {
        Phaser.Scene.call(this, { "key": "Win" });
    },
    init: function (data) {
        console.log('init', data);
        this.currentLevel = data.currentLevel;
        this.finalScore = data.playerScore;
        this.finalHitfires = data.Hitfires;

        hitMoneys = 0;



    },
    preload: function () {
        this.load.image('pic1', 'Asset/images/win.png');
        this.load.image('BackButton', BackButton);
        this.load.image('NextButton', NextButton);
        this.load.image('coin', coin);
        this.load.image('heart', heart);
        this.load.image('Money', Money);
    },
    create: function () {

        this.sound.stopAll();


        var levelWin = this.sound.add('levelWin');
        levelWin.play({ loop: false});
        
        this.pic1 = this.add.image(640, 350, "pic1");

        // رسم المربع ذو الزوايا الدائرية
        var r4Height = 400; // ارتفاع المربع الافتراضي
        if (this.currentLevel === 'Level4') {
            r4Height = 600; // زيادة الارتفاع عند الوصول للمستوى الرابع
        }

        var r4 = this.add.graphics({ fillStyle: { color: 0x000000, alpha: 0.7 } });
        r4.fillRoundedRect(600 - 250, 300 - 200, 600, r4Height, 50); // تعديل الارتفاع هنا

        // إضافة تأثيرات على المربع
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

        // إضافة الصور
        this.coin = this.add.image(820, 150, "coin").setOrigin(0, 0).setScale(2);
        this.heart = this.add.image(820, 250, "heart").setOrigin(0, 0).setScale(1);
      //  this.Money = this.add.image(820, 350, "Money").setOrigin(0, 0).setScale(1);

        // إضافة النصوص الخاصة بالنتيجة
        var scoreText = this.add.text(
            650,
            180,
            'النقاط: ' + this.finalScore,
            { fontFamily: 'CustomFont', fontSize: 50, color: "#ffff00", fontStyle: "bold" }
        ).setOrigin(0.5);

        var scoreText = this.add.text(
            650,
            280,
            'الحياة: ' + (5 - this.finalHitfires),
            { fontFamily: 'CustomFont', fontSize: 50, color: "#ffff00", fontStyle: "bold" }
        ).setOrigin(0.5);

      /*  var scoreText = this.add.text(
            650,
            380,
            'الاسئلة: ' + (3 - this.finalHitMoneys),
            { fontFamily: 'CustomFont', fontSize: 50, color: "#ffff00", fontStyle: "bold" }
        ).setOrigin(0.5);*/

        let nextLevelMessage = "";
        let congratulatoryMessage = "";

        if (this.currentLevel === 'Level1') {
            nextLevelMessage = " .. لقد أكملت المستوى الاول ";
        } else if (this.currentLevel === 'Level2') {
            nextLevelMessage = " .. لقد أكملت المستوى الثاني ";
        } else if (this.currentLevel === 'Level3') {
            nextLevelMessage = " .. لقد أكملت المستوى الثالث ";
        } else if (this.currentLevel === 'Level4') {
// إخفاء الزر بعد 1 ثانية
this.time.addEvent({
    delay: 100, // تأخير 1 ثانية (1000 ميلي ثانية)
    callback: () => {
        NextButton.setVisible(false); // إخفاء الزر
    },
    loop: false // عدم تكرار الحدث
});


            nextLevelMessage = " .. لقد أكملت المستوى الرابع ";
            congratulatoryMessage = "مبروك! لقد أتممت جميع المستويات! 🎉\n\nهنيئًا لك على اجتياز التحديات\nلقد أثبت أنك قادر على اتخاذ القرارات الصحيحة وتجسيد القيم في كل خطوة، ولهذا تم منحك 4 ساعات تطوعية تقديرًا لجهودك";
        }

        var text0 = this.add.text(
            650,
            50,
            nextLevelMessage,
            { fontFamily: 'CustomFont', fontSize: 40, color: "#ffffff", fontStyle: "bold" }
        ).setOrigin(0.5);

        // إضافة الرسالة التهنئة حرف بحرف
        if (congratulatoryMessage) {
            var i = 0;
            var fullText = congratulatoryMessage;

            // إنشاء النص المبدئي فارغ
            var congratsText = this.add.text(
                650,  // تحديد الموضع الأفقي في المنتصف
                550,  // تحديد الموضع الرأسي أسفل scoreText
                '',   // النص المبدئي فارغ
                { 
                    fontFamily: 'CustomFont', 
                    fontSize: 30, 
                    color: "#ffffff", 
                    fontStyle: "bold", 
                    wordWrap: { 
                        width: 500,  // عرض النص داخل المربع
                        useAdvancedWrap: true 
                    },
                    align: 'center' // محاذاة النص إلى المنتصف
                }
            ).setOrigin(0.5);  // تحديد الأصل في منتصف النص

            // إضافة الحدث لإظهار النص حرف بحرف
            this.time.addEvent({
                delay: 50,  // تأخير بين كل حرف وآخر (بالمللي ثانية)
                callback: () => {
                    congratsText.setText(fullText.substring(0, i)); // عرض النص حتى الحرف i
                    i++;
                    if (i > fullText.length) {
                        this.time.removeAllEvents();  // إيقاف الحدث بعد عرض جميع الحروف
                    }
                },
                loop: true  // تكرار الحدث حتى يتم عرض جميع الحروف
            });
        }

        // إضافة زر العودة
        Back = this.add.image(150, 670, 'BackButton').setInteractive();
        Back.on('pointerdown', function (pointer) {

            this.sound.stopAll(); // إيقاف الأصوات
            this.scene.scene.start('Menu');
        });

        // إضافة زر التالي
        NextButton = this.add.image(1000, 670, 'NextButton').setInteractive();

        NextButton.on('pointerdown', () => {

            this.sound.stopAll(); // إيقاف أصوات المشهد الحالي

            let nextLevelConfig;
            if (this.currentLevel === 'Level1') {
                nextLevelConfig = {
                    key: 'Level2',
                    file: 'data/level2.json',
                    name: 'المستوى الثاني : الانتماء'
                };
            } else if (this.currentLevel === 'Level2') {
                nextLevelConfig = {
                    key: 'Level3',
                    file: 'data/level3.json',
                    name: 'المستوى الثالث: الانضباط'
                };
            } else if (this.currentLevel === 'Level3') {
                nextLevelConfig = {
                    key: 'Level4',
                    file: 'data/level4.json',
                    name: 'المستوى الرابع: التسامح'
                };
            }

            if (nextLevelConfig) {
                this.scene.start(nextLevelConfig.key, {
                    levelFile: nextLevelConfig.file,
                    levelName: nextLevelConfig.name,
                    playerScore: this.finalScore,
                    Hitfires: this.finalHitfires,
                    HitMoneys: this.finalHitMoneys
                });
            }
        });
    },
    update: function () { }
});
