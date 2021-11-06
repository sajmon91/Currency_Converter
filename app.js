
// global variables

const addCurrencyBtn = document.querySelector(".add_currency_btn");
const addCurrencyList = document.querySelector(".add_currency_list");
const currenciesList = document.querySelector(".currencies");
const loadIcon = document.querySelector('.loading_icon');

let initiallyDisplayedCurrencies = loadLocalStorages();
let baseCurrency;
let baseCurrencyAmount;

const APIKey = "b1ec994985464c75ae4d5a22d5110092";

const dataURL = `http://api.exchangeratesapi.io/v1/latest?access_key=${APIKey}`;

let currencies = [
  {
    name: "US Dollar",
    abbreviation: "USD",
    symbol: "\u0024",
    flagURL: "http://www.geonames.org/flags/l/us.gif"
  },
  {
    name: "Euro",
    abbreviation: "EUR",
    symbol: "\u20AC",
    flagURL: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg"
  },
  {
    name: "Serbian Dinar",
    abbreviation: "RSD",
    symbol: "din",
    flagURL: "https://img.geonames.org/flags/x/rs.gif"
  },
  {
    name: "Japanese Yen",
    abbreviation: "JPY",
    symbol: "\u00A5",
    flagURL: "http://www.geonames.org/flags/l/jp.gif"
  },
  {
    name: "British Pound",
    abbreviation: "GBP",
    symbol: "\u00A3",
    flagURL: "http://www.geonames.org/flags/l/uk.gif"
  },
  {
    name: "Australian Dollar",
    abbreviation: "AUD",
    symbol: "\u0024",
    flagURL: "http://www.geonames.org/flags/l/au.gif"
  },
  {
    name: "Canadian Dollar",
    abbreviation: "CAD",
    symbol: "\u0024",
    flagURL: "http://www.geonames.org/flags/l/ca.gif"
  },
  {
    name: "Swiss Franc",
    abbreviation: "CHF",
    symbol: "\u0043\u0048\u0046",
    flagURL: "http://www.geonames.org/flags/l/ch.gif"
  },
  {
    name: "Chinese Yuan Renminbi",
    abbreviation: "CNY",
    symbol: "\u00A5",
    flagURL: "http://www.geonames.org/flags/l/cn.gif"
  },
  {
    name: "Swedish Krona",
    abbreviation: "SEK",
    symbol: "\u006B\u0072",
    flagURL: "http://www.geonames.org/flags/l/se.gif"
  },
  {
    name: "New Zealand Dollar",
    abbreviation: "NZD",
    symbol: "\u0024",
    flagURL: "http://www.geonames.org/flags/l/nz.gif"
  },
  {
    name: "Mexican Peso",
    abbreviation: "MXN",
    symbol: "\u0024",
    flagURL: "http://www.geonames.org/flags/l/mx.gif"
  },
  {
    name: "Singapore Dollar",
    abbreviation: "SGD",
    symbol: "\u0024",
    flagURL: "http://www.geonames.org/flags/l/sg.gif"
  },
  {
    name: "Hong Kong Dollar",
    abbreviation: "HKD",
    symbol: "\u0024",
    flagURL: "http://www.geonames.org/flags/l/hk.gif"
  },
  {
    name: "Norwegian Krone",
    abbreviation: "NOK",
    symbol: "\u006B\u0072",
    flagURL: "http://www.geonames.org/flags/l/no.gif"
  },
  {
    name: "South Korean Won",
    abbreviation: "KRW",
    symbol: "\u20A9",
    flagURL: "http://www.geonames.org/flags/l/kr.gif"
  },
  {
    name: "Turkish Lira",
    abbreviation: "TRY",
    symbol: "\u20BA",
    flagURL: "http://www.geonames.org/flags/l/tr.gif"
  },
  {
    name: "Russian Ruble",
    abbreviation: "RUB",
    symbol: "\u20BD",
    flagURL: "http://www.geonames.org/flags/l/ru.gif"
  },
  {
    name: "Indian Rupee",
    abbreviation: "INR",
    symbol: "\u20B9",
    flagURL: "http://www.geonames.org/flags/l/in.gif"
  },
  {
    name: "Brazilian Real",
    abbreviation: "BRL",
    symbol: "\u0052\u0024",
    flagURL: "http://www.geonames.org/flags/l/br.gif"
  },
  {
    name: "South African Rand",
    abbreviation: "ZAR",
    symbol: "\u0052",
    flagURL: "http://www.geonames.org/flags/l/za.gif"
  },
  {
    name: "Philippine Peso",
    abbreviation: "PHP",
    symbol: "\u20B1",
    flagURL: "http://www.geonames.org/flags/l/ph.gif"
  },
  {
    name: "Czech Koruna",
    abbreviation: "CZK",
    symbol: "\u004B\u010D",
    flagURL: "http://www.geonames.org/flags/l/cz.gif"
  },
  {
    name: "Indonesian Rupiah",
    abbreviation: "IDR",
    symbol: "\u0052\u0070",
    flagURL: "http://www.geonames.org/flags/l/id.gif"
  },
  {
    name: "Malaysian Ringgit",
    abbreviation: "MYR",
    symbol: "\u0052\u004D",
    flagURL: "http://www.geonames.org/flags/l/my.gif"
  },
  {
    name: "Hungarian Forint",
    abbreviation: "HUF",
    symbol: "\u0046\u0074",
    flagURL: "http://www.geonames.org/flags/l/hu.gif"
  },
  {
    name: "Icelandic Krona",
    abbreviation: "ISK",
    symbol: "\u006B\u0072",
    flagURL: "http://www.geonames.org/flags/l/is.gif"
  },
  {
    name: "Croatian Kuna",
    abbreviation: "HRK",
    symbol: "\u006B\u006E",
    flagURL: "http://www.geonames.org/flags/l/hr.gif"
  },
  {
    name: "Bulgarian Lev",
    abbreviation: "BGN",
    symbol: "\u043B\u0432",
    flagURL: "http://www.geonames.org/flags/l/bg.gif"
  },
  {
    name: "Romanian Leu",
    abbreviation: "RON",
    symbol: "\u006C\u0065\u0069",
    flagURL: "http://www.geonames.org/flags/l/ro.gif"
  },
  {
    name: "Danish Krone",
    abbreviation: "DKK",
    symbol: "\u006B\u0072",
    flagURL: "http://www.geonames.org/flags/l/dk.gif"
  },
  {
    name: "Thai Baht",
    abbreviation: "THB",
    symbol: "\u0E3F",
    flagURL: "http://www.geonames.org/flags/l/th.gif"
  },
  {
    name: "Polish Zloty",
    abbreviation: "PLN",
    symbol: "\u007A\u0142",
    flagURL: "http://www.geonames.org/flags/l/pl.gif"
  },
  {
    name: "Israeli Shekel",
    abbreviation: "ILS",
    symbol: "\u20AA",
    flagURL: "http://www.geonames.org/flags/l/il.gif"
  },
  {
    name: "Kuwait Dinar",
    abbreviation: "KWD",
    symbol: "KWD",
    flagURL: "https://img.geonames.org/flags/x/kw.gif"
  }
];



