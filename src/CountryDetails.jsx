import React, { useEffect, useState } from 'react';
import { Modal, Spinner, Alert, Card } from 'react-bootstrap';
import { getCountryDetailsByCode } from './AppServices';

export const CountryDetails = ({ country, show, onHide }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setErrors] = useState(null);

    useEffect(() => {
        if (country.CountryCode) {
            setLoading(true);
            getCountryDetailsByCode(country.CountryCode)
                .then((res) => {
                    if (res !== null) {
                        setData(res);
                        console.log(res);
                    }
                })
                .catch((err) => { setErrors(err); })
                .finally(() => { setLoading(false); setErrors(null); })
        }
    }, [country]);

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{country.Country}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="h-100 d-flex justify-content-center align-items-center">
                    {
                        loading ? (<Spinner animation="border" role="status" />)
                            :
                            error ? (<Alert variant="danger">{error}</Alert>)
                                :
                                data && (
                                    <Card>
                                        <Card.Img variant="top" src={data.flag} />
                                        <Card.Body>
                                            <Card.Title>
                                                <div className="d-flex justify-content-between">
                                                    <div>Country:</div>
                                                    <div>{data.name}</div>
                                                </div>
                                            </Card.Title>
                                            <Card.Text>
                                                <div className="d-flex justify-content-between">
                                                    <div>Country Code:</div>
                                                    <div>{data.alpha2Code}</div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <div>Population:</div>
                                                    <div>{data.population}</div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <div>Capital:</div>
                                                    <div>{data.capital}</div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <div>Region:</div>
                                                    <div>{data.region}</div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <div>Sub Region:</div>
                                                    <div>{data.subregion}</div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <div>Area:</div>
                                                    <div>{data.area}</div>
                                                </div>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                )
                    }
                </div>
            </Modal.Body>
        </Modal>
    )

};