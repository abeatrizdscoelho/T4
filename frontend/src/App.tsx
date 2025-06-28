import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';

import Clientes from './pages/Clientes/Clientes';
import EditarCliente from './pages/Clientes/EditarCliente';
import CadastrarCliente from './pages/Clientes/CadastrarCliente';
import DetalhesCliente from './pages/Clientes/DetalhesCliente';

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Clientes />} />
          <Route path="/cadastrar-cliente" element={<CadastrarCliente />} />
          <Route path="/cliente/:id" element={<DetalhesCliente />} />
          <Route path="/editar-cliente/:id" element={<EditarCliente />} />
        </Routes>
      </div>
    </Router>
  );
};
