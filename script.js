const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const favoriteList = document.getElementById("favoriteQuotes");

const quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "Success is not the key to happiness. Happiness is the key to success.", author: "Albert Schweitzer" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" }
];

let currentQuote = null;


function getRandomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  currentQuote = quotes[index];
  quoteElement.textContent = "${currentQuote.text}";
  authorElement.textContent = - ${currentQuote.author};
  saveLastQuote(currentQuote);
}


function addToFavorites() {
  const favorites = getFavorites();
  const exists = favorites.some(q => q.text === currentQuote.text);
  if (!exists) {
    favorites.push(currentQuote);
    localStorage.setItem("favoriteQuotes", JSON.stringify(favorites));
    renderFavorites();
  }
}


function shareQuote() {
  const shareText = "${currentQuote.text}" - ${currentQuote.author};
  if (navigator.share) {
    navigator.share({
      title: "Inspiring Quote",
      text: shareText,
    }).catch(console.error);
  } else {
    alert("Sharing not supported on this browser.");
  }
}


function getFavorites() {
  return JSON.parse(localStorage.getItem("favoriteQuotes")) || [];
}


function renderFavorites() {
  const favorites = getFavorites();
  favoriteList.innerHTML = "";
  favorites.forEach(q => {
    const li = document.createElement("li");
    li.textContent = "${q.text}" - ${q.author};
    favoriteList.appendChild(li);
  });
}


function saveLastQuote(quote) {
  const today = new Date().toDateString();
  localStorage.setItem("quoteOfTheDay", JSON.stringify({ quote, date: today }));
}


function loadDailyQuote() {
  const saved = JSON.parse(localStorage.getItem("quoteOfTheDay"));
  const today = new Date().toDateString();
  if (saved && saved.date === today) {
    currentQuote = saved.quote;
    quoteElement.textContent = "${currentQuote.text}";
    authorElement.textContent = - ${currentQuote.author};
  } else {
    getRandomQuote();
  }
}


loadDailyQuote();
renderFavorites();