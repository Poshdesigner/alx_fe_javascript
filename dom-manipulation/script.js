// Initial quotes array
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is really simple, but we insist on making it complicated.", category: "Life" },
    { text: "Happiness depends upon ourselves.", category: "Happiness" }
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");
const addQuoteBtn = document.getElementById("addQuoteBtn");

// Function: Show random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    // Update DOM dynamically
    quoteDisplay.textContent = `"${quote.text}" — (${quote.category})`;
}

// Function: Add new quote
function addQuote() {
    const quoteText = document.getElementById("newQuoteText").value.trim();
    const quoteCategory = document.getElementById("newQuoteCategory").value.trim();

    if (quoteText === "" || quoteCategory === "") {
        alert("Please enter both quote text and category.");
        return;
    }

    // Add new quote to the array
    const newQuote = {
        text: quoteText,
        category: quoteCategory
    };

    quotes.push(newQuote);

    // Clear input fields
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    alert("Quote added successfully!");
}

// Event Listeners
newQuoteButton.addEventListener("click", showRandomQuote);
addQuoteBtn.addEventListener("click", addQuote);

// Display a quote on page load
showRandomQuote();
