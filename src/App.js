import './App.css';
import HomePage from './Pages/homepage/homepage-component';
import Directory from './Components/directory/directory-component';

function App() {
  return (
    <div>
      <HomePage>
        <Directory/>
      </HomePage>
    </div>
  );
}

export default App;
