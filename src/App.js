import "./App.css";
import React from "react";
import CountryDisplay from "./CountryDisplay";
import Sidebar from "./Sidebar";
import countriesData from "./countries.json";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      countryData: null,
      countryClicked: undefined,
      displayData: [],
    };
  }

  async fetchExtraData() {
    const countryResponse = await fetch(
      "https://countriesnow.space/api/v0.1/countries/info?returns=currency,flag,unicodeFlag,dialCode"
    );
    let countries = await countryResponse.json();
    return this.sortByAlphabet(countries.data);
  }

  async fetchPopulation() {
    const populationResponse = await fetch(
      "https://countriesnow.space/api/v0.1/countries/population"
    );
    const population = await populationResponse.json();
    return this.sortByAlphabet(population.data);
  }

  sortByAlphabet(data) {
    return data.sort(function (a, b) {
      let textA = a.name;
      let textB = b.name;
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
  }

  async setCountryData() {
    const countryData = this.sortByAlphabet(countriesData);
    const population = await this.fetchPopulation();
    const extraData = await this.fetchExtraData();

    for (const i in countryData) {
      countryData[i] = {
        id: i,
        name: countryData[i].name,
        iso2: countryData[i].Iso2,
        iso3: countryData[i].Iso3,
        subregion: countryData[i].subregion,
        region: countryData[i].region,
        flag: countryData[i].flag,
        emojiFlag: "",
        population: countryData[i].population,
        capital: countryData[i].capital,
        languages: countryData[i].languages,
        currencies: countryData[i].currencies,
        dialcode: countryData[i].dialCode,
        timezones: countryData[i].timezones,
        location: countryData[i].latlng,
      };

      for (let j = 0; j < population.length; j++) {
        if (countryData[i].iso3 === population[j].code) {
          const number = population[j].populationCounts.length - 1;
          countryData[i].population =
            population[j].populationCounts[number].value;
        }
      }

      for (let j = 0; j < extraData.length; j++) {
        if (countryData[i].name.includes(extraData[j].name)) {
          if (extraData[j].flag) {
            countryData[i].flag = extraData[j].flag;
          }
          countryData[i].emojiFlag = extraData[j].unicodeFlag;
        }
      }

      if (countryData[i].name === "Afghanistan") {
        countryData[i].flag =
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Flag_of_Afghanistan_%281931%E2%80%931973%29.svg/2560px-Flag_of_Afghanistan_%281931%E2%80%931973%29.svg.png";
      } else if (countryData[i].name === "Mayotte") {
        countryData[i].flag =
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Flag_of_Mayotte_%28local%29.svg/1280px-Flag_of_Mayotte_%28local%29.svg.png";
      }
    }

    this.setState({ countryData });
  }

  componentDidMount = async () => {
    await this.setCountryData();
  };

  handleClick = async (e, props) => {
    const countryClicked = props;
    this.setState({ countryClicked: countryClicked });
  };

  checkName = (countryName) => {
    if (countryName === "Curacao") {
      return "Curaçao";
    } else if (countryName === "Aland Islands") {
      return "Åland Islands";
    } else if (countryName === "Saint Barthelemy") {
      return "Saint Barthélemy ";
    } else {
      return countryName;
    }
  };

  render() {
    return (
      <div className="App">
        <Sidebar
          countryList={this.state.countryData}
          handleClick={this.handleClick}
          checkName={this.checkName}
        />
        {this.state.countryClicked ? (
          <CountryDisplay
            key={this.state.countryClicked.id}
            country={this.state.countryClicked}
            checkName={this.checkName}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