//////////////////////////////////////////////////////////////////////////////////// event listeners ////////////////////

addCurrencyBtn.addEventListener("click", addCurrencyBtnClick);

function addCurrencyBtnClick() {
  addCurrencyBtn.classList.toggle("open");
};

//////////////////////////////////////////////////////////////////////

addCurrencyList.addEventListener("click", addCurrencyListClick);

function addCurrencyListClick(event) {
  const clickedListItem = event.target.closest("li");
  if (!clickedListItem.classList.contains("disabled")) {
    const newCurrency = currencies.find(c => c.abbreviation === clickedListItem.getAttribute("data-currency"));
    if (newCurrency) {
      newCurrenciesListItem(newCurrency);
      saveToLocalStorage(newCurrency.abbreviation);
    }
  }
};

////////////////////////////////////////////////////////////////////

currenciesList.addEventListener("click", currenciesListClick);

function currenciesListClick(event){
  if(event.target.classList.contains("close")){
    const parentNode = event.target.parentNode;
    parentNode.remove();
    addCurrencyList.querySelector(`[data-currency = ${parentNode.id}]`).classList.remove("disabled");
    removeLocalStorage(parentNode.id);

    // new active currency
    if (parentNode.classList.contains("base_currency")) {
      const newBaseCurrencyLi = currenciesList.querySelector(".currency");
      if (newBaseCurrencyLi) {
        setNewBaseCurrency(newBaseCurrencyLi);
        baseCurrencyAmount = Number(newBaseCurrencyLi.querySelector(".input input").value);
      }
    }
  }
};

function setNewBaseCurrency(newBaseCurrencyLi) {
  newBaseCurrencyLi.classList.add("base_currency");
  baseCurrency = newBaseCurrencyLi.id;
  const baseCurrencyRate = currencies.find(c => c.abbreviation === baseCurrency).rate;

  currenciesList.querySelectorAll(".currency").forEach(currencyLi => {
    const currencyRate = currencies.find(c => c.abbreviation === currencyLi.id).rate;
    const exchangeRate = currencyLi.id === baseCurrency ? 1 : (currencyRate / baseCurrencyRate).toFixed(4);
    currencyLi.querySelector(".base_currency_rate").textContent = `1 ${baseCurrency} = ${exchangeRate} ${currencyLi.id}`;
  });
};

////////////////////////////////////////////////////////////////////

currenciesList.addEventListener("input", currenciesListInputChange);

