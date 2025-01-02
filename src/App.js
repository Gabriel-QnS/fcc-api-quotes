import QuoteCaller from "./quotes";
import './App.css'
import { useEffect, useState } from "react";


function App() {

  const [color, setColor] = useState();

  function generateLightRGBColor() {
    const minLightValue = 150; // Adjust this value to control how light you want the colors
    const maxLightValue = 255;
  
    const r = Math.floor(Math.random() * (maxLightValue - minLightValue + 1)) + minLightValue;
    const g = Math.floor(Math.random() * (maxLightValue - minLightValue + 1)) + minLightValue;
    const b = Math.floor(Math.random() * (maxLightValue - minLightValue + 1)) + minLightValue;
  
    return `rgb(${r}, ${g}, ${b})`;
  }

  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', color);
  }, [color]); 

  const handleColorChange = () => {
    setColor(generateLightRGBColor()); // Update the color
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
