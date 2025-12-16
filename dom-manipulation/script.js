// Load quotes from localStorage or fallback
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "The only limit is your mind.", category: "Motivation" },
  { text: "Happiness depends upon ourselves.", category: "Philosophy" },
  { text: "Turn your wounds into wisdom.", category: "Life" }
];

// Save quotes
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Display random quote (required)
function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));

  quoteDisplay.innerHTML = `
    <p><strong>Quote:</strong> ${randomQuote.text}</p>
    <p><em>Category:</em> ${randomQuote.category}</p>
  `;
}

// Populate category dropdown (REQUIRED)
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");

  // Clear existing options (except "all")
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

  const categories = [...new Set(quotes.map(q => q.category))];

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Restore saved filter
  const savedCategory = localStorage.getItem("selectedCategory");
  if (savedCategory) {
    categoryFilter.value = savedCategory;
    filterQuotes();
  }
}

// Filter quotes (REQUIRED)
function filterQuotes() {
  const categoryFilter = document.getElementById("categoryFilter");
  const quoteDisplay = document.getElementById("quoteDisplay");
  const selectedCategory = categoryFilter.value;

  localStorage.setItem("selectedCategory", selectedCategory);

  let filteredQuotes =
    selectedCategory === "all"
      ? quotes
      : quotes.filter(q => q.category === selectedCategory);

  quoteDisplay.innerHTML = filteredQuotes
    .map(
      q => `
      <p><strong>${q.text}</strong><br><em>${q.category}</em></p>
    `
    )
    .join("");
}

// Create add quote form (REQUIRED)
function createAddQuoteForm() {
  const form = document.createElement("div");

  form.innerHTML = `
    <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
    <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
    <button onclick="addQuote()">Add Quote</button>
  `;

  document.body.appendChild(form);
}

// Add quote (UPDATED for categories)
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim();

  if (newText && newCategory) {
    quotes.push({ text: newText, category: newCategory });
    saveQuotes();
    populateCategories();
    filterQuotes();

    textInput.value = "";
    categoryInput.value = "";
  }
}

// Export quotes
function exportToJson() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], {
    type: "application/json"
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

// Import quotes
function importFromJsonFile(event) {
  const reader = new FileReader();
  reader.onload = function (event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    populateCategories();
    filterQuotes();
    alert("Quotes imported successfully!");
  };
  reader.readAsText(event.target.files[0]);
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  createAddQuoteForm();
  populateCategories();
  document
    .getElementById("newQuote")
    .addEventListener("click", showRandomQuote);
});
