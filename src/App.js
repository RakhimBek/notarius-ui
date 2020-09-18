import React, {useState} from 'react';
import './App.css';
import SockJsClient from "react-stomp";

function App() {

    let [ref, setRef] = useState(null);
    let [messages, setMessages] = useState(['fvrtb', 'rtbt']);
    let [value, setValue] = useState("");

    let onKeyDown = (e) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            ref.sendMessage('/app/message', value);
            setValue('');
        }
    };

    let onChange = (e) => {
        setValue(e.target.value)
    }

    return (
        <div className="App">
            <header className="App-header">
                <input onChange={onChange} onKeyDown={onKeyDown} style={{minWidth: "100hv"}} value={value} />
            </header>
            <div className="app-body">
                {messages.map(x => <p key={x}>{x}</p>)}
                <SockJsClient url='https://notarius-api.herokuapp.com/chat' topics={['/topic']}
                              onMessage={(msg) => {
                                  console.log(msg)

                                  setMessages([msg, ...messages]);
                              }}
                              ref={(client) => {
                                  setRef(client);
                              }}/>
            </div>
        </div>
    );
}

export default App;
