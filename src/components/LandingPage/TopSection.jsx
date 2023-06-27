import React,{useState} from "react";
import './TopSection.css'

export const TopSection = ({ setUrl}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    setUrl(inputValue)
  };

  return (
      <div className="inputs" >
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Paster Url"
          className="input"
        />
        <button
          onClick={handleButtonClick}
          className="btn"
        >
          Submit
        </button>
      </div>
  );
};
