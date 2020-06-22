import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Table from "../components/Table/Table";
// import Fields from "../components/NumberOfFields";
import { fetchData } from "../services";

export default function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchInput, setSearchInput] = useState([]);
  const [num, setNum] = useState(5);

  const numbers = [3, 5, 7, 9, 11];

  useEffect(() => {
    const fetchAPI = async () => {
      setData(await fetchData());
    };

    fetchAPI();
  }, []);

  const columns = [
    "id",
    "name",
    "mode",
    "type",
    "destination",
    "origin",
    "total",
    "status",
    "userId",
  ];

  const handleSetFilteredData = (filteredData) => {
    setFilteredData(filteredData);
  };

  const handleSetSearchInput = (searchInput) => {
    setSearchInput(searchInput);
  };
  const dataToDisplay = searchInput.length ? filteredData : data;

  return (
    <div className="container">
      <Search
        data={data}
        columns={columns}
        handleSetFilteredData={handleSetFilteredData}
        handleSetSearchInput={handleSetSearchInput}
      />
      {/* <Fields numbers={numbers} setNum={setNum} /> */}
      <Table data={dataToDisplay} num={num} />
    </div>
  );
}
