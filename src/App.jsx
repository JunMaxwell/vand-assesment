import { useState } from 'react'
import { Col, Container, FormControl, InputGroup, Nav, Row } from 'react-bootstrap';
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
    <Container fluid className="App py-2 h-100">
      <div className="d-flex flex-column h-100 justify-content-center">
        <Row className="d-flex flex-column justify-content-center align-items-center">
          <Col className="justify-content-center align-items-center"><h3 className="text-info">Thien Y</h3></Col>
          <Col>
            <header className="mb-2">
              <Nav
                justify
                variant="pills"
                // activeKey={pathname}
                onSelect={handleOnSelect}
                className="justify-content-center align-items-center"
              >
                <Row className={`justify-content-around ${window.matchMedia("(max-width: 556px)").matches ? "flex-column" : "flex-row"} align-items-center`}>
                  <Col>
                    <Nav.Item>
                      <Nav.Link eventKey="/A">A: Algorithm</Nav.Link>
                    </Nav.Item>
                  </Col>
                  <Col>
                    <Nav.Item>
                      <Nav.Link eventKey="/B">B: Application</Nav.Link>
                    </Nav.Item>
                  </Col>
                </Row>
              </Nav>
            </header>
          </Col>
        </Row>
      </div>
      <Routes>
        <Route path="/A" element={<div className='d-flex mb-2'><Algorithm /></div>} />
        <Route path="/B" element={
          <>
            <Row className={`d-flex ${window.matchMedia("(max-width: 556px)").matches ? "flex-column" : "flex-row"}`}>
              <Col>
                <InputGroup className="d-flex mb-2">
                  <InputGroup.Text>Filter</InputGroup.Text>
                  <FormControl type='text'
                    onChange={(e) => {
                      let value = e.target.value;
                      setFilter(value);
                    }} />
                </InputGroup>
              </Col>
              <Col>
                <InputGroup className="d-flex mb-2">
                  <InputGroup.Text>Sort by</InputGroup.Text>
                  <FormControl as="select"
                    onChange={(e) => {
                      let value = e.target.value;
                      setSortBy(value);
                    }}
                    value={sortBy}
                  >
                    <option value={SORT_BY.Active}>Active</option>
                    <option value={SORT_BY.TotalConfirmed}>Confirmed</option>
                    <option value={SORT_BY.TotalDeaths}>Deaths</option>
                    <option value={SORT_BY.TotalRecovered}>Recovered</option>
                  </FormControl>
                </InputGroup>
              </Col>
            </Row>
            <DataTable sortBy={sortBy} filter={filter} />
          </>
        } />
      </Routes>
    </Container>);
}

export default App