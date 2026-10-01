/**
 * KOLMAQ — Sistema (Google Planilhas + Apps Script)
 * Catálogo do site (Produtos, Servicos, Promocoes) e Ordens de Serviço (OS).
 * Instalação: veja LEIA-ME.md. Rode setup() uma vez.
 */

const FUSO = 'America/Sao_Paulo';
const ABAS = {
  Produtos:  ['id','nome','categoria','preco','preco_antigo','selo','descricao','especificacoes','foto_url','ativo','opcoes'],
  Servicos:  ['id','nome','preco','prazo','descricao','foto_url','ativo'],
  Promocoes: ['titulo','texto','cor','foto_url','ativo','produto'],
  OS:        ['os','codigo','entrada','cliente','telefone','equipamento','marca_modelo','defeito','acessorios',
              'status','orcamento_valor','orcamento_desc','previsao','obs_interna','atualizado','historico']
};
const STATUS = ['Recebido','Em análise','Orçamento enviado','Aprovado','Em manutenção',
                'Pronto para retirada','Entregue','Orçamento recusado','Sem conserto'];
const EDITAVEIS = ['cliente','telefone','equipamento','marca_modelo','defeito','acessorios',
                   'status','orcamento_valor','orcamento_desc','previsao','obs_interna'];

/* ---------- instalação ---------- */
function setup() {
  const ss = SpreadsheetApp.getActive();
  Object.entries(ABAS).forEach(([nome, cab]) => {
    const sh = ss.getSheetByName(nome) || ss.insertSheet(nome);
    if (sh.getLastRow() === 0) {
      sh.appendRow(cab);
      sh.setFrozenRows(1);
      sh.getRange(1, 1, 1, cab.length).setFontWeight('bold').setBackground('#E6F4FB');
    }
  });

  const p = ss.getSheetByName('Produtos');
  if (p.getLastRow() === 1) p.getRange(2, 1, 5, 10).setValues([
    ['p1','Impressora Laser Monocromática M2020W','Impressoras','','','Promoção','Laser compacta com Wi‑Fi.','','https://kolmaq.com.br/uploads/banners/impressora-laser-monocromatica-m2020w-desktop-77f127.jpeg','sim'],
    ['p2','Impressora Multifuncional Laser LaserJet M1132','Impressoras','','','Promoção','Imprime, copia e digitaliza.','','','sim'],
    ['p3','Impressora Multifuncional Laser MFP 135A','Impressoras','','','Promoção','Imprime, copia e digitaliza.','','','sim'],
    ['p4','MacBook Pro','Notebooks','','','Promoção','Consulte configuração e condições.','','https://kolmaq.com.br/uploads/banners/macbook-pro-desktop-c7055b.jpg','sim'],
    ['p5','Dell Inspiron 5423','Notebooks','','','','Consulte configuração e condições.','','https://kolmaq.com.br/uploads/banners/dell-desktop-8b1b21.jpg','sim']
  ]);
  if (p.getRange(2, 8).getValue() === '') {
    const sp = [
      'Tipo: Impressora laser monocromática\nFunções: Impressão\nConectividade: Wi‑Fi e USB\nIndicada para: Casa e escritório',
      'Tipo: Multifuncional laser monocromática\nFunções: Impressão, cópia e digitalização\nConectividade: USB\nIndicada para: Escritório',
      'Tipo: Multifuncional laser monocromática\nFunções: Impressão, cópia e digitalização\nConectividade: USB\nIndicada para: Casa e escritório',
      'Tipo: Notebook\nSistema: macOS\nConfiguração: Consulte disponibilidade',
      'Tipo: Notebook\nSistema: Windows\nConfiguração: Consulte disponibilidade'];
    const opImp = 'Recebimento: Retirar na loja | Entrega em Porto Alegre\nInstalação: Não preciso | Quero instalação e configuração';
    const opNot = 'Recebimento: Retirar na loja | Entrega em Porto Alegre\nPreparação: Pronto para usar | Transferir meus arquivos do computador antigo';
    p.getRange(2, 8, 5, 1).setValues(sp.map(x => [x]));
    p.getRange(2, 11, 5, 1).setValues([[opImp], [opImp], [opImp], [opNot], [opNot]]);
  }
  const s = ss.getSheetByName('Servicos');
  if (s.getLastRow() === 1) s.getRange(2, 1, 5, 7).setValues([
    ['s1','Conserto e manutenção de impressoras','','','Jato de tinta, tanque e laser. Limpeza, troca de peças e ajuste de puxador de papel.','https://kolmaq.com.br/uploads/servicos/serv_1_1786650672_6a7e203064642.jpg','sim'],
    ['s2','Manutenção de computadores e notebooks','','','PCs, notebooks e projetores. Formatação, upgrade, limpeza e troca de peças.','https://kolmaq.com.br/uploads/servicos/serv_3_1786651344_6a7e22d03c335.jpg','sim'],
    ['s3','Conserto de videogames','','','PlayStation 2/3/4, Xbox 360/One, Nintendo Wii e outros.','https://kolmaq.com.br/uploads/servicos/serv_3_1786651344_6a7e22d03c335.jpg','sim'],
    ['s4','Conserto de televisores','','','Samsung, LG, Philips, TCL, AOC, Panasonic, CCE, Buster e outras marcas.','https://kolmaq.com.br/uploads/servicos/serv_2_1786650943_6a7e213f60adc.jpg','sim'],
    ['s5','Manutenção de celulares','','','Hardware e software, diversas marcas e modelos.','https://kolmaq.com.br/uploads/servicos/serv_4_1786651517_6a7e237d2aff8.jpg','sim']
  ]);
  const pr = ss.getSheetByName('Promocoes');
  if (pr.getLastRow() === 1) pr.getRange(2, 1, 3, 6).setValues([
    ['MacBook Pro','Super promoção. Desempenho e tela Retina para trabalhar e criar.','preto','https://kolmaq.com.br/uploads/banners/macbook-pro-desktop-c7055b.jpg','sim','p4'],
    ['Impressora Laser M2020W','Imperdível. Laser monocromática compacta com Wi‑Fi.','azul','https://kolmaq.com.br/uploads/banners/impressora-laser-monocromatica-m2020w-desktop-77f127.jpeg','sim','p1'],
    ['Dell Inspiron 5423','Notebook para estudo e trabalho. Consulte condições.','magenta','https://kolmaq.com.br/uploads/banners/dell-desktop-8b1b21.jpg','sim','p5']
  ]);

  const os = ss.getSheetByName('OS');
  os.getRange('A:B').setNumberFormat('@');
  os.getRange('E:E').setNumberFormat('@');
  const col = ABAS.OS.indexOf('status') + 1;
  os.getRange(2, col, 2000, 1).setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(STATUS).build());

  const props = PropertiesService.getScriptProperties();
  if (!props.getProperty('ADMIN_KEY')) props.setProperty('ADMIN_KEY', gerar(10));
  Logger.log('SENHA DO PAINEL: ' + props.getProperty('ADMIN_KEY'));
}

