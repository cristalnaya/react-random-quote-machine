import React, { Component } from 'react';
import './App.css';

const colors = {
  default: '#f3c1c6',
  green: '#05a19c',
  pink: '#d698b9',
  mustard: '#fdd043',
  orange: '#ffba90',
  darkGreen: '#004a2f',
  grass: '#a7d129',
  purple: '#6f0765'
}

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       quotes: [],
       quote: 'Life is what happens to you while you’re busy making other plans.',
       author: 'John Lennon',
       colors: colors.default,
       isSubmitted: true,
    }
    this.newQuote = this.newQuote.bind(this);
    // this.onChangeBgColor = this.onChangeBgColor.bind(this);
  }

  componentDidMount() {
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
    .then(response => response.json())
    .then(data => this.setState({ 
      quotes: data.quotes, 
      // colors: 
       
    }))
    .catch(error => console.log(error));
  }

  newQuote = () => {
    // e.preventDefault();
    const { quotes, colors } = this.state;

    const randomColor = colors[
      Object.keys(colors)[
        Math.floor(Math.random() * Object.keys(colors).length)
    ]
  ];
    const randomQuote = Math.floor(Math.random() * quotes.length);
    this.setState(() => ({
      quote: quotes[randomQuote].quote,
      author: quotes[randomQuote].author,
      colors: randomColor
      
    }));
  }

  render() {
    const { quote, author, colors } = this.state;
    if(this.state.quotes.length === 0) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div className="App">
        <h1>Random Quote Machine</h1>
          <div id="quote-box" style={{backgroundColor: colors}}>
          <div className="quotes-left"><i className="fas fa-quote-left"></i></div>
            <div id="text">{quote}</div>
            <div id="author">-{author}</div>
            <a href={`https://twitter.com/intent/tweet?text=${quote}${author}`} id="tweet-quote" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
            <button onClick={this.newQuote} id="new-quote">New Quote</button>
          </div>
        </div>
      );
    }
  }
}

export default App;
