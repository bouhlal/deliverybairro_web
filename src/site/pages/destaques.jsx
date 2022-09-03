import React from 'react';

function Destaques() {
    return (
      <section id="vantagens">
        <div className="container">
          <div className="row">
          	<center>
              <h1>Aplicação Web (100% online)</h1>
              <h3>Gestão Pedidos, Clientes, Fornecedores, Estoque e Financeiro,<br/>tudo em um único lugar!</h3>
            </center>
            <div className="col-lg-4 box">
              <i className="icon fas fa-heart fa-4x vermelho"></i>
              <h3>Fácil de usar</h3>
              <p>O sistema possui uma interface simples, prática e intuitiva. É muito fácil de configurar e usá-la.</p>
            </div>
            <div className="col-lg-4 box">
            <i className="icon fas fa-globe-americas fa-4x azul"></i>
              <h3>De qualquer lugar</h3>
              <p>Gerencie seu Delivery de forma eficiente, não importa onde quer que você esteja.</p>
            </div>
            <div className="col-lg-4 box">
              <i className="icon fas fa-columns fa-4x verde"></i>
              <h3>Organização é tudo</h3>
              <p>Tenha todos seus cadastros e controles sempre bem organizados e atualizados.</p>
            </div>

          </div>
        </div>
      </section>
    );
  }

export default Destaques;
