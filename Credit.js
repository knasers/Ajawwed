var BackButton = 'assets/imagesnew/back_button.png';

var Credit = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function () {
        Phaser.Scene.call(this, { key: 'Credit' });
    },
    init: function (data) {
        // تهيئة البيانات إذا لزم الأمر
    },
    preload: function () {
        // تحميل الصور
        this.load.image('about', 'Asset/images/about.png');
        this.load.image('BackButton', BackButton);
    },
    create: function () {

      //  bgsound.stop();

        // إضافة الصورة about في المركز
        this.about = this.add.image(600, 300, 'about');
        var text0 = this.add.text(
            650,
            50,
            "عن اللعبة",
            { fontFamily: 'CustomFont',
                fontSize: 50,
                color: "#000000",
                fontStyle: "bold"
            }
        ).setOrigin(0.5); 
        // إنشاء كائن رسومات
        var r4 = this.add.graphics();

        // تعيين نمط التعبئة مع اللون والشفافية
        r4.fillStyle(0x000000, 0.7);

        // تحديد عرض وارتفاع المستطيل
        var r4Width = 900;  // عرض المستطيل الجديد
        var r4Height = 500; // ارتفاع المستطيل

        // توسيط المستطيل على الشاشة
        var xPosition = 600 - r4Width / 2; // الحساب لتوسيط المستطيل أفقيًا
        var yPosition = 350 - r4Height / 2; // الحساب لتوسيط المستطيل رأسيًا

        // رسم المستطيل ذو الزوايا المستديرة في الموقع المحسوب
        r4.fillRoundedRect(xPosition, yPosition, r4Width, r4Height, 50);

        // النص الذي سيظهر حرفًا حرفًا
        var gameDescriptionText = this.add.text(
            600,  // الموضع الأفقي (منتصف العرض)
            350,  // الموضع الرأسي (منتصف المستطيل)
            '',
            { fontFamily: 'CustomFont', fontSize: 30, color: '#FFFF00', wordWrap: { width: 800 }, align: 'center' }
        ).setOrigin(0.5);  // محاذاة النص إلى المركز

        // النص الجديد الذي سيتم عرضه
        var fullText = 'لعبة قيم في السعودية للشباب من سن 12 سنة هي مبادرة تعليمية ترفيهية تهدف إلى غرس القيم الأخلاقية الأساسية في نفوس الشباب بطريقة ممتعة وتفاعلية. ترتكز اللعبة على أربعة قيم رئيسية: الصدق، الانضباط، الانتماء، والتسامح، وتُقدَّم في إطار مغامرات شيقة تدمج بين التعلم واللعب. تهدف المبادرة إلى تحفيز الشباب على تطبيق هذه القيم في حياتهم اليومية، ليكونوا نماذج إيجابية في مجتمعاتهم. كما تسعى اللعبة إلى تعزيز روح التعاون، وتعليم الشباب كيف يكونون مسؤولين ومنتمين لوطنهم. من خلال هذه التجربة، يتعلمون أهمية قول الحقيقة، الالتزام بالقوانين، حب الوطن، والقدرة على التسامح مع الآخرين. وتدعو المبادرة الأسر والمدارس إلى دعم جيل الشباب في تنفيذ مشاريع واقعية صغيرة تعتمد على هذه القيم. وتُعدّ "أجاويد 3" امتدادًا لمسيرة ترسيخ الأخلاق وتعزيز التعايش المجتمعي، مع التركيز على الإبداع والمشاركة.';

        // الدالة لعرض النص حرفًا حرفًا
        var i = 0;
        var displayText = this.time.addEvent({
            delay: 50, // تأخير بين كل حرف وآخر (بالمللي ثانية)
            callback: function () {
                gameDescriptionText.text += fullText[i];
                i++;
                if (i === fullText.length) {
                    displayText.remove();
                }
            },
            loop: true
        });

        // إضافة زر العودة
        var Back = this.add.image(150, 670, 'BackButton').setInteractive();

        // تعريف وظيفة الزر عند الضغط
        Back.on('pointerdown', function (pointer) {

            this.scene.start('Menu');
        }, this);
    },
    update: function () {
        // تحديث الكائنات إذا لزم الأمر
    }
});
