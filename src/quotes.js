'use client';
import { useState, useEffect } from "react";
import icon from "./twitter.png"

function OptionSelection(props){//child
  const [category, setCategory] = useState('life');

    const words = ["age","alone","amazing","anger","architecture","art","attitude","beauty","best","birthday","business","car","change","communication","computers","cool","courage","dad","dating","death","design","dreams","education","environmental","equality","experience","failure","faith","family","famous","fear","fitness","food","forgiveness","freedom","friendship","funny","future","god","good","government","graduation","great","happiness","health","history","home","hope","humor","imagination","inspirational","intelligence","jealousy","knowledge","leadership","learning","legal","life","love","marriage","medical","men","mom","money","morning","movies","success"];

    function handleChange(e){
      setCategory(e.target.value)//set local category
      props.handler(e.target.value)//send it upwards in the hierarchy of elements, to another state
    };

    return (
        <select value={category} onChange={handleChange} id="selection" name="category">
          {words.map(str => {
            return <option key={str} className="option">{str}</option>
          })}
        </select>
    )
}

function QuoteCaller() {
  const [header, setHeader] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('life');

  const fetchQuote = async () => { 
    try {
      const apiKey = 'AaqLgv88Gb+HBi1ZCCXSqQ==DszVMAXwqrIlRHp6';
      const apiUrl = `https://api.api-ninjas.com/v1/quotes?category=${category}`;
      console.log('API URL USED:', apiUrl);

      const response = await fetch(apiUrl, {
        headers: {
          'X-Api-Key': apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data) {
        setHeader(`"${data[0].quote}"`);
        setAuthor(`By: ${data[0].author}`);
      } else {
        console.log('Falsey data');
      }
    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  };

  useEffect(() => {
    fetchQuote(); 
  }, []); 

  const handleCall = () => { 
    fetchQuote(); // Call the fetchQuote function when the "Get Quote" button is clicked
  };

  return (
    <main id="quote-box">
      <div id="category" category="life">
        Get a random quote from history in your selected topic:
        <OptionSelection handler={setCategory} />
      </div>
      <div id="text" className={`quote ${header ? 'filled' : ''}`}>
        {header ? header : 'Your quote will show up here'}
      </div>
      <div id="author" className="author">
        {author}
      </div>
      <button id="new-quote" onClick={handleCall}>
        Get a Quote
      </button>
      {/* ... rest of the JSX (unchanged) */}
      <span>Share:</span>
      <button id="tweet-quote">
        <a href="_blank" ><img id="twitter-icon" src={icon} alt="X-Twitter Icon" /></a>
      </button>
    </main>
  );

};
export default QuoteCaller;