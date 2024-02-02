import React, { useState } from "react";
import styled from "styled-components";

const FileInput = ({ state, setState }) => {
  return (
    <InputLabel>
      <CustomInput type="file" onChange={setState} />
      <CustomButton>Select File</CustomButton>
      {state && <FileName>{state.name}</FileName>}
    </InputLabel>
  );
};

const InputLabel = styled.label`
  position: relative;
  display: inline-block;
  cursor: pointer;
  padding: 1rem 0;
`;

const CustomInput = styled.input`
  display: none;
`;

const CustomButton = styled.div`
  background: linear-gradient(45deg, #4caf50, #2196f3);
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  font-size: 16px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
`;

const FileName = styled.span`
  display: block;
  margin-top: 10px;
  font-size: 14px;
  color: #555;
`;

export default FileInput;
