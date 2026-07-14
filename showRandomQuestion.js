let timerInterval = null;
var tries = 0;
var answered = false;
var blinkInterval = null; // متغير جديد للتحكم في مؤقت الوميض

function showRandomQuestion() {
    // إلغاء أي مؤقت سابق
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    // إلغاء أي وميض سابق
    if (blinkInterval) {
        clearInterval(blinkInterval);
        blinkInterval = null;
    }

    const questionsData = this.cache.json.get('questionsData');
    const randomIndex = Phaser.Math.Between(0, questionsData.questions.length - 1);
    const currentQuestion = questionsData.questions[randomIndex];

    const shuffledAnswers = Phaser.Utils.Array.Shuffle([...currentQuestion.answers]);

    function splitTextIntoLines(text, wordsPerLine) {
        const words = text.split(' ');
        const lines = [];
        for (let i = 0; i < words.length; i += wordsPerLine) {
            lines.push(words.slice(i, i + wordsPerLine).join(' '));
        }
        return lines;
    }

    const questionLines = splitTextIntoLines(currentQuestion.question, 6);

    if (!this.questionText || this.questionText.scene !== this) {
        if (this.questionText) {
            this.questionText.destroy();
        }
        this.questionText = this.add.text(640, 290, questionLines.join('\n'), {
            fontFamily: 'CustomFont',
            fontSize: 24,
            color: '#98432E',
            fontStyle: 'bold',
            align: 'center',
            direction: 'rtl',
            wordWrap: { width: 500 }
        }).setOrigin(0.5, 0.5).setScrollFactor(0, 0);
    } else {
        this.questionText.setText(questionLines.join('\n')).setVisible(true);
    }

    if (this.answerButtons) {
        this.answerButtons.forEach(button => button.destroy());
    }
    this.answerButtons = [];

    const buttonSpacing = 80;
    const totalAnswers = shuffledAnswers.length;
    const centerX = 640;
    const centerY = 360;

    shuffledAnswers.forEach((answer, index) => {
        const answerLines = splitTextIntoLines(answer, 4);
        let x = 0;
        let y = centerY + 40;

        if (totalAnswers === 2) {
            x = centerX + (index === 0 ? -buttonSpacing / 2 : buttonSpacing / 2);
        } else if (totalAnswers === 4) {
            if (index === 0 || index === 2) {
                x = centerX - 120;
            } else if (index === 1 || index === 3) {
                x = centerX + 120;
            }

            if (index === 2 || index === 3) {
                y += 70;
            }
        }

        const button = this.add.text(x, y, answerLines.join('\n'), {
            fontFamily: 'CustomFont',
            fontSize: '18px',
            color: '#98432E',
            fontStyle: 'bold',
            backgroundColor: '#FFFFCC',
            padding: { x: 10, y: 5 },
            align: 'center',
            direction: 'rtl'
        })
            .setOrigin(0.5, 0.5)
            .setInteractive()
            .setScrollFactor(0, 0);

        button.on('pointerover', () => {
            button.setStyle({
                backgroundColor: '#98432E',
                color: '#FFFFCC'
            });
        });

        button.on('pointerout', () => {
            button.setStyle({
                backgroundColor: '#FFFFCC',
                color: '#98432E'
            });
        });

        button.on('pointerdown', () => handleAnswer.call(this, answer, currentQuestion.answers[currentQuestion.correct], button));
        this.answerButtons.push(button);
    });

    if (!this.timerText || this.timerText.scene !== this) {
        if (this.timerText) {
            this.timerText.destroy();
        }
        this.timerText = this.add.text(640, 130, '' + remainingTime, {
            fontFamily: 'CustomFont',
            fontSize: 20,
            color: '#ffffff',
            fontStyle: 'bold',
            align: 'center',
            direction: 'rtl'
        }).setOrigin(0.5, 0.5).setScrollFactor(0, 0);
    } else {
        this.timerText.setText('' + remainingTime).setVisible(true);
    }

    remainingTime = 20;
    answered = false;
    tries = 0;
    this.timerText.setText('' + remainingTime);

    timerInterval = setInterval(() => {
        remainingTime--;
        this.timerText.setText('' + remainingTime);

        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            cleanupQuestionUI.call(this);
        }
    }, 1000);
}

function handleAnswer(selectedAnswer, correctAnswer, button) {
    if (answered) {
        return;
    }

    if (selectedAnswer === correctAnswer) {
        answered = true;
        console.log("إجابة صحيحة!");
        var rightAnswer = this.sound.add('rightAnswer');
        rightAnswer.play({ loop: false });

        // إخفاء الأزرار الأخرى
        this.answerButtons.forEach(btn => {
            if (btn !== button) {
                btn.setVisible(false);
            }
        });

        // تكبير الزر وتحريكه
        button.setScale(1.2);
        button.setPosition(640, 450);
        button.setStyle({
            fontSize: '36px',
            color: '#ffffff',
        });

        // تأثير وميض لمدة 3 ثوان
        const colors = ['#00FF00', '#00CC00', '#009900', '#006600', '#003300'];
        let colorIndex = 0;
        
        blinkInterval = setInterval(() => {
            button.setBackgroundColor(colors[colorIndex]);
            colorIndex = (colorIndex + 1) % colors.length;
        }, 200);

        // زيادة النقاط
        score += 10;
        if (scoreText) {
            scoreText.setText('عدد النقاط: ' + score);
        }

        // إيقاف الوميض بعد 3 ثوان وتنظيف الواجهة
        this.time.delayedCall(3000, () => {
            if (blinkInterval) {
                clearInterval(blinkInterval);
                blinkInterval = null;
            }
            cleanupQuestionUI.call(this);
        });

        tries = 0;
    } else {
        console.log("إجابة خاطئة!");
        var wrongAnswer = this.sound.add('wrongAnswer');
        wrongAnswer.play({ loop: false });
        button.setBackgroundColor('#f00');

        tries++;
        if (tries >= 3) {
            this.time.delayedCall(1000, () => {
                cleanupQuestionUI.call(this);
            });
        }
    }
}

function cleanupQuestionUI() {
    if (this.questionText) {
        this.questionText.setVisible(false);
    }
    
    if (this.answerButtons) {
        this.answerButtons.forEach(button => button.destroy());
        this.answerButtons = [];
    }
    
    if (this.timerText) {
        this.timerText.setVisible(false);
    }
    
    if (this.questionborder) {
        this.questionborder.setVisible(false);
    }
    
    if (charOne) {
        charOne.setActive(true);
        charOne.setVisible(true);
        if (charOne.body) {
            charOne.body.enable = true;
        }
    }
    
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    if (blinkInterval) {
        clearInterval(blinkInterval);
        blinkInterval = null;
    }
    
    remainingTime = 20;
}