document.addEventListener("DOMContentLoaded", function() {
    const inputs = document.querySelectorAll('input[type="text"]');
    const sums = document.querySelectorAll('td[id^="sum"]');  // Elementer til at vise summen

    // Funktion til at opdatere summen for hver række
    function updateSums() {
        // Gennemgå alle inputs
        inputs.forEach(input => {
            // Find den række, hvor inputfeltet er
            const row = input.closest('tr');
            const rowInputs = row.querySelectorAll('input[type="text"]');
            
            let rowSum = 0;

            // Gennemgå alle inputfelter i rækken og beregn summen
            rowInputs.forEach(inputInRow => {
                const value = parseFloat(inputInRow.value);
                if (!isNaN(value)) {
                    rowSum += value;  // Tilføj til summen, hvis værdien er et tal
                }
            });

            // Find den celle, der viser summen i rækken og opdater den
            const sumCell = row.querySelector('td[id^="sum"]');
            if (sumCell) {
                sumCell.innerHTML = rowSum.toFixed(2);  // Brug innerHTML til at sætte summen med to decimaler
            }
        });
    }

    updateSums(); // Initialiser opdatering af summer

    // Kald updateSums 10 gange per sekund
    setInterval(updateSums, 100);  // 100 ms = 10 gange pr. sekund
});
