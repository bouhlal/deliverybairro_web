import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import MenuApp from '../menuapp';
import './novo.css';

import api from '../../config/api_mysql';

function NovoDelivery(props) {

  const [categoria, setCategoria] = useState(null);
  const [nome, setNome] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');  
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [UF, setUf] = useState('');
  const [CEP, setCep] = useState('');
  const [marcador, setMarcador] = useState('');
  const [horario, setHorario] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [cpf, setCpf] = useState('');
 
  const [msg, setMsg] = useState('');
  const [success, setSuccess] = useState('N');

  function Novo() {
    if (nome.length === 0) {
      setMsg('Favor preencher o campo Nome do Delivery.');
    } else if (email.length === 0) {
      setMsg('Favor preencher o campo E-mail.');
    } else {
        const json = {
          "id_delivery": props.id_delivery,
          "id_categoria": categoria,
          "nome": nome,
          "responsavel": responsavel,
          "email": email,
          "telefone": telefone,
          "endereco": endereco,
          "complemento": complemento,
          "bairro": bairro,
          "cidade": cidade,
          "uf": UF,
          "cep": CEP,
          "marcador": marcador,
          "horario": horario,
          "cnpj": cnpj,
          "cpf": cpf
        }
        api.post('/delivery/add/', json).then(response => {
          let delivery = {
            categoria: response.data.id_categoria,
            nome: response.data.nome,
            responsavel: response.data.responsavel,
            email: response.data.email,
            telefone: response.data.telefone,
            endereco: response.data.endereco,
            complemento: response.data.complemento,
            bairro: response.data.bairro,
            cidade: response.data.cidade,
            uf: response.data.uf,
            cep: response.data.cep,
            marcador: response.data.marcador,
            horario: response.data.horario,
            cnpj: response.data.cnpj,
            cpf: response.data.cpf 
          }
          alert('Dados adicionados com sucesso!');
          console.log(delivery);
      }).then(() => {
        setMsg('');
        setSuccess('S');
      }).catch((erro) => {
        setMsg(erro);
        setSuccess("N");
      })  
    }
  }

  return (
    <div>
      <MenuApp/>
      <div className="container-fluid titulo">

<div className="offset-lg-3 col-lg-6">
  <h1>NOVO DELIVERY</h1>
  <form>

    <div className="mb-3">
      <label htmlFor="nome" className="form-label">Nome do Delivery</label>
      <input onChange={e => setNome(e.target.value)} type="text" className="form-control" id="nome" />
    </div>
    
    <div className="mb-3">
      <label htmlFor="categoria" className="form-label">Categoria</label>
        <select class="form-control" id="categoria">
          <option value="01" selected="selected">OFERTAS</option>
          <option value="02">SANDUICHES</option>
          <option value="03">HOTDOGS</option>
          <option value="04">BEBIDAS</option>
          <option value="05">PRATOS & PORÇÕES</option>
          <option value="06">SUPERMERCADO</option>
          <option value="07">FRUTAS & VERDURAS</option>
          <option value="08">MEDICAMENTOS</option>
          <option value="09">GÁS DE COZINHA</option>
          <option value="10">FLORICULTURA</option>
          <option value="11">ÁGUA MINERAL</option>
          <option value="12">PEÇAS E SERVIÇOS</option>
          <option value="13">DISTRIBUIDORAS</option>
        </select>
        <input onChange={e => setCategoria(e.target.value)} type="hidden" id="categoria" />
    </div>

    <div className="mb-3">
      <label htmlFor="responsavel" className="form-label">Responsável</label>
      <input onChange={e => setResponsavel(e.target.value)} type="text" className="form-control" id="responsavel" />
    </div>

    <div className="row">
      <div className="col-sm-8">
        <label htmlFor="email" className="form-label">E-mail</label>
        <input onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="email" />
      </div>
      <div className="col-sm-4">
        <label htmlFor="telefone" className="form-label">Telefone</label>
        <input onChange={e => setTelefone(e.target.value)} type="text" className="form-control" id="telefone" />
      </div>
    </div>
 
    <div className="row">
      <div className="col-sm-6">
        <label htmlFor="endereco" className="form-label">Endereço</label>
        <input onChange={e => setEndereco(e.target.value)} type="text" className="form-control" id="endereco" />
      </div>
      <div className="col-sm-3">
        <label htmlFor="complemento" className="form-label">Complemento</label>
        <input onChange={e => setComplemento(e.target.value)} type="text" className="form-control" id="complemento" />
      </div>
      <div className="col-sm-3">
        <label htmlFor="bairro" className="form-label">Bairro</label>
        <input onChange={e => setBairro(e.target.value)} type="text" className="form-control" id="bairro" />
      </div>
    </div>

    <div className="row">     
      <div className="col-sm-5">
        <label htmlFor="cidade" className="form-label">Cidade</label>
        <input onChange={e => setCidade(e.target.value)} value={cidade} type="text" className="form-control" id="cidade" />
      </div>
      <div className="col-sm-4">
        <label htmlFor="UF" className="form-label">UF</label>
        <select class="form-control" id="UF">
          <option value="AC">ACRE</option>
          <option value="AL">ALAGOAS</option>
          <option value="AP">AMAPA</option>
          <option value="AM">AMAZONAS</option>
          <option value="BA">BAHIA</option>
          <option value="CE">CEARA</option>
          <option value="DF">DISTRITO FEDERAL</option>
          <option value="ES">ESP.SANTO</option>
          <option value="GO">GOIAS</option>
          <option value="MA">MARANHAO</option>
          <option value="MT">MATO GROSSO</option>
          <option value="MS">MATO GROSSO SUL</option>
          <option value="MG" selected="selected">MINAS GERAIS</option>
          <option value="PA">PARA</option>
          <option value="PB">PARAIBA</option>
          <option value="PR">PARANA</option>
          <option value="PE">PERNAMBUCO</option>
          <option value="PI">PIAUI</option>
          <option value="RJ">RIO DE JANEIRO</option>
          <option value="RN">RIO GRANDE DO NORTE</option>
          <option value="RS">RIO GRANDE DO SUL</option>
          <option value="RO">RONDONIA</option>
          <option value="RR">RORAIMA</option>
          <option value="SC">SANTA CATARINA</option>
          <option value="SP">SAO PAULO</option>
          <option value="SE">SERGIPE</option>
          <option value="TO">TOCANTINS</option>
        </select>
        <input onChange={e => setUf(e.target.value)} value={UF} type="hidden" id="UF" />
      </div>
      <div className="col-sm-3">
        <label htmlFor="CEP" className="form-label">CEP</label>
        <input onChange={e => setCep(e.target.value)} value={CEP} type="text" className="form-control" id="CEP" />
      </div>
    </div>
   
    <div className="row">
      <div className="col-sm-8">
        <label htmlFor="marcador" className="form-label">Marcador</label>
        <input onChange={e => setMarcador(e.target.value)} type="text" className="form-control" id="marcador" />
      </div>
      <div className="col-sm-4">
        <label htmlFor="horario" className="form-label">Horário</label>
        <input onChange={e => setHorario(e.target.value)} type="text" className="form-control" id="horario" />
      </div>
    </div>

    <div className="row">
      <div className="col-sm-6">
        <label htmlFor="cnpj" className="form-label">CNPJ</label>
        <input onChange={e => setCnpj(e.target.value)} type="text" className="form-control" id="cnpj" />
      </div>
      <div className="col-sm-6">
        <label htmlFor="cpf" className="form-label">CPF</label>
        <input onChange={e => setCpf(e.target.value)} type="text" className="form-control" id="cpf" />
      </div>
    </div>

    <div className="mb-3">
      <Link to="/app/menu/delivery/" className="btn btn-outline-primary btn-action">CANCELAR</Link>
      <button onClick={Novo} type="button" className="btn btn-primary btn-action">SALVAR</button>
    </div>

    {msg.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{msg}</div> : null}
    {success === 'S' ? <Redirect to='/app/menu/delivery/'/> : null}

  </form>
</div>

      </div>
    </div>
  );
}

export default NovoDelivery;
