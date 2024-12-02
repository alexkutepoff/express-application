import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1024px;
  margin: 0 auto;
`;

const Container = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default Container;
