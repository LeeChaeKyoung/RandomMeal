import React, { useState } from "react";
import MapContainer from "./MapContainer";

const SearchPlace = () => {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(inputText === ''){
      alert('검색어를 입력하세요')
    }else{
    setPlace(inputText);
    setInputText("");
    }
  };

  return (
    <>
      <form className="inputForm" onSubmit={handleSubmit}>
        <input
          placeholder="Search Place..."
          onChange={onChange}
          value={inputText}
        />
        <button type="submit">검색</button>
      </form>
      <div className = "map_wrap">
      <MapContainer searchPlace={place} />
      <ul id="placeList"></ul>
      </div>
    </>
  );
};

export default SearchPlace;