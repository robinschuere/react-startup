import React, { Component } from 'react';
import Input from '../components/input';

class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      seoTitle: '',
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }

  render() {
    const { seoTitle } = this.state;
    return (
      <form id="article-form">
        <Input
          text="SEO title"
          label="seo_title"
          type="text"
          id="seo_title"
          value={seoTitle}
          handleChange={this.handleChange}
        />
      </form>
    );
  }
}
export default FormContainer;
