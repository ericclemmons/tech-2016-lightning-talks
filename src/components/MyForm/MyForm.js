import { computed, intercept, observe, observable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";

import Button from "./Button";
import Form from "./Form";
import Input from "./Input";
import sanitize from "./sanitize";

@observer
export default class MyForm extends React.Component {
  static defaultProps = {
    onChange: () => {},
    onSubmit: () => {},
  }

  @observable email = ""

  @computed get valid() {
    return this.email.includes("@highereducation.com");
  }

  componentDidMount() {
    intercept(this, "email", (change) => {
      change.newValue = sanitize(change.newValue);

      return change;
    });

    observe(this, "email", (value) => this.props.onChange({ email: value }));
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this[name] = value;
  }

  handleSubmit = (event) => {
    if (!this.valid) {
      return event.preventDefault();
    }

    this.props.onSubmit(event);
  }

  render() {
    return (
      <Form onChange={this.handleChange} onSubmit={this.handleSubmit}>
        <label>
          Email
          <Input name="email" type="text" placeholder="Enter a @highereducation.com email" value={this.email} />
        </label>

        <Button disabled={!this.valid} type="submit">
          Signup!
        </Button>
      </Form>
    )
  }
}
