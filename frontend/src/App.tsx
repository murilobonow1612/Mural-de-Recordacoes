import { useState, useEffect } from 'react';
import './assets/styles.css';
import images from './assets/images';

interface Evento {
  nome_evento: string;
  data_evento: string;
}

const App = () => {
  const [_, setEventos] = useState<Evento[]>([]);
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
  function atualizarContador1(dataInicial: Date | null) {
    if (!dataInicial) return;

    const agora = new Date();
    let diferencaMs = new Date().getTime() - dataInicial.getTime();

    if (diferencaMs < 0) return "A data ainda não chegou!";

    const { anos, meses, dias } = calcularDiferenca(dataInicial, agora);

    const horas = Math.floor(diferencaMs / (1000 * 60 * 60)) % 24;
    const minutos = Math.floor(diferencaMs / (1000 * 60)) % 60;
    const segundos = Math.floor(diferencaMs / 1000) % 60;

    return `${anos} ano(s)<br>${meses} mês(es)<br>${dias} dia(s)<br>${horas} hora(s)<br>${minutos} minuto(s)<br>${segundos} segundo(s)<br> atrás.`;
  }

  function atualizarContador2(dataInicial: Date | null) {
    if (!dataInicial) return;

    const agora = new Date();
    let diferencaMs = new Date().getTime() - dataInicial.getTime();

    if (diferencaMs < 0) return "A data ainda não chegou!";

    const { anos, meses, dias } = calcularDiferenca(dataInicial, agora);

    const horas = Math.floor(diferencaMs / (1000 * 60 * 60)) % 24;
    const minutos = Math.floor(diferencaMs / (1000 * 60)) % 60;
    const segundos = Math.floor(diferencaMs / 1000) % 60;

    return `${anos} ano(s)<br>${meses} mês(es)<br>${dias} dia(s)<br>${horas} hora(s)<br>${minutos} minuto(s)<br>${segundos} segundo(s)`;
  }

  // Atualizar o contador a cada segundo
  useEffect(() => {
    const intervalo1 = setInterval(() => {
      if (dataInicial1) {
        const resultado1 = atualizarContador1(dataInicial1) || "";
        setContador1(resultado1);

      }
    }, 1000);

    const intervalo2 = setInterval(() => {
      if (dataInicial2) {
        const resultado2 = atualizarContador2(dataInicial2) || "";
        setContador2(resultado2);

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
        <img src={images.carta} className="carta" />
        <img src={images.primeiroOi} className="primeiroOi"></img>
        <div className="container">
          <img src={images.table} id="table" />
          <p id="contador"></p>
        </div>
        <p>No dia <strong>9 de Janeiro de 2025, às 14:46</strong> eu estava no intervalo do trabalho, sentado na calçada da
          doca dos funcionários do shopping.</p>
        <p> Você passou por mim, parou, olhou para trás e decidiu vir falar comigo. Essa decisão iria mudar as nossas
          vidas
          pra sempre.</p>

        <div className="container_corredor_foto">
          <img src={images.corredor} className="foto_corredor" />
          <p>Nosso ponto de encontro de quando eu trabalhava no shopping </p>
        </div>

        <p>Primeiro encontro:</p>
        <div className="_1_encontro">

          <img src={images.firstDate} className="date" />
          <img src={images.firstDate2} className="date" />
        </div>

        <div className='secao_pedidos'>
          <p id='lbl_pedido_namoro'>pedido de namoro:</p>
          <div className="pedido">
            <img src={images.pedido1} id="pedidos" />
            <img src={images.pedido2} id="pedidos" />
            <img src={images.pedido3} id="pedidos" />
            <img src={images.desdePedido} id='desdePedido' />
          </div>
        </div>

        <div className="container2">
          <img src={images.table} id="table2" />
        </div>

        <p>Primeira noite do cinema</p>
        <div>
          <img src={images.cine1} className="cinema1" />
          <img src={images.cine2} className="cinema1" />
          <img src={images.cine3} className="cinema3" />
        </div>

        <p>Primeira vez juntos na praia</p>
        <div>
          <div id='b1&b2'>
            <img src={images.beach1} className='beach' />
            <img src={images.beach2} className='beach' />
          </div>

          <div id='b3&b4'>
            <img src={images.beach3} className='beach' />
            <img src={images.beach4} className='beach' />
          </div>

          <div id='b5'>
            <img src={images.beach5} className='beach5' />
          </div>
        </div>

        <div id="contador1" dangerouslySetInnerHTML={{ __html: contador1 }}></div>
        <div id="contador2" dangerouslySetInnerHTML={{ __html: contador2 }}></div>
      </body>
    </div>
  );
}
export default App;