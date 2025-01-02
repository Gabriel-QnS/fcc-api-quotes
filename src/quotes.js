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

function QuoteCaller({colorer}) {
  const [header, setHeader] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [fetching, setFetching] = useState(false)

  const fetchQuote = async () => { 
    setFetching(true)
    try {
      const apiKey = 'AaqLgv88Gb+HBi1ZCCXSqQ==DszVMAXwqrIlRHp6';
      const apiUrl = `https://api.api-ninjas.com/v1/quotes`; // API source updated their plans. Category is no longer a free feature, most of the code related to this is being commented out
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
        const formatedCategory = data[0].category.toUpperCase()
        setCategory(`on the topic of "${formatedCategory}"`);
        setFetching(false); console.log('Fetching Done');
        const changeColors = colorer;
        changeColors()
      } else {
        console.log('Falsey data');
      }
    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  };

  useEffect(() => {
    fetchQuote()
  }, []); 

  const handleCall = () => { 
    fetchQuote(); // Call the fetchQuote function when the "Get Quote" button is clicked
  };

  const handleTwitter = () => {
    const tweet = `${header} ${author}`
    window.open(`https://twitter.com/intent/tweet?text=${tweet}`, '_blank');
  }

  return (
    <main id="quote-box">
      <div id="category" category="life">
        Get a quote from a famous historical figure
        {/* <OptionSelection handler={setCategory} /> */}
      </div>
      <div id="text" className={`quote ${header ? 'filled' : ''}`}>
        {fetching ? 'Loading quote...' : header}
      </div>
      <div id="author" className="author">
        <b>{fetching ? 'Loading name...' : author}</b>,<br></br>{fetching ? 'Loading type...' : category}
      </div>
      <div id="category" className="category">
        
      </div>
      {header && ( // Only render the button if a quote has been fetched
      <button id="new-quote" onClick={handleCall}>
        Get a new quote
      </button>
      )}
      {/* ... rest of the JSX (unchanged) */}
      <div>
      <span>Share on:</span>
      <a onClick={handleTwitter} href="" >
        <button id="tweet-quote">
        <img id="twitter-icon" src={icon} alt="X-Twitter Icon" />
        {/* Twitter: function() { window.open('https://twitter.com/intent/tweet?text=Hello%20World', '_blank'); */}
      </button>
      </a>
      </div>
    </main>
  );

};
export default QuoteCaller;