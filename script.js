let points = 0;
let money = 10;
let prizes = [];
let currentCard = getRandomCard();
document.getElementById("card").textContent = currentCard;
document.getElementById("money").textContent = money;

function getRandomCard() {
    const cardValues = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "🃏", "🃏"];
    return cardValues[Math.floor(Math.random() * cardValues.length)];
}

function getCardNumericValue(card) {
    if (card === "A") return 1;
    if (card === "J") return 11;
    if (card === "Q") return 12;
    if (card === "K") return 13;
    if (card === "🃏") return -1;
    return parseInt(card);
}

function guess(choice) {
    if (money <= 0) {
        showPopup("💸 You're out of money! Game over.");
        return;
    }

    money--;
    document.getElementById("money").textContent = money;

    let newCard = getRandomCard();
    let cardElement = document.getElementById("card");

    cardElement.classList.add("flipped");
    setTimeout(() => {
        cardElement.textContent = newCard;
        cardElement.classList.remove("flipped");

        let oldValue = getCardNumericValue(currentCard);
        let newValue = getCardNumericValue(newCard);

        if (newCard === "🃏") {
            showPopup("😱 Joker appeared! You lost instantly.");
            resetGame();
            return;
        }

        if ((choice === "higher" && newValue > oldValue) || (choice === "lower" && newValue < oldValue)) {
            points++;
            if (points === 3) {
                winGame();
            }
        } else {
            showPopup("❌ You lost! Try again.");
            resetGame();
        }

        currentCard = newCard;
    }, 500);
}

function winGame() {
    prizes.push("🧸 Plushie");
    document.getElementById("prizes").textContent = prizes.join(", ");
    showPopup("🎉 You won a plushie! 🎉");
}

function resetGame() {
    points = 0;
    currentCard = getRandomCard();
    document.getElementById("card").textContent = currentCard;
}

function showPopup(message) {
    document.getElementById("popup-message").textContent = message;
    document.getElementById("popup").style.display = "block";
}

function playAgain() {
    document.getElementById("popup").style.display = "none";
    resetGame();
}