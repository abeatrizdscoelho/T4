import '../style.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Cliente {
  id: number;
  nome: string;
  sobreNome: string;
  email: string;
  endereco: {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
  };
  telefones: { ddd: string, numero: string }[];
}

export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    fetch('http://localhost:32832/clientes')
      .then((res) => res.json())
      .then((data) => setClientes(data))
      .catch((err) => {
        console.error('Erro ao buscar clientes.', err);
        alert('Erro ao carregar a lista de clientes.');
      });
  }, []);

  function DeletarCliente(id: number) {
    fetch('http://localhost:32832/cliente/excluir', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    }).then((res) => {
      if (res.ok) {
        alert('Cliente excluído com sucesso!');
        setClientes(clientes.filter(cliente => cliente.id !== id)); //Verifica se {cliente.id} é diferente do {id} a ser removido.
      } else {
        alert('Erro ao excluir cliente.');
      }
    }).catch((err) => {
      console.error('Erro ao excluir cliente.', err);
    });
  }

  return (
    <div className="container">
      <h2>Clientes</h2>
      <p>Clientes cadastrados na World Beauty...</p>
      <div>
        <table className="table">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Cidade</th>
              <th>Editar</th>
              <th>Excluir</th>
              <th>Perfil</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nome} {cliente.sobreNome}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefones?.[0] ? `(${cliente.telefones[0].ddd}) ${cliente.telefones[0].numero}` : '—'}</td>
                <td>{cliente.endereco?.cidade || '—'}</td>
                <td>
                  <Link to={`/editar-cliente/${cliente.id}`}>
                    <img src="https://img.icons8.com/?size=20&id=86023&format=png&color=000000" alt="Editar" />
                  </Link>
                </td>
                <td>
                  <a onClick={() => DeletarCliente(cliente.id)}>
                    <img src="https://img.icons8.com/?size=20&id=nS7wslGWJu0R&format=png&color=000000" alt="Excluir" />
                  </a>
                </td>
                <td>
                  <Link to={`/cliente/${cliente.id}`} >
                    <img src="https://img.icons8.com/?size=20&id=82742&format=png&color=000000" alt="Detalhes" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='text-center mt-4'>
          <Link to="/cadastrar-cliente" className='btn btn-purple'>Cadastrar Cliente</Link>
        </div>
      </div>
    </div>
  );
}