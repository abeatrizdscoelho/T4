import '../style.css';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ClienteDetalhes() {
  const { id } = useParams();
  const [cliente, setCliente] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:32832/cliente/${id}`)
      .then(res => res.json())
      .then(data => setCliente(data))
      .catch(err => {
        console.error('Erro ao carregar cliente.', err);
      });
  }, [id]);

  if (!cliente) return <p>Carregando dados do cliente...</p>;

  return (
    <div className="container mt-4">
      <h2>Detalhes do Cliente</h2>
      <div className="border rounded p-4 bg-light">
        <h5><strong>{cliente.nome} {cliente.sobreNome}</strong></h5>
        <p className='mt-3'><strong>Email:</strong> {cliente.email}</p>
        <p><strong>Telefone:</strong> {cliente.telefones && cliente.telefones.length > 0 && (<span>({cliente.telefones[0].ddd}) {cliente.telefones[0].numero}</span>)}</p>
        <h6 className="mt-3"><strong>Endereço</strong></h6>
        {cliente.endereco ? (
          <ul className="list-unstyled">
            <li><strong>Rua:</strong> {cliente.endereco.rua}, {cliente.endereco.numero}</li>
            <li><strong>Bairro:</strong> {cliente.endereco.bairro}</li>
            <li><strong>Cidade:</strong> {cliente.endereco.cidade} - {cliente.endereco.estado}</li>
            <li><strong>CEP:</strong> {cliente.endereco.codigoPostal}</li>
            {cliente.endereco.informacoesAdicionais && (
              <li><strong>Complemento:</strong> {cliente.endereco.informacoesAdicionais}</li>
            )}
          </ul>
        ) : (
          <p>Endereço não cadastrado.</p>
        )}
        <div className="mt-4">
          <Link to="/" className="btn btn-purple">Voltar</Link>
        </div>
      </div>
    </div>
  );
}