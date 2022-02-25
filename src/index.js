import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


  
  class FilmRow extends React.Component {
    render() {
      const film = this.props.film;
      const filmtitle = film.filmtitle

  
      return (
        <tr>
          <td>{filmtitle}</td>
          <td>{film.price}</td>
          <td>{film.rating}</td>
          <td>{film.length}</td>
          <td>{film.specialFeatures}</td>
          <td>{film.rentalDuration}</td>
        </tr>
      );
    }
  }

class FilmTable extends React.Component {
    render() {
        const filterText = this.props.filterText;
        const inStockOnly = this.props.inStockOnly;
        const rows = [];

      
        this.props.films.forEach((film) => {
            if (film.filmtitle.indexOf(filterText) === -1) {
              return;
            }
            if (inStockOnly && !film.stocked) {
              return;
            }

        rows.push(
          <FilmRow
            film={film}
            key={film.filmtitle} />
        );
      });
  
      return (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Rental Price </th>
              <th>Rating</th>
              <th>Length (Minutes)</th>
              <th>Special Features</th>
              <th>Rental Duration (Weeks)</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      );
    }
  }

  class FilterableFilmTable extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        filterText: '',
        inStockOnly: false
      };
      
      this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
      this.handleInStockChange = this.handleInStockChange.bind(this);
    }
  
    handleFilterTextChange(filterText) {
      this.setState({
        filterText: filterText
      });
    }
    
    handleInStockChange(inStockOnly) {
      this.setState({
        inStockOnly: inStockOnly
      })
    }
  
    render() {
      return (
        <div>
          <SearchBar
            filterText={this.state.filterText}
            inStockOnly={this.state.inStockOnly}
            onFilterTextChange={this.handleFilterTextChange}
            onInStockChange={this.handleInStockChange}
          />
          <FilmTable
            films={this.props.films}
            filterText={this.state.filterText}
            inStockOnly={this.state.inStockOnly}
          />
        </div>
      );
    }
  }


  
  class SearchBar extends React.Component {
    constructor(props) {
      super(props);
      this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
      this.handleInStockChange = this.handleInStockChange.bind(this);
    }
    
    handleFilterTextChange(e) {
      this.props.onFilterTextChange(e.target.value);
    }
    
    handleInStockChange(e) {
      this.props.onInStockChange(e.target.checked);
    }
    
    render() {
      return (
        <form>
          <input
            type="text"
            placeholder="Search..."
            value={this.props.filterText}
            onChange={this.handleFilterTextChange}
          />
        </form>
      );
    }
  }

const FILMS = [
    {filmtitle: 'ACADEMIC DINOSAUR', price: '$0.99', rating:'PG', length:86, specialFeatures:'Deleted Scenes, Behind the Scenes', rentalDuration:6},
    {filmtitle: 'ADAPTATION HOLES', price: '$2.99', rating:'NC-17',length:50, specialFeatures:'Trailers, Deleted Scenes', rentalDuration:7},
    {filmtitle: 'ACONDA CONFESSIONS', price: '$0.99', rating:'R', length:92, specialFeatures:'Trailers, Deleted Scenes', rentalDuration:3}
  ];

  ReactDOM.render(
    <FilterableFilmTable films={FILMS} />,
    document.getElementById('root')
  );