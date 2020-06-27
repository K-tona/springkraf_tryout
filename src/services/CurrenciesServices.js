import Axios from "axios";

const CurrenciesServices = {
  GetCurrencies: new Promise((resolve, reject) => {
    Axios.get("https://api.exchangeratesapi.io/latest")
      .then(response => {
        const currencyAr = [{ label: "EUR", value: "EUR" }];
        for (const key in response.data.rates) {
          currencyAr.push({ label: key, value: key });
        }
        resolve(currencyAr);
      })
      .catch(err => {
        reject("oppps", err);
      });
  }),
  GetCurrenciesRates: (src_symbol, end_symbol) =>
    new Promise((resolve, reject) => {
      Axios.get("https://api.exchangeratesapi.io/latest")
        .then(response => {
          const currencyAr = [{ label: "EUR", value: "EUR" }];
          for (const key in response.data.rates) {
            currencyAr.push({
              label: key,
              value: key,
              rate: response.data.rates[key]
            });
          }
          const endRate =
            end_symbol === "EUR" ? 1 : response.data.rates[end_symbol];
          if (src_symbol === "EUR") {
            if (end_symbol === "EUR") resolve(1);
            else resolve(endRate);
          } else {
            resolve(endRate / response.data.rates[src_symbol]);
          }
        })
        .catch(err => {
          reject("oppps", err);
        });
    })
};

export default CurrenciesServices;
