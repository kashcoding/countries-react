import React from "react";
import "./App.css";

class Sidebar extends React.Component {
  state = {
    hover: null,
  };

  changeBtnOnEnter(key) {
    this.setState({ hover: key });
  }

  changeBtnOnLeave() {
    this.setState({ hover: null });
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
              className={
                this.state.hover === key ? "country-btn hover" : "country-btn"
              }
              id={id}
              key={key}
              value={this.props.checkName(country.name)}
              onMouseEnter={() => {
                this.changeBtnOnEnter(key);
              }}
              onMouseLeave={() => this.changeBtnOnLeave()}
              onClick={(e) => {
                this.props.handleClick(e, country);
              }}
              style={
                this.state.hover === key
                  ? { backgroundImage: `url(${country.flag})` }
                  : null
              }
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
