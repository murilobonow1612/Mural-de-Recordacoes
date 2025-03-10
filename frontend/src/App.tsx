import React, { useState, useEffect } from 'react';
import cartaImg from './assets/pictures/carta.png';
import './assets/styles.css';
import img_primeiro_oi from './assets/pictures/primeiroOi.png';
import img_table from './assets/pictures/t.png';
import img_corredor from './assets/pictures/corredor.png';
import img_firstDate from './assets/pictures/1_encontro.png';
import img_firstDate2 from './assets/pictures/1_encontro2.jpg';
import img_pedido1 from './assets/pictures/pedido1.png';
import img_pedido2 from './assets/pictures/pedido2.png';
import img_pedido3 from './assets/pictures/pedido3.png';



interface Evento {
  nome_evento: string;
  data_evento: string;
}

const App = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [dataInicial1, setDataInicial1] = useState<Date | null>(null); // Primeiro oi
  const [dataInicial2, setDataInicial2] = useState<Date | null>(null); // Pedido namoro
  const [contador1, setContador1] = useState<string>('Carregando...');
  const [contador2, setContador2] = useState<string>('Carregando...');

  // Função para buscar os dados dos eventos
  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch('http://localhost:5000/eventos');
        const data: Evento[] = await response.json(); // Especificando que 'data' é um array de Eventos
        console.log('Eventos recebidos:', data); // Log dos dados recebidos

        setEventos(data);
        const eventoPrimeiroOi = data.find(evento => evento.nome_evento === 'primeiro_oi');
        const eventoPedidoNamoro = data.find(evento => evento.nome_evento === 'pedido_namoro');

        if (eventoPrimeiroOi) {
          const dataPrimeiroOi = new Date(eventoPrimeiroOi.data_evento);
          console.log('Data do Primeiro Oi:', dataPrimeiroOi); // Verificar se a data está correta
          setDataInicial1(dataPrimeiroOi);
        }

        if (eventoPedidoNamoro) {
          const dataPedidoNamoro = new Date(eventoPedidoNamoro.data_evento);
          console.log('Data do Pedido Namoro:', dataPedidoNamoro); // Verificar se a data está correta
          setDataInicial2(dataPedidoNamoro);
        }
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    };

    fetchEventos();
  }, []);

  // Função para calcular a diferença entre duas datas
  function calcularDiferenca(data1: Date, data2: Date) {
    let anos = data2.getFullYear() - data1.getFullYear();
    let meses = data2.getMonth() - data1.getMonth();
    let dias = data2.getDate() - data1.getDate();

    if (dias < 0) {
      let ultimoDiaMesAnterior = new Date(data2.getFullYear(), data2.getMonth(), 0).getDate();
      dias += ultimoDiaMesAnterior;
      meses--;
    }

    if (meses < 0) {
      meses += 12;
      anos--;
    }

    return { anos, meses, dias };
  }

  // Função para atualizar o contador
  function atualizarContador(dataInicial: Date | null) {
    if (!dataInicial) return;

    const agora = new Date();
    let diferencaMs = agora - dataInicial;

    if (diferencaMs < 0) return "A data ainda não chegou!";

    const { anos, meses, dias } = calcularDiferenca(dataInicial, agora);
    const diasTotais = Math.floor(diferencaMs / (1000 * 60 * 60 * 24));
    const semanasTotais = Math.floor(diasTotais / 7);
    const semanas = semanasTotais % 4;

    const horas = Math.floor(diferencaMs / (1000 * 60 * 60)) % 24;
    const minutos = Math.floor(diferencaMs / (1000 * 60)) % 60;
    const segundos = Math.floor(diferencaMs / 1000) % 60;

    return `${anos} ano(s)<br>${meses} mês(es)<br>${dias} dia(s)<br>${horas} hora(s)<br>${minutos} minuto(s)<br>${segundos} segundo(s)<br> atrás.`;
  }

  // Atualizar o contador a cada segundo
  useEffect(() => {
    const intervalo1 = setInterval(() => {
      if (dataInicial1) {
        setContador1(atualizarContador(dataInicial1));
      }
    }, 1000);

    const intervalo2 = setInterval(() => {
      if (dataInicial2) {
        setContador2(atualizarContador(dataInicial2));
      }
    }, 1000);

    // Limpar os intervalos ao desmontar o componente
    return () => {
      clearInterval(intervalo1);
      clearInterval(intervalo2);
    };
  }, [dataInicial1, dataInicial2]);

  return (
    <div className='divv'>
      <body>
        <img src={cartaImg} className="carta" />
        <img src={img_primeiro_oi} className="primeiroOi"></img>
        <div className="container">
          <img src={img_table} id="table" />
          <p id="contador"></p>
        </div>
        <p>No dia <strong>9 de Janeiro de 2025, às 14:46</strong> eu estava no intervalo do trabalho, sentado na calçada da
          doca dos funcionários do shopping.</p>
        <p> Você passou por mim, parou, olhou para trás e decidiu vir falar comigo. Essa decisão iria mudar as nossas
          vidas
          pra sempre.</p>


        <div className="container_corredor_foto">
          <img src={img_corredor} className="foto_corredor" />
          <p>Nosso ponto de encontro de quando eu trabalhava no shopping </p>
        </div>

        <p>Primeiro encontro:</p>
        <div className="_1_encontro">

          <img src={img_firstDate} className="date" />
          <img src={img_firstDate2} className="date" />
        </div>


        <p id='lbl_pedido_namoro'>pedido de namoro:</p>
        <div className="pedido">
          <img src={img_pedido1} id="pedidos"/>
            <img src={img_pedido2} id="pedidos"/>
              <img src={img_pedido3} id="pedidos"/>
              </div>


              <div id="contador1" dangerouslySetInnerHTML={{ __html: contador1 }}></div>
              <div id="contador2" dangerouslySetInnerHTML={{ __html: contador2 }}></div>

            </body>

        </div>
        );
}

        export default App;