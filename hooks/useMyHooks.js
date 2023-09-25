import { useState, useEffect } from 'react';

export const useRandonColor = ({myVa}) => {
  const [color, setColor] = useState("");

  const changeColor = (prams) => {
    console.log(prams);
    setColor(Math.random().toString(16).substring(-10))
  }
  return { myVa, color, changeColor}
}

export const useCustomStrings = () => {
  const [customString] = useState(" this is string hooks")
  return { customString }
}

export const testFoxData = 'this is custom fox data'