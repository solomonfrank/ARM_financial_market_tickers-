var countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const countryObj = countries.getNames("en", { select: "official" });
const countryList = [];

for (let prop in countryObj) {
  const obj = { title: countryObj[prop], code: prop.toLowerCase() };
  countryList.push(obj);
}

export default countryList;
