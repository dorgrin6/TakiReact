import React from 'react';
import ReactDOM from 'react-dom';
import "./css/*";
import "./lib/*"


/* Directly adding react element */
ReactDOM.render(
    React.createElement('div',null, 'hello world'), 
    document.getElementById("root")
);
