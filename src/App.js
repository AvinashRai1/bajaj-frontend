import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [filter, setFilter] = useState([]);

    const handleSubmit = async () => {
        try {
            const parsedInput = JSON.parse(jsonInput);
            const res = await fetch('https://bajaj-8t9x.onrender.com/bfhl', {    
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(parsedInput),
            });
            const data = await res.json();
            setResponse(data);
        } catch (error) {
            alert('Invalid JSON or server error!');
        }
    };

    const renderResponse = () => {
        if (!response) return null;
        let filteredResponse = {};
        if (filter.includes('Numbers')) filteredResponse.numbers = response.numbers;
        if (filter.includes('Alphabets')) filteredResponse.alphabets = response.alphabets;
        if (filter.includes('Highest Lowercase Alphabet')) filteredResponse.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
        return (
            <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
        );
    };

    return (
        <div className="App">
            <h1>Bajaj Finserv Health Dev Challenge</h1>
            <textarea
                rows="10"
                cols="50"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='Enter JSON here'
            ></textarea>
            <button onClick={handleSubmit}>Submit</button>
            <div>
                <label>
                    <input type="checkbox" value="Numbers" onChange={(e) => setFilter([...filter, e.target.value])} />
                    Numbers
                </label>
                <label>
                    <input type="checkbox" value="Alphabets" onChange={(e) => setFilter([...filter, e.target.value])} />
                    Alphabets
                </label>
                <label>
                    <input type="checkbox" value="Highest Lowercase Alphabet" onChange={(e) => setFilter([...filter, e.target.value])} />
                    Highest Lowercase Alphabet
                </label>
            </div>
            {renderResponse()}
        </div>
    );
};

export default App;
