import React from 'react';
import ReactDOM from 'react-dom';
import Form from './containers/form';

const wrapper = document.getElementById('create-article-form');
wrapper ? ReactDOM.render(<Form />, wrapper) : false; // eslint-disable-line
