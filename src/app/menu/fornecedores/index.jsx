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

    const [fornecedores, setFornecedores] = useState([]);

    const [busca, setBusca] = useState('');
    const [excluido, setExcluido] = useState('');
    const [confirma, setConfirma] = useState(false);
    const [confirmaId, setConfirmaId] = useState('');   
    const [selecionado, setSelecionado] = useState('');

    function deleteByID(id) {
      api.delete(`/fornecedor/delete/${id}`).then(async(result) => {
      setExcluido(id);
      setConfirma(false);
      })
    }

    function confirmaExclusao(id) {
      let fornecedor = fornecedores.find(item => item.id_fornecedor === id);
      setSelecionado(fornecedor.nome);
      setConfirmaId(id);
      setConfirma(true);
    }
  
    useEffect(() => {
      let listagem = []; 
      api.get('/fornecedores').then(async result => {
        result.data.forEach(doc => {
          if (doc.nome.indexOf(busca) >=0 ) {
            listagem.push({
              id_fornecedor: doc.id_fornecedor,
              nome: doc.nome,
              telefone: doc.telefone,
              email: doc.email,
            })
          }
        })
        setFornecedores(listagem);
        console.log(listagem);
      })
    }, [busca, excluido]);

    const VisualizarPDF = async () => {
      console.log('report', fornecedores);
      const classeImpressao = new Impressao(fornecedores);
      const documento = await classeImpressao.PreparaDocumento();
      pdfMake.createPdf(documento).open({}, window.open('', '_blank'));
    }

    return (
      <div>
        <MenuApp/>
        <div className="container-fluid titulo">
          <h1>Listagem de Fornecedores</h1>

          <div className="row">

            <div className="col-6">
              <div className="mt-2">
                <Link to="/app/menu/fornecedores/novo" className="btn btn-primary" type="button"><i className="fas fa-address-book"></i> NOVO</Link>
                <button onClick={VisualizarPDF} className="btn btn-warning"><i class="fas fa-file-pdf"></i> PDF</button>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group mt-2">
                <input onChange={e => setBusca(e.target.value)} type="text" className="form-control" placeholder="Fornecedor" aria-describedby="bt_pesquisar"/>
              </div>
            </div>
          </div>
          
          <Listagem array={fornecedores} clickDelete={confirmaExclusao} />
          
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
