const socket = new WebSocket('ws://localhost:8080');

// Når der modtages en besked fra serveren
socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);

    // Opdater scoren i HTML baseret på modtagne data
    if (data.type === 'update-score') {
        const { id, value } = data.payload;
        const inputElement = document.getElementById(id);
        if (inputElement) {
            inputElement.value = value;
        }
    }
});

// Send opdateringer til serveren
document.querySelectorAll('.score').forEach(input => {
    input.addEventListener('input', (event) => {
        const id = event.target.id;
        const value = event.target.value;

        // Send opdateringen til serveren
        socket.send(JSON.stringify({
            type: 'update-score',
            payload: { id, value }
        }));
    });
});

// Opdater totalen, når en score ændres
document.addEventListener("input", function (e) {
    if (e.target.classList.contains("score")) {
        const row = e.target.dataset.row;
        const scores = document.querySelectorAll(`.score[data-row="${row}"]`);
        let total = 0;

        scores.forEach((score) => {
            const value = parseInt(score.value, 10);
            if (!isNaN(value)) {
                total += value;
            }
        });

        document.getElementById(`total${row}`).textContent = total;
    }
});
