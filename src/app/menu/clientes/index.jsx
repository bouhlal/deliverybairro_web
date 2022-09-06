import React, { useState, useEffect } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Impressao } from './impressao';
import { Link } from 'react-router-dom';
import Listagem from './listagem.jsx';
import MenuApp from '../menuapp.jsx';
import './index.css';

import api from '../../config/api_mysql';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function Index() {

    const [clientes, setClientes] = useState([]);

    const [busca, setBusca] = useState('');
    const [excluido, setExcluido] = useState('');
    const [confirma, setConfirma] = useState(false);
    const [confirmaId, setConfirmaId] = useState('');   
    const [selecionado, setSelecionado] = useState('');

    function deleteByID(id) {
      api.delete(`/cliente/delete/${id}`).then(async(result) => {
      setExcluido(id);
      setConfirma(false);
      })
    }

    function confirmaExclusao(id) {
      let cliente = clientes.find(item => item.id_cliente === id);
      setSelecionado(cliente.nome);
      setConfirmaId(id);
      setConfirma(true);
    }
  
    useEffect(() => {
      let listagem = []; 
      api.get('/clientes').then(async result => {
        result.data.forEach(doc => {
          if (doc.nome.indexOf(busca) >=0 ) {
            listagem.push({
              id_cliente: doc.id_cliente,
              nome: doc.nome,
              telefone: doc.telefone,
              email: doc.email,
              bairro: doc.bairro
            })
          }
        })
        setClientes(listagem);
        console.log(listagem);
      })
    }, [busca, excluido]);

    const VisualizarPDF = async () => {
      console.log('report', clientes);
      const classeImpressao = new Impressao(clientes);
      const documento = await classeImpressao.PreparaDocumento();
      pdfMake.createPdf(documento).open({}, window.open('', '_blank'));
    }

    return (
      <div>
        <MenuApp/>
        <div className="container-fluid titulo">
          <h1>Listagem de Clientes</h1>

          <div className="row">

            <div className="col-6">
              <div className="mt-2">
                <Link to="/app/menu/clientes/novo" className="btn btn-primary" type="button"><i className="fas fa-address-book"></i> NOVO</Link>
                <button onClick={VisualizarPDF} className="btn btn-warning"><i class="fas fa-file-pdf"></i> PDF</button>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group mt-2">
                <input onChange={e => setBusca(e.target.value)} type="text" className="form-control" placeholder="Cliente" aria-describedby="bt_pesquisar"/>
              </div>
            </div>
          </div>
          
          <Listagem array={clientes} clickDelete={confirmaExclusao} />
          
          {
            confirma ? <SweetAlert
              warning
              showCancel
              showCloseButtom
              confirmBtnText="Sim"
              confirmBtnBsStyle="primary"
              cancelBtnText="Não"
              cancelBtnBsStyle="danger"
              title="Exclusão"
              onConfirm={() => deleteByID(confirmaId)}
              onCancel={() => setConfirma(false)}
              reverseButtons={true}
              >
              Deseja excluir <strong>{selecionado}</strong>?
            </SweetAlert> : null
          }

        </div>
      </div>
    );
  }

export default Index;
