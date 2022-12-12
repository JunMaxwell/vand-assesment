import React, { useCallback, useEffect, useState } from 'react';
import { Card, Form, InputGroup, Table } from 'react-bootstrap';
import lodash from 'lodash';

// Function that took input array and target number.
// Make the target number of groups from the input array.
// Items in each group should be choosen randomly
// Each group should have the same number of characters.
// Example: input = ["A", "B", "C", "D", "E", "F", "G", "H"], target = 3
// Output: [["A", "B", "C"], ["D", "E", "F"], ["G", "H"]]
// [3] [3] [2] = OK: Divided equally
// [1] [3] [4] = NG: Divided unequally
const reg = /^[a-zA-Z\d\s\-'#(),"0-9]*$/
const defaultList = ["A", "B", "C", "D", "E", "F", "G", "H"];
const defaultTarget = 3;

const putItemIntoGroupsRandomly = (input, target) => {
    const inputArray = [...input]; // Spread input elements to new array
    const result = [];
    const inputLength = inputArray.length;
    const groupLength = Math.floor(inputLength / target);
    const remainder = inputLength % target;
    for (let i = 0; i < target; i++) { // We will need to loop through the `target` number of times
        const temp = [];
        for (let j = 0; j < groupLength; j++) {
            const randomIndex = Math.floor(Math.random() * inputArray.length); // Use inputArray.length instead of inputLength since we've updated the inputArray
            temp.push(inputArray[randomIndex]);
            inputArray.splice(randomIndex, 1);
        }
        if (i < remainder) {
            const randomIndex = Math.floor(Math.random() * inputArray.length);
            temp.push(inputArray[randomIndex]);
            inputArray.splice(randomIndex, 1);
        }
        result.push(temp);
    }
    return result;
}

// Return An input array of characters, and a target numbers input 
export const Algorithm = () => {
    const [input, setInput] = useState([]);
    const [target, setTarget] = useState(0);
    const [result, setResult] = useState(null);

    const handleInput = (inputValue) => {
        if (!reg.test(inputValue)) return;
        inputValue = inputValue.replace(/\s/g, '') // Remove White spaces
        const inputArray = inputValue.trim().split(',').filter((item) => item !== ''); // Split by comma
        setInput(new Set([...inputArray])) // Unigue array
    }

    const debouncFn = useCallback(lodash.debounce(handleInput, 500), []);  // Fire 500 ms AFTER user stop typing

    const handleOnChange = (e) => {
        debouncFn(e.target.value);
    }

    useEffect(() => {
        setInput(new Set([...defaultList.filter(item => item !== '')]));
        setTarget(defaultTarget);
    }, [])

    useEffect(() => {
        if (!input || !target) return;
        const temp = putItemIntoGroupsRandomly(input, target);
        console.log(temp);
        setResult(temp);
    }, [input, target]);

    return (
        <div className='h-100 w-100'>
            <Form.Text muted>
                Input an array of Characters separated by commas
            </Form.Text>
            <InputGroup className='mb-3'>
                <InputGroup.Text>
                    Input arrays
                </InputGroup.Text>
                <Form.Control
                    type='text'
                    defaultValue={defaultList}
                    aria-label="Default"
                    onChange={handleOnChange}
                />
            </InputGroup>
            <Form.Text muted>
                Input a target number
            </Form.Text>
            <InputGroup className='mb-3'>
                <InputGroup.Text>
                    Target number
                </InputGroup.Text>
                <Form.Control
                    type='number'
                    defaultValue={defaultTarget}
                    aria-label="Default"
                    onChange={(e) => {
                        setTarget(e.target.value);
                    }}
                    min={0}
                />
            </InputGroup>
            <Card>
                <Card.Header>
                    Result
                </Card.Header>
                <Card.Body>
                    {
                        result &&
                        <Table>
                            <thead>
                                <tr>
                                    <th>Group</th>
                                    <th>Items</th>
                                    <th>Array</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    result.map((items, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{items.join(', ')}</td>
                                                <td>[{items.toString()}]</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    }
                </Card.Body>
            </Card>
        </div>
    )
}