import React from 'react';
import { Container } from 'react-bootstrap';
import Inventory from './components/Inventory';

const App: React.FC = () => {
  return (
    <Container className="mt-4">
      <h1>Inventory Management</h1>
      <Inventory />
    </Container>
  );
};

export default App;
