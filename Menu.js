var Menu = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function () {
        Phaser.Scene.call(this, { "key": "Menu" });
    },
    init: function () { },
    preload: function () {
        
        // تحميل الصور التي سيتم استخدامها في المشهد
        this.load.image("bg", "Asset/images/bg.png");
        this.load.image("logo", "Asset/images/logo.png");
        this.load.image("boy", "Asset/images/char1.png");
        this.load.image("girl", "Asset/images/char2.png");
        this.load.image("title", "Asset/images/title.png");
    },
    create: function () {
        // إضافة الخلفية والصور إلى المشهد
        this.bg = this.add.image(640, 350, "bg");  // إضافة الخلفية في المنتصف
        this.logo = this.add.image(640, 290, "logo").setScale(0.5);  // إضافة الشعار في المنتصف وتحديد حجمه (50% من الحجم الأصلي)
        this.boy = this.add.image(250, 350, "boy");  // إضافة شخصية الولد
        this.girl = this.add.image(1050, 350, "girl");  // إضافة شخصية البنت
        this.title = this.add.image(640, 650, "title");  // إضافة الخلفية في المنتصف

        // تعيين alpha لل title ليكون 0 (شعار غير مرئي في البداية)
        this.title.setAlpha(0);

        // جعل صورة الولد قابلة للتفاعل
        this.boy.setInteractive();
        this.girl.setInteractive();
        this.title.setInteractive(); // Make title image interactive

        // إضافة حدث عند الضغط على صورة الولد
        this.boy.on('pointerdown', function () {
            // Start fading out the current scene
            this.cameras.main.fadeOut(500); // 500ms fade-out duration
        
            // After the fade-out is complete, start the new scene
            this.cameras.main.on('camerafadeoutcomplete', function () {
                this.scene.start("Game");
            }, this);
        }, this);
  // إضافة حدث عند الضغط على صورة الولد
  this.girl.on('pointerdown', function () {
    // Start fading out the current scene
    this.cameras.main.fadeOut(1000); // 500ms fade-out duration

    // After the fade-out is complete, start the new scene
    this.cameras.main.on('camerafadeoutcomplete', function () {
        this.scene.start("Game");
    }, this);
}, this);

        // Add event listener for the title to go to the instructions scene
        this.title.on('pointerdown', function () {
            this.scene.start("Credit"); // Transition to the "Instructions" scene
        }, this);

        // إنشاء التويين لتحريك شخصية الولد
        this.tweens.add({
            targets: this.boy,
            y: "-=30",  // تحريك الولد للأعلى بمقدار 30 بكسل
            duration: 500,  // الوقت الذي يستغرقه التحريك (500 ملي ثانية)
            yoyo: true,  // العودة إلى الوضع الأصلي بعد التحريك
            repeat: -1,  // التكرار إلى ما لا نهاية
            ease: "Sine.easeInOut"  // استخدام نوع من التأثيرات لجعل التحريك سلس
        });

        // إنشاء التويين لتحريك شخصية البنت
        this.tweens.add({
            targets: this.girl,
            y: "+=30",  // تحريك البنت للأسفل بمقدار 30 بكسل
            duration: 500,  // الوقت الذي يستغرقه التحريك (500 ملي ثانية)
            yoyo: true,  // العودة إلى الوضع الأصلي بعد التحريك
            repeat: -1,  // التكرار إلى ما لا نهاية
            ease: "Sine.easeInOut"  // استخدام نوع من التأثيرات لجعل التحريك سلس
        });

        // تكبير وتصغير الشعار كل 10 ثواني
        this.tweens.add({
            targets: this.logo,
            scale: 0.2,  // تكبير الشعار ليصبح 15% من حجمه الأصلي
            duration: 5000,  // مدة التكبير (5 ثواني)
            yoyo: true,  // العودة إلى الحجم الأصلي بعد التكبير
            repeat: -1,  // التكرار إلى ما لا نهاية
            repeatDelay: 5000,  // التأخير بين كل مرة من التكرار (5 ثواني من التكرار)
            ease: "Sine.easeInOut"  // استخدام تأثير سلس لجعل التكبير والتصغير ناعم
        });

        // إضافة توين لعنصر title لجعل الشعار يظهر تدريجياً
        this.tweens.add({
            targets: this.title,
            alpha: 1,  // جعل الشعار يظهر تدريجياً
            duration: 2000,  // مدة التلاشي (2 ثانية)
            ease: "Sine.easeInOut"  // استخدام تأثير سلس لجعل التلاشي ناعم
        });



    //    this.visitorCounter = addVisitorCounterToScene(this, 600, 20);
    },
    update: function () {
        // منطق التحديث (إذا كان هناك حاجة له)
    }
});
