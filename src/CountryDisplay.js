import React from "react";
import "./App.css";

class CountryDisplay extends React.Component {
  getSubregionEl = () => {
    const subregion = this.props.country.subregion;
    if (subregion) {
      return (
        <h4>
          <span className="label" id="subregion">
            {subregion}
          </span>
        </h4>
      );
    }
  };

  getName = () => {
    return (
      <h1>
        <span id="name">{this.props.checkName(this.props.country.name)}</span>
      </h1>
    );
  };

  getFlag = () => {
    return (
      <img className="flag" src={this.props.country.flag} alt="Flag"></img>
    );
  };

  getCapital = () => {
    const capital = this.props.country.capital;
    if (capital) {
      return (
        <h3>
          <span className="label">Capital:</span> {capital}
        </h3>
      );
    }
  };

  getPopulation = () => {
    const population = this.props.country.population;
    if (population) {
      return (
        <h3>
          <span className="label">Population:</span>{" "}
          {population.toLocaleString("en-US")}
        </h3>
      );
    }
  };

  getLanguages = () => {
    const languages = this.props.country.languages;
    return (
      <h3>
        <span className="label">
          {languages.length > 1 ? "Languages:" : "Language:"}
        </span>{" "}
        {languages
          .map((lang) => {
            return lang.name;
          })
          .join(", ")}
      </h3>
    );
  };

  getCurrencies = () => {
    const currencies = this.props.country.currencies;
    if (currencies.length > 0) {
      return (
        <h3>
          <span className="label">
            {currencies.length > 1 ? "Currencies:" : "Currency:"}
          </span>{" "}
          {currencies
            .map((currency) => {
              return currency.name;
            })
            .join(", ")}
        </h3>
      );
    }
  };

  getTimezones = () => {
    const timezones = this.props.country.timezones;
    return (
      <h3>
        <span className="label">
          {timezones.length > 1 ? "Timezones:" : "Timezone:"}
        </span>{" "}
        {timezones
          .map((timezone) => {
            return timezone;
          })
          .join(", ")}
      </h3>
    );
  };

  getEmojiFlag = () => {
    const flag = this.props.country.emojiFlag;

    if (flag) {
      return (
        <p>
          <span className="label">Emoji flag:</span>
          <br />
          <span id="emoji">{flag}</span>
        </p>
      );
    }
  };

  showCountry = () => {
    if (!this.props.country) {
      return <div>Loading...</div>;
    } else {
      return (
        <section className="main">
          {this.getSubregionEl()}
          {this.getName()}
          {this.getFlag()}
          {this.getCapital()}
          {this.getPopulation()}
          {this.getLanguages()}
          {this.getCurrencies()}
          {this.getTimezones()}
          {this.getEmojiFlag()}
        </section>
      );
    }
  };

  render() {
    return this.showCountry();
  }
}

export default CountryDisplay;
