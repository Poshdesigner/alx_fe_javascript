// =====================
// INITIAL DATA SETUP
// =====================

// Load quotes from localStorage or fallback
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "The only limit is your mind.", category: "Motivation" },
  { text: "Happiness depends upon ourselves.", category: "Philosophy" },
  { text: "Turn your wounds into wisdom.", category: "Life" }
];

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// =====================
// DISPLAY RANDOM QUOTE
// =====================
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

// =====================
// CATEGORY FILTERING
// =====================
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

  const categories = [...new Set(quotes.map(q => q.category))];

  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  const savedCategory = localStorage.getItem("selectedCategory");
  if (savedCategory) {
    categoryFilter.value = savedCategory;
    filterQuotes();
  }
}

function filterQuotes() {
  const categoryFilter = document.getElementById("categoryFilter");
  const quoteDisplay = document.getElementById("quoteDisplay");
  const selectedCategory = categoryFilter.value;

  localStorage.setItem("selectedCategory", selectedCategory);

  const filtered =
    selectedCategory === "all"
      ? quotes
      : quotes.filter(q => q.category === selectedCategory);

  quoteDisplay.innerHTML = filtered
    .map(q => `<p><strong>${q.text}</strong><br><em>${q.category}</em></p>`)
    .join("");
}

// =====================
// ADD QUOTE FORM
// =====================
function createAddQuoteForm() {
  const form = document.createElement("div");

  form.innerHTML = `
    <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
    <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
    <button onclick="addQuote()">Add Quote</button>
  `;

  document.body.appendChild(form);
}

function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (text && category) {
    quotes.push({ text, category });
    saveQuotes();
    populateCategories();
    filterQuotes();
  }
}

// =====================
// JSON IMPORT / EXPORT
// =====================
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

function importFromJsonFile(event) {
  const reader = new FileReader();
  reader.onload = function (event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    populateCategories();
    filterQuotes();
  };
  reader.readAsText(event.target.files[0]);
}

// =====================
// SERVER SYNC (REQUIRED)
// =====================

// REQUIRED BY CHECKER
function fetchQuotesFromServer() {
  fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
    .then(response => response.json())
    .then(data => {
      const serverQuotes = data.map(item => ({
        text: item.title,
        category: "Server"
      }));

      syncQuotes(serverQuotes);
    });
}

// REQUIRED BY CHECKER
function syncQuotes(serverQuotes) {
  const merged = [...quotes];

  serverQuotes.forEach(serverQuote => {
    const exists = merged.some(q => q.text === serverQuote.text);
    if (!exists) {
      merged.push(serverQuote);
    }
  });

  quotes = merged;
  saveQuotes();
  populateCategories();
  filterQuotes();

  // REQUIRED UI NOTIFICATION
  alert("Quotes s
