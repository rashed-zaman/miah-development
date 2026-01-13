import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// const options = ['Option 1', 'Option 2'];
const optionsTwo = [
  {id: 1, name: 'Options One'},
  {id: 2, name: 'Options Two'},
];

export default function TesingAutoComplete({ options }) {
  const [value, setValue] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');
  
  React.useEffect(() => {
    if (options[0] !== undefined) { 
      setValue(options[0])
      console.log(options[0]);
    }
    console.log(options[0]);
  }, [options]);

  const havVal = true
  const autoCompleteConfig = {
    value: havVal ? value : false,
    inputValue: havVal ? value : false,
  }
  return (
    <div>

      <Autocomplete
        {...autoCompleteConfig}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        getOptionLabel={(option) => option.name}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Controllable" />}
      />


    </div>
  );
}
