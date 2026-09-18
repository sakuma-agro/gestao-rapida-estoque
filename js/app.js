// app.js — telas, eventos e arranque do Gestão Rápida (Estoque Inteligente).
//
// Esta é a etapa do desenho: as telas existem, o menu funciona, as marcas
// estão no lugar. O banco entra depois, e quando entrar o login de verdade
// substitui o `entrar()` daqui — o resto do arquivo continua valendo.
import { MODULOS, telasDe, montarMenu, mostrarInicio } from './acesso.js';
import { ligarAcerto, abrirAcerto } from './acerto.js';

const $ = id => document.getElementById(id);

/* Todas as telas do app, tiradas da própria lista de módulos: acrescentar uma
   tela em acesso.js e a <section> no index.html basta — aqui não se mexe. */
const TELAS = ['inicio', 'config', ...MODULOS.flatMap(m => telasDe(m).map(([t]) => t))];
const idDaTela = t => 'tela' + t.charAt(0).toUpperCase() + t.slice(1);

function mostrar(qual) {
  $('telaLogin').hidden = qual !== 'login';
  $('app').hidden = qual !== 'app';
}

function abrirAba(nome) {
  for (const t of TELAS) {
    const el = $(idDaTela(t));
    if (el) el.hidden = t !== nome;
  }
  if (nome.startsWith('ac')) abrirAcerto(nome);
  // a tela nova começa do alto, não no meio da anterior
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
}

/** Recado curto no alto da página: some sozinho. */
let sumir = null;
function mostrarAviso(texto, tipo = 'info') {
  const el = $('avisoGlobal');
  el.className = 'aviso ' + tipo;
  el.textContent = texto;
  el.hidden = false;
  clearTimeout(sumir);
  sumir = setTimeout(() => { el.hidden = true; }, 6000);
}

/* =============== login =============== */
$('formLogin').addEventListener('submit', ev => {
  ev.preventDefault();
  mostrar('app');
  montarMenu(abrirAba);
});

/* O nome do app no alto volta para a tela de marca e desmarca o módulo —
   é o mesmo gesto de clicar no logotipo de um site. */
$('bInicio').addEventListener('click', () => {
  if (!$('app').hidden) mostrarInicio();
});

$('btnSair').addEventListener('click', () => mostrar('login'));

/* =============== estado da rede =============== */
function pintarRede() {
  const online = navigator.onLine;
  $('estadoTexto').textContent = online ? 'online' : 'offline';
  $('estadoRede').querySelector('.pt').classList.toggle('off', !online);
}
addEventListener('online', pintarRede);
addEventListener('offline', pintarRede);
pintarRede();

/* =============== instalação do PWA =============== */
let promptInstalar = null;
addEventListener('beforeinstallprompt', ev => {
  ev.preventDefault();
  promptInstalar = ev;
  $('btnInstalar').hidden = false;
});
$('btnInstalar').addEventListener('click', async () => {
  if (!promptInstalar) return;
  promptInstalar.prompt();
  await promptInstalar.userChoice;
  promptInstalar = null;
  $('btnInstalar').hidden = true;
});

if ('serviceWorker' in navigator) {
  addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}

/* =============== arranque =============== */
try { ligarAcerto(mostrarAviso); }
catch (e) { console.error('[Estoque] falhou ao ligar o acerto', e); }

mostrar('login');
