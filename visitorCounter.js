// visitorCounter.js - Client-side component with centered positioning

class VisitorCounter {
    constructor(scene) {
        this.scene = scene;
        this.dailyCount = 0;
        this.monthlyCount = 0;
        this.totalCount = 0;
        this.fetchCounts();
    }

    async fetchCounts() {
        try {
            // Send request to server to register visit and get updated counts
            const response = await fetch('visitor-counter.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            if (!response.ok) {
                throw new Error('Network response error');
            }
            
            const data = await response.json();
            this.dailyCount = data.dailyCount;
            this.monthlyCount = data.monthlyCount;
            this.totalCount = data.totalCount;
            
            // Update the display if it exists
            if (this.counterText) {
                this.updateCounterDisplay();
            }
            
        } catch (error) {
            console.error('Error fetching visitor counts:', error);
            // Set fallback values
            this.dailyCount = 0;
            this.monthlyCount = 0;
            this.totalCount = 0;
        }
    }

    createCounterDisplay(x, y) {
        // Create text objects to display the counts
        const style = {
            fontFamily: 'CustomFont',
            fontSize: '24px',
            color: '#ffffff',
            align: 'center',
            rtl: true // Right-to-left text direction for Arabic
        };

        // Format the text with the requested spacing (10 characters between each count)
        const spacer = '          '; // 10 spaces
        const formattedText = `الزوار اليومي: ${this.dailyCount}${spacer}الزوار الشهري: ${this.monthlyCount}${spacer}الزوار الكلي: ${this.totalCount}`;

        // Create the text object in the scene
        const counterText = this.scene.add.text(x, y, formattedText, style);
        
        // Center the text horizontally
        counterText.setOrigin(0.5, 0); // Center horizontally, align to top vertically
        
        // Store reference for later updates
        this.counterText = counterText;
        
        // Make it fixed to the camera
        if (this.scene.cameras && this.scene.cameras.main) {
            counterText.setScrollFactor(0);
        }
        
        return counterText;
    }
    
    updateCounterDisplay() {
        if (this.counterText) {
            const spacer = '          '; // 10 spaces
            this.counterText.setText(`الزوار اليومي: ${this.dailyCount}${spacer}الزوار الشهري: ${this.monthlyCount}${spacer}الزوار الكلي: ${this.totalCount}`);
        }
    }
}

// Function to add visitor counter to any scene
function addVisitorCounterToScene(scene, x, y) {
    const counter = new VisitorCounter(scene);
    return counter.createCounterDisplay(x, y);
}