import React from "react";
import "./App.css";

class Sidebar extends React.Component {
  changeBtnOnEnter(id, key) {
    const countryBtn = document.getElementById(id);
    countryBtn.style.backgroundImage = `url('${this.props.countryList[key].flag}')`;
    countryBtn.style.backgroundSize = `contain`;
    countryBtn.style.fontSize = `14pt`;
    countryBtn.style.textShadow = "0 0 5px #000000, 0 0 5px #000000";
    countryBtn.style.opacity = `0.9`;
  }

  changeBtnOnLeave(id) {
    const countryBtn = document.getElementById(id);
    countryBtn.style.backgroundImage = `none`;
    countryBtn.style.fontSize = `12pt`;
    countryBtn.style.opacity = `1`;
    countryBtn.style.textShadow = "none";
  }

  displayCountry = (letter) => {
    if (!this.props.countryList) {
      return <div>Loading...</div>;
    } else {
      const countryEl = this.props.countryList.map((country) => {
        const key = country.id;
        const id = `${country.id}-${country.name}`;
        if (country.name[0] === letter) {
          return (
            <input
              type="button"
              className="country-btn"
              id={id}
              key={key}
              value={this.props.checkName(country.name)}
              onMouseEnter={() => {
                this.changeBtnOnEnter(id, key);
              }}
              onMouseLeave={() => this.changeBtnOnLeave(id)}
              onClick={(e) => {
                this.props.handleClick(e, country);
              }}
            ></input>
          );
        }
        return null;
      });
      return countryEl;
    }
  };

  displayAlphabet = () => {
    const alphabet = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      // "X",
      "Y",
      "Z",
    ];

    if (!this.props.countryList) {
      return <div>Loading...</div>;
    } else {
      let newDiv = [];
      for (let i = 0; i < alphabet.length; i++) {
        newDiv.push(
          <div
            className="countries"
            key={`${alphabet[i]}-countries`}
            id={alphabet[i]}
          >
            <h2 id="letter">{alphabet[i]}</h2>
            <div id="scroll-btns">{this.displayCountry(alphabet[i])}</div>
          </div>
        );
      }
      return newDiv;
    }
  };

  render() {
    return (
      <nav className="sidebar">
        <h1 id="select">Select a country</h1>
        <div className="scroll">{this.displayAlphabet()}</div>
      </nav>
    );
  }
}

export default Sidebar;
