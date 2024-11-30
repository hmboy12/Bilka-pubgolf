document.addEventListener("DOMContentLoaded", () => {
    // Initiale navne
    const names = ["Alberte", "Florian", "Jeanne", "Jeppe", "Maria", "Noah", "Serkan", "Victoria", "Julie", "Frederik", "Viola"];
    const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"];
    const canvas = document.getElementById("wheelCanvas");
    const ctx = canvas.getContext("2d");
    const spinButton = document.getElementById("spinButton");
    const resultDiv = document.getElementById("result");
    const confettiContainer = document.getElementById("confetti-container");
    const popup = document.getElementById("popup");

    let spinning = false;

    // Opdater canvas størrelse afhængigt af skærmstørrelse
    function updateCanvasSize() {
        const container = document.querySelector('.wheel-container');
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    }

    // Tegn lykkehjulet
    function drawWheel() {
        if (names.length === 0) return;

        const radius = canvas.width / 2;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const sliceAngle = (2 * Math.PI) / names.length;

        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before drawing

        names.forEach((name, i) => {
            const startAngle = i * sliceAngle;
            const endAngle = startAngle + sliceAngle;

            ctx.fillStyle = colors[i % colors.length];
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();
            ctx.fill();

            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(startAngle + sliceAngle / 2);
            ctx.textAlign = "right";
            ctx.fillStyle = "#333";
            ctx.font = "20px Arial bold";  // Større tekst for navnene
            ctx.fillText(name, radius - 10, 5);
            ctx.restore();
        });
    }

    // Start spinning
    function spinWheel() {
        if (spinning || names.length === 0) return;

        spinning = true;

        const spinTime = 7000; // Total spin time
        const startSpeed = 60; // Starting speed
        let currentRotation = 0;
        let speed = startSpeed;

        const startTime = performance.now();

        function animate() {
            const elapsedTime = performance.now() - startTime;
            const progress = Math.min(elapsedTime / spinTime, 1);

            // Langsom nedbremsning
            speed = startSpeed * (1 - Math.pow(progress, 4)); // Eksponentielt langsommere, mere ekstremt

            if (progress < 1) {
                currentRotation += speed / 100;
                drawRotatedWheel(currentRotation);
                requestAnimationFrame(animate);
            } else {
              
                const sliceAngle = (2 * Math.PI) / names.length;
                const finalRotation = currentRotation % (2 * Math.PI);

                // For at få den nordlige position, justerer vi rotationen så pilen er i toppen (0 grader)
                const normalizedRotation = finalRotation + Math.PI / 2; // Roter mod uret, så pilen peger mod nord

                // Beregn hvilken skive pilen peger på
                const selectedIndex = Math.floor(
                    (names.length - (normalizedRotation / sliceAngle) % names.length) % names.length
                );
                const selectedName = names[selectedIndex];

                resultDiv.textContent = `Valgt: ${selectedName}`;
                showPopup(selectedName);
                showConfetti(selectedName);
                spinning = false;
            }
        }

        requestAnimationFrame(animate);
    }

    // Tegn roteret hjul
    function drawRotatedWheel(rotation) {
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(rotation);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);
        drawWheel();
        ctx.restore();
    }

    // Vis konfetti ved vinder
    function showConfetti(name) {
        confettiContainer.innerHTML = ''; // Fjern tidligere konfetti
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.animationDelay = `${Math.random() * 5}s`;
            confettiContainer.appendChild(confetti);
        }
    }

    // Vis popup med vinder
    function showPopup(name) {
        popup.textContent = `${name}!`;
        popup.style.display = "block";
        setTimeout(() => {
            popup.style.display = "none";
        }, 3000);
    }

    // Håndter klik på spin knappen
    spinButton.addEventListener("click", () => {
        if (!spinning) {
            // Først fjern navnet, når man spinner igen
            names.splice(names.indexOf(resultDiv.textContent.replace("Valgt: ", "")), 1);
            drawWheel();
            spinWheel();
        }
    });

    // Initiering
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize); // Opret opdatering ved størrelseændring

    // Tegn hjulet ved start
    drawWheel();
});
