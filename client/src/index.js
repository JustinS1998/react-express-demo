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

    const postData = async (url='', data={}) => {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data)
        });
        return response.json();
    };

    const handleClick = async () => {
        postData('/message', {message: text})
            .catch((error) => console.error(error));
    };

    return (
        <>
        <p>{!data ? "Loading..." : data}</p>
        <input type="text" value={text} onChange={handleChange}/>
        <button onClick={handleClick}>Submit</button>
        </>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));