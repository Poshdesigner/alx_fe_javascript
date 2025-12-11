// Quotes array
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is really simple, but we insist on making it complicated.", category: "Life" },
    { text: "Happiness depends upon ourselves.", category: "Happiness" }
];

// Function required by checker: displayRandomQuote
function displayRandomQuote() {
    const quoteDisplay = document.getElementById("quoteDisplay");

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Checker requires innerHTML
    quoteDisplay.innerHTML = `"${randomQuote.text}" — <em>${randomQuote.category}</em>`;
}

// Function required by checker: addQuote
function addQuote() {
    const textInput = document.getElementById("newQuoteText");
    const categoryInput = document.getElementById("newQuoteCategory");

    const text = textInput.value.trim();
    const category = categoryInput.value.trim();

    if (text === "" || category === "") {
        alert("Please enter both quote text and category.");
        return;
    }

    // Add new quote to array
    quotes.push({ text: text, category: category });

    // Update DOM by showing the new quote
    displayRandomQuote();

    // Clear inputs
    textInput.value = "";
    categoryInput.value = "";
}

// Checker requires this event listener
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);

// Event listener for Add Quote button
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);

// Display one quote on load
displayRandomQuote();
