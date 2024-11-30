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

        // Opdater totalen, når en score ændres
        updateTotal(id);
    }
});

// Send opdateringer til serveren
document.querySelectorAll('.score').forEach(input => {
    input.addEventListener('input', (event) => {
        const id = event.target.id;
        const value = event.target.value;

        // Gem inputværdien i localStorage
        localStorage.setItem(id, value);

        // Send opdateringen til serveren
        socket.send(JSON.stringify({
            type: 'update-score',
            payload: { id, value }
        }));

        // Opdater totalen, når en score ændres
        updateTotal(id);
    });

    // Hent og opret værdi fra localStorage, hvis den findes
    const storedValue = localStorage.getItem(input.id);
    if (storedValue) {
        input.value = storedValue;
        updateTotal(input.id);  // Opdater totalen med de gemte værdier
    }
});

// Funktion til at opdatere totalen
function updateTotal(id) {
    const row = document.getElementById(id).dataset.row;
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
