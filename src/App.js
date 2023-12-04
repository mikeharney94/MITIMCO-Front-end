import logo from './MITIMCO-Retina.png';
import StockViewer from './StockViewer.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <img src={logo} className="logo" alt="logo" /> API
        </p>
        <p>
          Enter parameters below to load stock data
        </p>

          <StockViewer></StockViewer>
      </header>
    </div>
  );
}

export default App;
