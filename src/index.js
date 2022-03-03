import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import axios from 'axios';

class FilmRow extends React.Component {
  render() {
    const filmData = this.props.filmInfo;
    return (
      <div id="filmRow">
        <div>
          <h3 id="filmTitle">{filmData.title}</h3>
          <table id="filmData">
            <thead>
              <tr>
                <th>Release Year</th>
                <th>Length</th>
                <th>Rating</th>
                <th>Genre</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{filmData.release_year}</td>
                <td>{filmData.length}</td>
                <td>{filmData.rating}</td>

              </tr>
            </tbody>
          </table>
          <p className="filmDataBottom">Description: {filmData.description}</p>
        </div>
        <div>
          <p>
            Film ID: {filmData.film_id}
            <br />
          </p>
          <p></p>
          <p></p>
          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }
}



class FilmTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { films: [] };
  }

  componentDidMount() {
    axios
      .get("http://54.198.232.90:8080/Home/AllFilms")
      .then((response) => this.setState({ films: response.data }));
  }

  render() {
    const film = this.state.films;
    const filterText = this.props.filterText.toLowerCase();

    const rows = [];

    this.state.films.forEach((film) => {
      if (film.title.toLowerCase().indexOf(filterText) === -1) {
        return;
      }
      rows.push(<FilmRow filmInfo={film} key={film.title} />);
    });

    return (
      <div>
        <div>{rows}</div>
      </div>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    const filterText = this.props.filterText;
    return (
      <form className="SearchBar">
        <input
          type="text"
          placeholder="Search Film...."
          value={filterText}
          onChange={(e) => this.props.onFilterTextChange(e.target.value)}
        />
      </form>
    );
  }
}

class FilmWikiHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(FT) {
    this.setState({
      filterText: FT,
    });
  }

  render() {
    return (
      <div>
        <div></div>
        <div className="FilmWikiHomePageCenter">
          <SearchBar
            filterText={this.state.filterText}
            onFilterTextChange={this.handleFilterTextChange}
          />
          <FilmTable
            films={this.props.films}
            filterText={this.state.filterText}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<FilmWikiHomePage />, document.getElementById("root"));