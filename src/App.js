import QuoteCaller from "./quotes";
import './App.css'
import { useEffect, useState } from "react";


function App() {

  const [color, setColor] = useState();

  function generateDarkRGBColor() {
    const maxDarkValue = 100; // Adjust this value to control how dark you want the colors
  
    const r = Math.floor(Math.random() * maxDarkValue);
    const g = Math.floor(Math.random() * maxDarkValue);
    const b = Math.floor(Math.random() * maxDarkValue);
  
    return `rgb(${r}, ${g}, ${b})`;
  }

  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', color);
  }, [color]); 

  const handleColorChange = () => {
    setColor(generateDarkRGBColor()); // Update the color
  };


  return (
    <div className="App" style={{ 
      backgroundColor: `var(--primary-color)`, 
      fontSize: `var(--font-size)` 
    }}>
      <h1>Quotes from the Famous</h1>
      <main>
        <QuoteCaller colorer={handleColorChange} />
      </main>
      <script src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"></script>
    </div>
  );
}

export default App;
