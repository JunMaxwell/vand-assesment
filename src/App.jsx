import { useState } from 'react'
import { Nav } from 'react-bootstrap';
import { Route, Routes, useNavigate } from 'react-router';
import { Algorithm } from './Algorithm';
import './App.css'
import { DataTable } from './DataTable'

// Use the following API (https://api.covid19api.com/summary) as the data source for the app.
// Create an application with the following features
// 1. Make a list of countries which are most affected by Covid-19, and sort by the below rules:
//   1.a: The most total confirmed cases
//   1.b: The highest number of deaths
//   1.c: The lowest number of recovered cases
// 2. Be able to click to show up a popup displaying the selected country's information such as name, flag image, population, capital, region, subregion.
// Refer the API: https://restcountries.com (you can get country detail data by CountryCode (alpha2code) from summary API)

const SORT_BY = {
  Active: 'Active',
  TotalConfirmed: 'TotalConfirmed',
  TotalDeaths: 'TotalDeaths',
  TotalRecovered: 'TotalRecovered',
};

function App() {
  const [sortBy, setSortBy] = useState(SORT_BY.Active);
  const [filter, setFilter] = useState('');
  let navigate = useNavigate();

  const handleOnSelect = (val) => {
    navigate(val)
  }

  return (
    <div className="App py-2 h-100 row">
      <div className="col d-flex flex-column h-100 justify-content-center">
        <div className="d-flex flex-column align-items-center">
          <h3 className="text-info">Thien Y</h3>
          <header className="mb-2 col w-50">
            <Nav
              variant="pills"
              // activeKey={pathname}
              onSelect={handleOnSelect}
              className="d-flex flex-row row justify-content-around align-items-center"
            >
              <Nav.Item className='col'>
                <Nav.Link eventKey="/A">A: Algorithm</Nav.Link>
              </Nav.Item>
              <Nav.Item className='col'>
                <Nav.Link eventKey="/B">B: Application</Nav.Link>
              </Nav.Item>
            </Nav>
          </header>
        </div>
      </div>
      <Routes>
        <Route path="/A" element={<div className='d-flex mb-2'><Algorithm /></div>} />
        <Route path="/B" element={
          <div>
            <div className="d-flex mb-2">
              <label className="mr-1 mb-0">Filter</label>
              <input
                type="text"
                onChange={(e) => {
                  let value = e.target.value;
                  setFilter(value);
                }}
              ></input>
              <div style={{ flex: 1 }} />
              <label className="mr-1 mb-0">Sort by</label>
              <select
                onChange={(e) => {
                  let value = e.target.value;
                  setSortBy(value);
                }}
                value={sortBy}
              >
                <option value={SORT_BY.Active}>Active</option>
                <option value={SORT_BY.TotalConfirmed}>
                  Confirmed
                </option>
                <option value={SORT_BY.TotalDeaths}>Deaths</option>
                <option value={SORT_BY.TotalRecovered}>
                  Recovered
                </option>
              </select>
            </div>
            <DataTable sortBy={sortBy} filter={filter} />
          </div>
        } />
      </Routes>

    </div>);
}

export default App