/* ---------- utilitários ---------- */
const json = o => ContentService.createTextOutput(typeof o === 'string' ? o : JSON.stringify(o))
  .setMimeType(ContentService.MimeType.JSON);
const aba = n => SpreadsheetApp.getActive().getSheetByName(n);
const ativo = r => !/^(n|não|nao|false|0)$/i.test(String(r.ativo).trim());
const agora = () => Utilities.formatDate(new Date(), FUSO, 'dd/MM/yyyy HH:mm');
function fmt(d, f) { return d instanceof Date ? Utilities.formatDate(d, FUSO, f || 'dd/MM/yyyy') : String(d || ''); }
function gerar(n) {
  const a = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; let s = '';
  for (let i = 0; i < n; i++) s += a[Math.floor(Math.random() * a.length)];
  return s;
}
function ler(nome) {
  const v = aba(nome).getDataRange().getValues(); const cab = v.shift();
  return v.filter(r => r.some(c => c !== '')).map(r => Object.fromEntries(cab.map((c, i) => [c, r[i]])));
}
function hist(h) { try { return JSON.parse(h || '[]'); } catch (e) { return []; } }

function linhasOS() {
  const sh = aba('OS'); const v = sh.getDataRange().getValues(); const cab = v.shift();
  return { sh, cab, linhas: v.map((r, i) => ({ n: i + 2, o: Object.fromEntries(cab.map((c, j) => [c, r[j]])) })) };
}
function formatarOS(o) {
  return Object.assign({}, o, {
    entrada: fmt(o.entrada, 'dd/MM/yyyy HH:mm'),
    atualizado: fmt(o.atualizado, 'dd/MM/yyyy HH:mm'),
    previsao: fmt(o.previsao),
    previsao_iso: o.previsao instanceof Date ? Utilities.formatDate(o.previsao, FUSO, 'yyyy-MM-dd') : '',
    orcamento_valor: Number(o.orcamento_valor) || 0,
    telefone: String(o.telefone || ''),
    historico: hist(o.historico)
  });
}
function publico(o) {
  const f = formatarOS(o);
  return {
    os: f.os, equipamento: f.equipamento, marca_modelo: f.marca_modelo,
    cliente: String(f.cliente || '').split(' ')[0], entrada: f.entrada.slice(0, 10),
    status: f.status, previsao: f.previsao, orcamento_valor: f.orcamento_valor,
    orcamento_desc: f.orcamento_desc, historico: f.historico
  };
}
function acharPorCodigo(codigo) {
  codigo = String(codigo || '').trim().toUpperCase();
  if (codigo.length < 6) return null;
  const t = linhasOS();
  const l = t.linhas.find(x => String(x.o.codigo).toUpperCase() === codigo);
  return l ? Object.assign(t, l) : null;
}
function gravar(t, n, o) {
  t.sh.getRange(n, 1, 1, t.cab.length).setValues([t.cab.map(c => o[c] === undefined ? '' : o[c])]);
}

