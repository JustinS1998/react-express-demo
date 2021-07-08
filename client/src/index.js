import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

function App(props) {
    const [data, setData] = useState(null);
    const [text, setText] = useState('');

    useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => setData(data.message));
    }, []);

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const axios = require('axios');
    const handleClick = async () => {
        axios.post('/message', {"message": text})
            .then((response) => console.log(response))
            .catch((error) => console.error(error));
    };
    const handleClickGet = async () => {
        axios.get('/message')
            .then((response) => console.log(response))
            .catch((error) => console.error(error));
    };

    return (
        <>
        <p>{!data ? "Loading..." : data}</p>
        <input type="text" value={text} onChange={handleChange}/>
        <button onClick={handleClick}>Submit</button>
        <button onClick={handleClickGet}>Get Data</button>
        </>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));