import React, {useState} from 'react';
import './Chat.css';
import SockJsClient from "react-stomp";

function Chat() {
    let [ref, setRef] = useState(null);
    let [messages, setMessages] = useState([]);
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
        <div className="chat">
            <div className="messages">
                {messages.map((x, i) => <p key={i}>{x}</p>)}
                <SockJsClient url='https://notarius-api.herokuapp.com/chat' topics={['/topic']}
                              onMessage={(msg) => {
                                  console.log(msg)

                                  setMessages([...messages, msg]);
                              }}
                              ref={(client) => {
                                  setRef(client);
                              }}/>
            </div>
            <div className="send">
                <input onChange={onChange} onKeyDown={onKeyDown} style={{minWidth: "100hv"}} value={value}/>
            </div>
        </div>
    );
}

export default Chat;