function currenciesListInputChange(){
  const isNewBaseCurrency = event.target.closest("li").id !== baseCurrency;
  if (isNewBaseCurrency) {
    currenciesList.querySelector(`#${baseCurrency}`).classList.remove("base_currency");
    setNewBaseCurrency(event.target.closest("li"));
  }

  const newBaseCurrencyAmount = isNaN(event.target.value) ? 0 : Number(event.target.value);
  if (baseCurrencyAmount !== newBaseCurrencyAmount || isNewBaseCurrency) {
    baseCurrencyAmount = newBaseCurrencyAmount;
    const baseCurrencyRate = currencies.find(c => c.abbreviation === baseCurrency).rate;
    currenciesList.querySelectorAll(".currency").forEach(currencyLi => {
      if (currencyLi.id !== baseCurrency) {
        const currencyRate = currencies.find(c => c.abbreviation === currencyLi.id).rate;
        const exchangeRate = currencyLi.id === baseCurrency ? 1 : (currencyRate / baseCurrencyRate).toFixed(4);
        currencyLi.querySelector(".input input").value = exchangeRate * baseCurrencyAmount !== 0 ? (exchangeRate * baseCurrencyAmount).toFixed(4) : "";
      }
    });
  }
};

/////////////////////////////////////////////////////////////////

currenciesList.addEventListener("focusout", currenciesListFocusOut);

function currenciesListFocusOut(event) {
  const inputValue = event.target.value;
  if (isNaN(inputValue) || Number(inputValue) === 0) {
    event.target.value = "";
  }else{
    event.target.value = Number(inputValue).toFixed(4);
  }
};

/////////////////////////////////////////////////////////////////

currenciesList.addEventListener("keydown", currenciesListKeyDown);

function currenciesListKeyDown(event) {
  if(event.key === "Enter") event.target.blur();
};

//////////////////////////////////////////////////////////////////////////////////////// functions ////////////////////

function populateAddCurrencyList() {
  currencies.forEach((el) =>{
    addCurrencyList.insertAdjacentHTML("beforeend", 
    `<li data-currency=${el.abbreviation}>
      <img src=${el.flagURL} alt="flag" class="flag"><span>${el.abbreviation} - ${el.name}</span>
    </li>`);
  });
};
///////////////////////////////////////////////////////////////////////

function populateCurrenciesList() {
  
  initiallyDisplayedCurrencies.forEach((el) => {
    const currency = currencies.find(c => c.abbreviation === el);
    if(currency){
      newCurrenciesListItem(currency);
    }
  });
};

////////////////////////////////////////////////////////////////////

function newCurrenciesListItem(currency){
  if (currenciesList.childElementCount === 0) {
      baseCurrency = currency.abbreviation;
      baseCurrencyAmount = 0;
  }

  addCurrencyList.querySelector(`[data-currency = ${currency.abbreviation}]`).classList.add("disabled");
  const baseCurrencyRate = currencies.find(c => c.abbreviation === baseCurrency).rate;
  const exchangeRate = currency.abbreviation === baseCurrency ? 1 : (currency.rate / baseCurrencyRate).toFixed(4);
  const inputValue = baseCurrencyAmount ? (baseCurrencyAmount * exchangeRate).toFixed(4) : "";

  currenciesList.insertAdjacentHTML("beforeend",
  `<li class="currency ${currency.abbreviation === baseCurrency ? "base_currency" : ""}" id=${currency.abbreviation}>
    <img src=${currency.flagURL} alt="flag" class="flag">
    <div class="info">
      <p class="input"><span class="currency_symbol">${currency.symbol}</span><input type="text" placeholder="0.000" value=${inputValue}></p>
      <p class="currency_name">${currency.abbreviation} - ${currency.name}</p>
      <p class="base_currency_rate">1 ${baseCurrency} = ${exchangeRate} ${currency.abbreviation}</p>
    </div>
    <span class="close">&times;</span>
  </li>`
  );
};

////////////////////////////////////////////////////////////////////

function saveToLocalStorage(abbreviation){
  let currenciesLocal = loadLocalStorages();
  currenciesLocal.push(abbreviation);
  localStorage.setItem('currencies', JSON.stringify(currenciesLocal));
};

/////////////////////////////////////////////////////////////////////

function loadLocalStorages() {
  let currenciesLocal;
  if (localStorage.getItem('currencies') === null) {
    currenciesLocal =[];
  }else{
    currenciesLocal = JSON.parse(localStorage.getItem('currencies'));
  }
  return currenciesLocal;
};

////////////////////////////////////////////////////////////////

function removeLocalStorage(abbreviation){
  let currenciesLocal = loadLocalStorages();
  let arr =  currenciesLocal.filter(el => {
    return el !== abbreviation;
  });
  localStorage.setItem('currencies', JSON.stringify(arr));
};

/////////////////////////////////////////////////////////////////////

window.addEventListener("load", () => {
  loadIcon.classList.remove('hidden');

  setTimeout(() => {
    fetch(dataURL)
    .then(res => res.json())
    .then(data => {
      document.querySelector(".date").textContent = data.date.split("-").reverse().join("-");
      data.rates["EUR"] = 1;
      currencies = currencies.filter(currency => data.rates[currency.abbreviation]);
      currencies.forEach(currency => currency.rate = data.rates[currency.abbreviation]);
      populateAddCurrencyList();
      populateCurrenciesList();
      loadIcon.classList.add('hidden');
    })
    .catch(err => console.error(err));
    
  },500);

});
