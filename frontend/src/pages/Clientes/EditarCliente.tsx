import '../style.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditarCliente() {
    const { id } = useParams(); //Extrai parâmetros (id) da URL.
    const navigate = useNavigate(); //Navega entre rotas.
    const [nome, setNome] = useState('');
    const [sobreNome, setSobreNome] = useState('');
    const [email, setEmail] = useState('');
    const [ddd, setDdd] = useState('');
    const [numeroTelefone, setNumeroTelefone] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [codigoPostal, setCodigoPostal] = useState('');
    const [informacoesAdicionais, setInformacoesAdicionais] = useState("");

    useEffect(() => {
        fetch(`http://localhost:32832/cliente/${id}`)
            .then(res => res.json())
            .then(data => {
                setNome(data.nome);
                setSobreNome(data.sobreNome);
                setEmail(data.email);
                const numeroCompleto = data.telefones?.[0]?.numero || '';
                setDdd(data.telefones?.[0]?.ddd || '');
                setNumeroTelefone(data.telefones?.[0]?.numero || '');
                setRua(data.endereco?.rua || ''); // '||' Evita deixar campos em branco com valores nulos ou indefinidos.
                setNumero(data.endereco?.numero || '');
                setBairro(data.endereco?.bairro || '');
                setCidade(data.endereco?.cidade || '');
                setEstado(data.endereco?.estado || '');
                setCodigoPostal(data.endereco?.codigoPostal || '');
                setInformacoesAdicionais(data.endereco?.informacoesAdicionais || '');
            })
            .catch(err => {
                console.error('Erro ao carregar cliente.', err);
                alert('Erro ao carregar os dados do cliente.');
            });
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const clienteEditado = {
            id: Number(id),
            nome,
            sobreNome,
            email,
            endereco: { codigoPostal, rua, numero, bairro, cidade, estado, informacoesAdicionais },
            telefones: [{ ddd, numero: numeroTelefone }]
        };

        try {
            const response = await fetch('http://localhost:32832/cliente/atualizar', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(clienteEditado),
            });

            if (response.ok) {
                alert(`Cliente atualizado com sucesso!`);
                navigate('/');
            } else {
                alert('Erro ao atualizar cliente.');
            }
        } catch (error) {
            console.error('Erro na requisição.', error);
        }
    };

    return (
        <div className="container">
            <h2 className='mb-4 text-center'>Editar Cliente</h2>
            <div className="card shadow border p-4">
                <form onSubmit={handleSubmit}>
                    <div className="row mt-4 mb-3">
                        <div className="col-md-6">
                            <label htmlFor="nome" className="form-label">Nome</label>
                            <input type="text" className="form-control" id="nome" placeholder="Digite o nome" value={nome} onChange={e => setNome(e.target.value)} required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="sobrenome" className="form-label">Sobrenome</label>
                            <input type="text" className="form-control" id="sobrenome" placeholder="Digite o sobrenome" value={sobreNome} onChange={e => setSobreNome(e.target.value)} required />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">E-mail</label>
                        <input type="text" className="form-control" id="email" placeholder="Digite seu e-mail" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <label htmlFor='ddd' className="form-label">DDD</label>
                            <input type='number' className="form-control" id='ddd' placeholder='(00)' value={ddd} onChange={e => setDdd(e.target.value)} required />
                        </div>
                        <div className="col-md-9">
                            <label htmlFor='numero' className="form-label">Número do Telefone</label>
                            <input type='number' className="form-control" id='numero' placeholder='00000-0000' value={numeroTelefone} onChange={e => setNumeroTelefone(e.target.value)} required />
                        </div>
                    </div>
                    <div className="row mt-4 mb-3">
                        <div className="col-md-5">
                            <label htmlFor="cep" className="form-label">CEP</label>
                            <input type="text" className="form-control" id="cep" placeholder="00000-000" value={codigoPostal} onChange={e => setCodigoPostal(e.target.value)} required />
                        </div>
                        <div className="col-md-5">
                            <label htmlFor="rua" className="form-label">Rua</label>
                            <input type="text" className="form-control" id="rua" placeholder="Digite a rua" value={rua} onChange={e => setRua(e.target.value)} required />
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="numero" className="form-label">Número</label>
                            <input type="text" className="form-control" id="numero" placeholder="Nº" value={numero} onChange={e => setNumero(e.target.value)} required />
                        </div>
                    </div>
                    <div className="row mt-4 mb-3">
                        <div className="col-md-5">
                            <label htmlFor="bairro" className="form-label">Bairro</label>
                            <input type="text" className="form-control" id="bairro" placeholder="Digite o bairro" value={bairro} onChange={e => setBairro(e.target.value)} required />
                        </div>
                        <div className="col-md-5">
                            <label htmlFor="cidade" className="form-label">Cidade</label>
                            <input type="text" className="form-control" id="cidade" placeholder="Digite a cidade" value={cidade} onChange={e => setCidade(e.target.value)} required />
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="estado" className="form-label">Estado</label>
                            <input type="text" className="form-control" id="estado" placeholder="Digite o estado" value={estado} onChange={e => setEstado(e.target.value)} required />
                        </div>
                    </div>
                    <div className="mt-4 mb-3">
                        <label className="form-label">Informações Adicionais</label>
                        <textarea className="form-control" value={informacoesAdicionais} onChange={e => setInformacoesAdicionais(e.target.value)} />
                    </div>
                    <div className='text-center'>
                        <button type="submit" className="btn btn-purple">Salvar Alterações</button>
                    </div>
                </form>
            </div>
        </div>
    );
};