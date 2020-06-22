import React from "react";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredData: [],
      columnSearch: "",
      searchInput: "",
    };
  }

  handleChange = (event) => {
    const val = event.target.value;
    this.setState({ searchInput: val }, () => this.globalSearch());
    this.props.handleSetSearchInput(val);
  };

  globalSearch = () => {
    const { searchInput, columnSearch } = this.state;
    let filteredData = this.props.data.filter((value) => {
      if (columnSearch) {
        return value[columnSearch]
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      }
      return (
        value.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.mode.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.type.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.status.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.userId.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.id.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.total.toString().toLowerCase().includes(searchInput.toLowerCase())
      );
    });

    this.props.handleSetFilteredData(filteredData);
  };

  setColumnSearch = (e) => {
    this.setState({ columnSearch: e.target.value }, () => this.globalSearch());
  };

  render() {
    const { columns } = this.props;
    const { columnSearch } = this.state;

    return (
      <>
        <br />
        <input
          size="large"
          name="searchInput"
          value={this.state.searchInput || ""}
          onChange={this.handleChange}
          label="Search"
        />
        <select
          onChange={(e) => {
            e.persist();
            this.setColumnSearch(e);
          }}
          value={columnSearch}
        >
          <option value=""> All columns</option>
          {columns.map((col) => {
            return <option value={col}>{col}</option>;
          })}
        </select>
        <br />
        <br />
      </>
    );
  }
}
