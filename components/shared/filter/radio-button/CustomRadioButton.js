import React, { useState } from 'react';
import styled from 'styled-components';

// Define styled components with your CSS rules
const RadioButtonInput = styled.input`
  visibility: hidden;
  display:none;
`;

const RadioButtonLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  margin-bottom: 15px;
`;

const CustomRadiobutton = styled.span`
  height: 20px;
  width: 20px;
  cursor: pointer;
  background-color: ${(props) => props.color || '#d2c5ef'};
  display: inline-block;
  border-radius: 2px;
  box-shadow: 1.5px 1.5px 5px rgba(0,0,0,0.1);

  /* Apply styles when input is checked */
  ${RadioButtonInput}:checked + & {
    border: 1px solid ${(props) => props.color || '#d2c5ef'};
    background-color: ${(props) => props.color || '#d2c5ef'};
    outline: 2px solid ${(props) => props.color || '#d2c5ef'};
    outline-offset: 2px;
  }
`;

const RadiobuttonDiv = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

const CustomRadioButton = ({colors, color, handleColor}) => {

  return (
    <RadiobuttonDiv>
      <RadioButtonLabel>
        <RadioButtonInput
          type="radio"
          className="radiobutton-input"
          value={colors?.name}
          checked={color === colors?.name}
          onChange={handleColor}
        />
        <CustomRadiobutton  color={colors?.code}></CustomRadiobutton>
          {colors?.name}
      </RadioButtonLabel>
    </RadiobuttonDiv>
  );
};

export default CustomRadioButton;
