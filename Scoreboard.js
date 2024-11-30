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
