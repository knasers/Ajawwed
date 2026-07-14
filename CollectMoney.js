function collectMoneys(charOne, Money) {
    charOne.disableBody(true, true);

    // Show the question border and trigger the random question
    this.questionborder.setVisible(true);

    // Reset and show the timer when showing the question
    if (this.timerText) {
        this.timerText.setVisible(true);
    }

    // Call showRandomQuestion to display the question and start the timer
    showRandomQuestion.call(this);


    this.questionborder.setScrollFactor(0, 0);

    // Optionally hide it after a delay (for example, 2 seconds)

    hitMoneys += 1

    if (hitMoneys == 1) {
        M1.destroy()
        Money.disableBody(true, true);
        M2 = this.add.sprite(1100, 50, 'Money02');
        M2.setScrollFactor(0, 0);
    }

    if (hitMoneys == 2) {
        M2.destroy()
        Money.disableBody(true, true);
        M3 = this.add.sprite(1100, 50, 'Money03');
        M3.setScrollFactor(0, 0);
    }

    if (hitMoneys == 3) {
        M3.destroy()
        Money.disableBody(true, true);
        M4 = this.add.sprite(1100, 50, 'Money04');
        M4.setScrollFactor(0, 0);
    }
    if (hitMoneys == 4) {
        M4.destroy()
        Money.disableBody(true, true);
        M5 = this.add.sprite(1100, 50, 'Money05');
        M5.setScrollFactor(0, 0);
    }

    if (hitMoneys == 5) {
        M5.destroy()
        Money.disableBody(true, true);
        M6 = this.add.sprite(1100, 50, 'Money06');
        M6.setScrollFactor(0, 0);
    }
}