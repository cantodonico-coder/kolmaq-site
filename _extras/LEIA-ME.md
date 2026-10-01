# Kolmaq — instalação (versão 2 · 01/10/2026)

## Atualizar o GitHub (cantodonico-coder.github.io/kolmaq-site)
1. Descompacte este zip.
2. No repositório: **Add file → Upload files**.
3. Arraste TUDO que está dentro da pasta (inclusive `_extras`, que não é publicada).
4. **Commit changes** → aguarde o ✅ verde em **Actions** → recarregue com Ctrl + F5.
5. Conferência: o topo deve mostrar **Serviços ▾**.


Arquivos:
- `index.html` — site novo
- `painel.html` — painel de ordens de serviço (uso interno)
- `_extras/Code.gs` — sistema na planilha Google (não é publicado no site)

## 1. Sistema (planilha) — 10 min
1. Crie uma planilha no Google Drive da loja: **Kolmaq Sistema**.
2. Menu **Extensões → Apps Script**. Apague o conteúdo, cole o `Code.gs`, salve.
3. Selecione a função **setup** → **Executar** → autorize.
4. **Ver → Registros de execução**: anote a **SENHA DO PAINEL**.
   Para trocar: ⚙️ Configurações do projeto → Propriedades do script → `ADMIN_KEY`.
5. **Implantar → Nova implantação → App da Web**
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
6. Copie a URL que termina em **/exec**.

## 2. Ligar o site
1. Abra `index.html` → rodapé → **Área do lojista** (PIN 1234).
2. Aba **Loja e empresa** → cole a URL em *Endereço do sistema*. Troque o PIN.
3. **Salvar** → **Baixar site atualizado** → esse é o `index.html` final.

## 3. Painel de OS
1. Abra `painel.html` → cole a URL /exec, a senha e o endereço do site.
2. **+ Nova OS** → salvar gera número (OS-2026-0001) e **código do cliente**.
3. **Imprimir comprovante** (2 vias) e **Avisar cliente** (WhatsApp com link).
4. Status "Orçamento enviado" → cliente aprova ou recusa pelo site.

## 4. Produtos, serviços e promoções
- Edite as abas **Produtos**, **Servicos**, **Promocoes** da planilha. Site atualiza em até 1 min.
- `preco` vazio = "Consulte o preço". `ativo` = **não** esconde o item.
- `especificacoes`: uma por linha, formato `Item: valor` (Alt+Enter na célula). Alimenta a tabela técnica e o comparador.
- `opcoes`: escolhas na página do produto, uma por linha: `Memória: 8GB | 16GB (+300)`. O valor entre parênteses soma no preço.
- `foto_url` (Produtos, Servicos, Promocoes): link direto da imagem (ex.: `https://kolmaq.com.br/fotos/m2020w.jpg`).
- Promoções: `cor` = azul, magenta, amarelo ou preto.

## 5. Publicar
- Suba `index.html` e `painel.html` (+ pasta `fotos/`) na hospedagem.
- Sem hospedagem: GitHub Pages (grátis) + apontar o domínio.
- Domínio: consulte o titular em https://registro.br (busca WHOIS de kolmaq.com.br). Quem for titular (CNPJ da loja) controla o DNS; se estiver no nome da MSL, peça a transferência.

## Alterou o Code.gs?
**Implantar → Gerenciar implantações → ✏️ → Versão: Nova versão**. A URL continua a mesma.

## 6. SEO (Google)
- Páginas de serviço já prontas, cada uma com título, descrição, H1 e perguntas frequentes próprias:
  `/manutencao-de-impressoras/`, `/assistencia-tecnica-notebook/`, `/conserto-de-computadores/`, `/conserto-de-tv/`, `/conserto-de-celular/`, `/conserto-de-videogame/`, `/quem-somos/`, `/contato/`.
- Suba as pastas inteiras junto do `index.html`, mais `sitemap.xml` e `robots.txt` na raiz.
- No Google Search Console: adicione o domínio e envie `https://kolmaq.com.br/sitemap.xml`.
- Google Perfil da Empresa: nome **Kolmaq Informática - Assistência Técnica**, mesmo endereço e telefone do site.
- Avaliações: copie o link "Pedir avaliações" do Perfil da Empresa e cole no painel (login) e na Área do lojista. O painel inclui o link na mensagem de "Entregue".