/* ---------- API pública (site) ---------- */
function doGet(e) {
  const p = e.parameter || {};
  try {
    if ((p.acao || 'catalogo') === 'catalogo') {
      const cache = CacheService.getScriptCache(); const c = cache.get('cat');
      if (c) return json(c);
      const t = JSON.stringify({
        ok: true,
        produtos: ler('Produtos').filter(ativo),
        servicos: ler('Servicos').filter(ativo),
        promocoes: ler('Promocoes').filter(ativo)
      });
      cache.put('cat', t, 60);
      return json(t);
    }
    if (p.acao === 'os') {
      const r = acharPorCodigo(p.codigo);
      if (!r) { Utilities.sleep(600); return json({ ok: false, erro: 'Código não encontrado. Confira o comprovante.' }); }
      return json({ ok: true, os: publico(r.o) });
    }
    return json({ ok: false, erro: 'Ação inválida' });
  } catch (err) { return json({ ok: false, erro: String(err) }); }
}

/* ---------- API com escrita (site e painel) ---------- */
function doPost(e) {
  const lock = LockService.getScriptLock(); lock.waitLock(15000);
  try {
    const b = JSON.parse(e.postData.contents || '{}');
    if (b.acao === 'responder') return json(responder(b.codigo, b.decisao));
    if (b.chave !== PropertiesService.getScriptProperties().getProperty('ADMIN_KEY')) {
      Utilities.sleep(1000); return json({ ok: false, erro: 'Senha incorreta' });
    }
    if (b.acao === 'entrar') return json({ ok: true, status: STATUS });
    if (b.acao === 'listar') {
      const lista = linhasOS().linhas.filter(l => l.o.os).map(l => formatarOS(l.o)).reverse();
      return json({ ok: true, lista, status: STATUS });
    }
    if (b.acao === 'salvar') return json(salvar(b.os || {}));
    return json({ ok: false, erro: 'Ação inválida' });
  } catch (err) {
    return json({ ok: false, erro: String(err) });
  } finally { lock.releaseLock(); }
}

function responder(codigo, decisao) {
  const r = acharPorCodigo(codigo);
  if (!r) return { ok: false, erro: 'Código não encontrado.' };
  if (r.o.status !== 'Orçamento enviado') return { ok: false, erro: 'Este orçamento já foi respondido.', os: publico(r.o) };
  r.o.status = decisao === 'aprovar' ? 'Aprovado' : 'Orçamento recusado';
  const h = hist(r.o.historico); h.push({ s: r.o.status, d: agora(), n: 'pelo cliente no site' });
  r.o.historico = JSON.stringify(h); r.o.atualizado = new Date();
  gravar(r, r.n, r.o);
  return { ok: true, os: publico(r.o) };
}

function salvar(dados) {
  const t = linhasOS();
  if (dados.previsao && /^\d{4}-\d{2}-\d{2}$/.test(dados.previsao)) {
    const [y, m, d] = dados.previsao.split('-').map(Number); dados.previsao = new Date(y, m - 1, d);
  }
  if (dados.orcamento_valor !== undefined) dados.orcamento_valor = Number(dados.orcamento_valor) || '';
  if (dados.status && STATUS.indexOf(dados.status) < 0) return { ok: false, erro: 'Status inválido' };

  if (!dados.os) { // nova OS
    const ano = new Date().getFullYear(); const pre = 'OS-' + ano + '-';
    const max = t.linhas.reduce((m, l) => String(l.o.os).indexOf(pre) === 0 ? Math.max(m, parseInt(String(l.o.os).slice(pre.length), 10) || 0) : m, 0);
    const usados = new Set(t.linhas.map(l => String(l.o.codigo)));
    let cod; do { cod = gerar(6); } while (usados.has(cod));
    const o = { os: pre + String(max + 1).padStart(4, '0'), codigo: cod, entrada: new Date(), status: dados.status || 'Recebido' };
    EDITAVEIS.forEach(k => { if (dados[k] !== undefined && k !== 'status') o[k] = dados[k]; });
    o.historico = JSON.stringify([{ s: o.status, d: agora() }]);
    o.atualizado = new Date();
    t.sh.appendRow(t.cab.map(c => o[c] === undefined ? '' : o[c]));
    return { ok: true, os: formatarOS(o) };
  }

  const l = t.linhas.find(x => x.o.os === dados.os);
  if (!l) return { ok: false, erro: 'OS não encontrada' };
  const o = l.o; const antes = o.status;
  EDITAVEIS.forEach(k => { if (dados[k] !== undefined) o[k] = dados[k]; });
  if (o.status !== antes) { const h = hist(o.historico); h.push({ s: o.status, d: agora() }); o.historico = JSON.stringify(h); }
  o.atualizado = new Date();
  gravar(t, l.n, o);
  return { ok: true, os: formatarOS(o) };
}
