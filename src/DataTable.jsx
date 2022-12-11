import React, { useEffect, useState } from 'react';
import { Spinner, Table, Alert } from 'react-bootstrap';
import { getCovidSumary } from './AppServices';
import { CountryDetails } from './CountryDetails';

export const DataTable = ({ sortBy, filter }) => {
    const [data, setData] = useState([]); // data from API
    const [loading, setLoading] = useState(false); // loading state
    const [summary, setSummary] = useState(null); // summary data
    const [records, setRecords] = useState([]); // records data
    const [error, setErrors] = useState(null); // error state
    const [modalShow, setModalShow] = useState(false); // show modal state
    const [selectedCountry, setSelectedCountry] = useState(null); // selected country

    useEffect(() => {
        setLoading(true);
        getCovidSumary().then((res) => {
            if (res !== null || res.length > 0) {
                setData(res); // set data from API, keep a ref to original
                const { Countries, Global } = res; // destructure data
                mapData(Countries, Global); // map Countries and Global data
            }
        }).catch((err) => {
            setErrors(err);
        }).finally(() => {
            setLoading(false);
            setErrors(null);
        })
    }, [])

    useEffect(() => {
        if (!data || data.length === 0) return;
        const { Countries, Global } = data;
        mapData(Countries, Global);
    }, [sortBy, filter]);

    const mapData = (Countries, Global) => {
        setRecords(Countries
            .map((country) => {
                return {
                    ...country,
                    Active: country.TotalConfirmed - country.TotalDeaths - country.TotalRecovered,
                };
            })
            .filter(country => {
                if (!filter) return true;
                return country.Country.toLowerCase().includes(filter.toLowerCase());
            })
            .sort((a, b) => {
                return a[sortBy] < b[sortBy] ? 1 : -1;
            })
        );

        if (Global) {
            setSummary({
                Active: Global.TotalConfirmed - Global.TotalDeaths - Global.TotalRecovered,
                TotalConfirmed: Global.TotalConfirmed,
                TotalDeaths: Global.TotalDeaths,
                TotalRecovered: Global.TotalRecovered,
            })
        }
    }

    const onCountrySelected = (country) => {
        setModalShow(true);
        setSelectedCountry(country);
    }

    return (
        <div className="h-100 overflow-auto">
            {
                loading ? (
                    <div className="h-100 d-flex justify-content-center align-items-center">
                        <Spinner animation="border" variant="secondary" />
                    </div>)
                    :
                    error ? (
                        <div classsName="h-100 d-flex justify-content-center align-items-center">
                            <Alert variant="danger">{error.toString()}</Alert>
                        </div>)
                        :
                        (<Table responsive striped bordered hover variant='dark'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Country</th>
                                    <th className="text-right">Active</th>
                                    <th className="text-right">Deaths</th>
                                    <th className="text-right">Recovered</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records.map((country, i) => {
                                    return (
                                        <tr key={country.CountryCode} onClick={() => onCountrySelected(country)}>
                                            <td>{i + 1}</td>
                                            <td>{country.Country}</td>
                                            <td className="text-right">{country.Active}</td>
                                            <td className="text-right">
                                                {country.TotalDeaths}
                                            </td>
                                            <td className="text-right">
                                                {country.TotalRecovered}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            {summary && (
                                <tfoot>
                                    <tr className="font-weight-bold">
                                        <td>Totals</td>
                                        <td>-</td>
                                        <td className="text-right">{summary.Active}</td>
                                        <td className="text-right">
                                            {summary.TotalDeaths}
                                        </td>
                                        <td className="text-right">
                                            {summary.TotalRecovered}
                                        </td>
                                    </tr>
                                </tfoot>
                            )}
                        </Table>
                        )
            }
            {selectedCountry && <CountryDetails country={selectedCountry} show={modalShow} onHide={() => setModalShow(false)} />}
        </div>
    );
}