import styled from "styled-components";

export default styled.button`
  background: #369;
  color: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.5);
  border: 0;
  padding: 1em;

  &:hover {
    background: #69b;
    cursor: pointer;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
