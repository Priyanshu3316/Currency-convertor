const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".btn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".conversion p");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amountVal = amount.value;
  if (amountVal === "" || amountVal < 0) {
    amountVal = 1;
    amount.value = "1";
  }
  // console.log(fromCurr.value, toCurr.value.toLowerCase());
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate =
    data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()].toFixed(4);
  let result = rate * amountVal;
  msg.innerText = `${amountVal} ${fromCurr.value} = ${result} ${toCurr.value}`;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});
const swapIcon = document.querySelector(".fa-arrow-right-arrow-left");

swapIcon.addEventListener("click", () => {
    // Swap the selected values of "from" and "to" dropdowns
    let tempValue = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = tempValue;

    // Update the flags based on the new selection
    updateFlag(fromCurr);
    updateFlag(toCurr);
});

window.addEventListener("load", () => {
  updateExchangeRate();
});