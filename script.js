const API_URL =
  "https://v6.exchangerate-api.com/v6/8f7fb93c72834e9194057cfa/latest/BRL";
let USD, EUR, GBP, ARS, JPY;

fetch(API_URL)
  .then((response) => response.json())
  .then((data) => {
    USD = data.conversion_rates.USD;
    EUR = data.conversion_rates.EUR;
    GBP = data.conversion_rates.GBP;
    ARS = data.conversion_rates.ARS;
    JPY = data.conversion_rates.JPY;
    console.log("Loaded exchange rates:", USD, EUR, GBP, ARS, JPY);
  });

const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");

amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g;
  amount.value = amount.value.replace(hasCharactersRegex, "");
});

form.onsubmit = (event) => {
  event.preventDefault();

  // Verifique se as taxas de câmbio estão carregadas
  if (USD && EUR && GBP) {
    const amountValue = parseFloat(amount.value); // Certifique-se de converter para número
    switch (currency.value) {
      case "USD":
        convertCurrency(amountValue, USD, "US$");
        break;
      case "EUR":
        convertCurrency(amountValue, EUR, "€");
        break;
      case "GBP":
        convertCurrency(amountValue, GBP, "£");
        break;
      case "ARS":
        convertCurrency(amountValue, ARS, "$");
        break;
      case "JPY":
        convertCurrency(amountValue, JPY, "¥");
        break;
      default:
        console.log("Invalid currency");
    }
  } else {
    console.log("Exchange rates not loaded yet");
  }
};

function convertCurrency(amount, price, symbol) {
  try {
    description.textContent = `${symbol} 1 = ${price.toFixed(2)} BRL`;
    result.textContent = `${(amount / price).toFixed(2)} Reais`;

    footer.classList.add("show-result");
  } catch (error) {
    console.log(error);
    footer.classList.remove("show-result");
    alert("Erro ao converter moeda");
  }
}
