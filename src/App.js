import './style.css';
// import logo from './logo.svg';
import AppRouter from './routes/AppRouter';
import { DataProvider } from './context/DataContext';
// import './App.css';

function App() {
  return (
    <div className="App">
      <DataProvider>
        <AppRouter />
      </DataProvider>
    </div>
  );
}

export default App;
