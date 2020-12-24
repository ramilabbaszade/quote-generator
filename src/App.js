import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    getQuote();
  }, [setQuotes, setIsLoading]);

  const getQuote = () => {
    fetch("https://quote-garden.herokuapp.com/api/v3/quotes/random")
      .then((res) => res.json())
      .then((data) => {
        setQuotes(data.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <div className={`header ${isDark && "dark"}`}>
        <div className="restart_btn" onClick={getQuote}>
          Restart
        </div>
        <div className="restart_btn" onClick={() => setIsDark(!isDark)}>
          Dark mode
        </div>
      </div>
      <div className={`App_container ${isDark && "dark"}`}>
        {quotes.map((quotes) => {
          return (
            <main key={quotes._id}>
              <div className={`quote ${isDark && "dark"}`}>
                <p>{isLoading ? "Loading..." : quotes.quoteText}</p>
              </div>
              <div className="author">
                {isLoading ? "Loading..." : quotes.quoteAuthor}
              </div>
              <small>{quotes.quoteGenre}</small>
            </main>
          );
        })}
      </div>
      <div>ramilabbaszade@DevChallanges.io</div>
    </div>
  );
}

export default App;
