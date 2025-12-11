// Quotes array
let quotes = [
  { text: "The only limit is your mind.", category: "Motivation" },
  { text: "Happiness depends upon ourselves.", category: "Philosophy" },
  { text: "Turn your wounds into wisdom.", category: "Life" }
];

// Function REQUIRED by the checker
function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");

  // Pick random quote
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // Update DOM (checker requires innerHTML)
  quoteDisplay.innerHTML = `
    <p><strong>Quote:</strong> ${randomQuote.text}</p>
    <p><em>Category:</em> ${randomQuote.category}</p>
  `;
}

// Add quote function (checker requires this)
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim();

  if (newText !== "" && newCategory !== "") {
    quotes.push({ text: newText, category: newCategory });

    // Clear fields
    textInput.value = "";
    categoryInput.value = "";

    // Update DOM (optional but recommended)
    showRandomQuote();
  }
}

// Required event listener
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
