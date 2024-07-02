import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/styles.css';

import { useState, useEffect } from 'react';

function App() {
  const [trialCount, setTrialCount] = useState(() => {
    return JSON.parse(window.localStorage.getItem('COUNT')) || 1
  });
  const [listTrials, setListTrials] = useState(() => {
    return JSON.parse(window.localStorage.getItem('LIST_TRIALS')) || []
  });

  useEffect(() => {
    window.localStorage.setItem('COUNT', JSON.stringify(trialCount));
  }, [trialCount]);

  useEffect(() => {
    window.localStorage.setItem('LIST_TRIALS', JSON.stringify(listTrials));
  }, [listTrials]);
  
  function handlePlus() {
    setTrialCount(trialCount + 1);
  }
  function handleMinus() {
    if (trialCount > 1) {
      setTrialCount(trialCount - 1);
    };
  }
  function handleStart() {
    let ts = Date.now() // seconds
    let unix = new Date(ts);

    let dictTrial = {id: listTrials.length, trial: trialCount, type: 'start', time: String(unix), valid: true};
    
    setListTrials([dictTrial, ...listTrials])
  }
  function handleStop() {
    let ts = Date.now() // seconds
    let unix = new Date(ts);

    let dictTrial = {id: listTrials.length, trial: trialCount, type: 'stop', time: String(unix), valid: true};
    
    setListTrials([dictTrial, ...listTrials])
  }
  function handleReset() {
    setTrialCount(1);
    setListTrials([]);
  }
  function handleValid(id) {
    const newList = listTrials.map((item) => {
      if (item.id === id) {
        const updatedItem = {
          ...item,
          valid: !item.valid,
        };

        return updatedItem;
      }

      return item;
    });

    setListTrials(newList);
  }
  function convertToCSV(arr) {
    const array = [Object.keys(arr[0])].concat(arr)
  
    return array.map(it => {
      return Object.values(it).toString()
    }).join('\n')
  }
  function handleExport() {
    if (listTrials.length > 0) {
        console.log([convertToCSV(listTrials)])
        var m = new Date();
        var dateString =
            m.getFullYear() + "-" +
            ("0" + (m.getMonth()+1)).slice(-2) + "-" +
            ("0" + m.getDate()).slice(-2) + "_" +
            ("0" + m.getHours()).slice(-2) + "-" +
            ("0" + m.getMinutes()).slice(-2) + "-" +
            ("0" + m.getSeconds()).slice(-2);
        var blob = new Blob([convertToCSV(listTrials)], {type: "text/plain;charset=utf-8"});
        var fileName = "synctime_" + dateString + ".csv";

        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
    }
}

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Trial Sync App</Navbar.Brand>
          <Nav>
            <Nav.Link href="https://uwaterloo.ca/neurocognition-mobility-lab">Neuro-cognition & Mobility Lab</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Card style={{ width: '98vw', boxShadow: "1px 4px 4px #e1e1e1", margin: '1vw' }}>
        <Card.Body>
          <Card.Title>Trial Count: {trialCount}</Card.Title>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
          </div>
          <hr  style={{
              color: '#000000',
              backgroundColor: '#000000',
              height: 0.5,
              borderColor : '#000000'
          }}/>
          <div style={{display: 'flex', justifyContent: 'center'}}>
              <Button variant="success" size="xxl" onClick={handleStart}>Start</Button>
              <Button variant="danger" size="xxl" onClick={handleStop}>Stop</Button> 
              <div style={{display: 'flex', flexDirection: 'column', width: '15vw', marginLeft: '16px', marginBottom: '8px'}}>
                <Button variant="dark" size="xl" onClick={handlePlus}>+</Button>
                <Button variant="dark" size="xl" onClick={handleMinus}>-</Button>
              </div>            
          </div>
          <Button variant="dark" size="block" onClick={handleReset}>Reset</Button>
        </Card.Body>
      </Card>

      <Card style={{width: '98vw', margin: '1vw', boxShadow: "1px 4px 8px #e1e1e1"}}>
        <Card.Body>
          <Card bg='primary' text="light" style={{width: '100%', boxShadow: "1px 4px 8px #e1e1e1", position: 'sticky', top: '0', zIndex: '1', height: '12vh'}}>
            <Card.Body>
              <Card.Title style={{display: 'flex', justifyContent: 'center'}}>Data</Card.Title>
              <div style={{marginBottom: '2px', display: 'flex', justifyContent: 'center'}}>
                <Button variant="warning" onClick={handleExport}>Export</Button>
              </div>
            </Card.Body>
          </Card>
          <Table striped bordered hover>
            <thead style={{position: 'sticky', top: '12vh', zIndex: '1'}}>
              <tr>
                <th>Trial #</th>
                <th>Event</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {listTrials.map((itemTrial, index) => {
                return (
                  <tr key={index}>
                    <td style={{
                      textDecoration : itemTrial.valid ? "none" : "line-through",
                      color : itemTrial.valid ? "black" : "red",
                    }}>{itemTrial.trial}</td>
                    <td style={{
                      textDecoration : itemTrial.valid ? "none" : "line-through",
                      color : itemTrial.valid ? "black" : "red",
                    }}>{itemTrial.type}</td>
                    <td style={{
                      textDecoration : itemTrial.valid ? "none" : "line-through",
                      color : itemTrial.valid ? "black" : "red",
                    }}
                    onClick={() => handleValid(itemTrial.id)}>{itemTrial.time}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
          </Card.Body>
      </Card>
    </>
  );
}

export default App;