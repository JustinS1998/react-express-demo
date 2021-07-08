import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import "./style.css";

function App(props) {
    const [data, setData] = useState(null);
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        updateMessages();
        fetch("/api")
            .then((res) => res.json())
            .then((data) => setData(data.message));
    }, []);

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const axios = require('axios');
    const handleClick = async () => {
        axios.post('/message', { "message": text })
            .then((response) => {
                console.log(response);
                updateMessages();
            })
            .catch((error) => console.error(error)); 
    };
    const updateMessages = async () => {
        axios.get('/message')
            .then((response) => {
                setMessages([...response.data]);
            })
            .catch((error) => console.error(error));
    };

    return (
        <>
            <p>{!data ? "Loading..." : data}</p>
            <div>
                <input type="text" value={text} onChange={handleChange} />
                <button onClick={handleClick}>Submit</button>
            </div>
            <div>
                <button onClick={updateMessages}>Get Data</button>
                <li>
                    {messages.map((element) => {
                        return <ul key={element["message"]}>{element["message"]}</ul>
                    })}
                </li>
            </div>
        </>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));