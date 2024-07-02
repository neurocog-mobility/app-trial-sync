import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/styles.css';

function Controls() {
  return (
    <Card style={{ width: '100%' }}>
      <Card.Body>
        <Card.Title>Trial Controls</Card.Title>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <div style={{display: 'flex', flexDirection: 'column', width: '15vw'}}>
                <Button variant="dark" size="xl">+</Button>
                <Button variant="dark" size="xl">-</Button>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <Card.Text style={{fontSize: '2.5rem', marginLeft: '8px'}}>Trial: </Card.Text>
            </div>
        </div>
        <hr  style={{
            color: '#000000',
            backgroundColor: '#000000',
            height: 0.5,
            borderColor : '#000000'
        }}/>
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <Button variant="success" size="xxl">Start</Button>
            <Button variant="danger" size="xxl">Stop</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Controls;