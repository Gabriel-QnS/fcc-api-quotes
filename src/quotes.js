'use client';
import { useState, useEffect } from "react";

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

function QuoteCaller(){//parent

const [header, setHeader] = useState('');
const [author, setAuthor] = useState('');
const [extra, setExtra] = useState('');
const [category, setCategory] = useState('life') // default

async function quoteCall(category){
    const apiKey = 'AaqLgv88Gb+HBi1ZCCXSqQ==DszVMAXwqrIlRHp6';
    const apiUrl = `https://api.api-ninjas.com/v1/quotes?category=${category}`;

    console.log('API URL USED: ',apiUrl)
        
    try {
        const response = await fetch(apiUrl, {
          headers: {
            'X-Api-Key': apiKey
          }
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        let data = await response.json();
    
        // Do something with the returned quote data
        if (data){
            console.log(response, data)
            setHeader(`"${data[0].quote}"`);
            setExtra(`${data[0].category}`)
            setAuthor(`By: ${data[0].author}`);
        } else {
            console.log('falsey data')
        }
        
      } catch (error) {
        console.error('Error fetching quotes:', error);
      }};

      function handleCall(){
        quoteCall(category);
      };

      function checkState(){
        console.log(category)
      }

      function emptyQuote(){
        
      }

    return (
    <main id="quote-box" >
        <div id="category" category="life">Have a quote on the topic of <OptionSelection handler={setCategory} /></div>
        <div id="text" className={`quote ${header? "filled" : ""}`}>{header? header : 'Your quote will show up here'}</div>
        <div id="author" className="author">{author}</div>
        <button onClick={handleCall}>Get a Quote</button>
        <button onClick={emptyQuote}>Empty</button>
    </main>
)

};
export default QuoteCaller;