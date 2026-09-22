# Shelldon Linhares — Personal Website

Presença pessoal de Shelldon Linhares, conectando qualidade de software, tecnologia, projetos, produto e negócios. Site estático em português, responsivo e pronto para publicação na raiz de `https://www.shelldon.com.br/`.

## Conceito e decisões de design

**Critério para construir. Visão para ir além.** A identidade combina composição editorial, tipografia ampla, preto e grafite, acentos violeta e um monograma SL. O retrato original mantém o rosto, as proporções e a identidade; a integração com o fundo acontece por máscaras e filtros no CSS. As capas dos projetos são composições tipográficas criadas para este portfólio, não capturas dos sites nem logotipos oficiais.

A narrativa segue pessoa → atuação → projetos → método → ferramentas → negócios → contato. A versão mobile usa uma composição própria e uma linha vertical para o método. Os cases usam detalhes expansíveis nativos. O pequeno teste do rodapé verifica apenas imagens carregadas e largura do layout; não representa uma suíte completa de testes.

## Tecnologias

- HTML semântico, CSS com variáveis e JavaScript nativo.
- Nenhum framework, biblioteca de animação, CDN ou fonte externa.
- Fontes do sistema: Arial/Helvetica, Consolas e Georgia nas capas editoriais.
- Imagens AVIF e WebP em duas resoluções, com fallback JPEG.
- SVG para o monograma e PNG para ícones de dispositivos.
- Sem instalação, etapa de build, banco de dados ou serviço externo obrigatório.

## Estrutura

```text
/
├── index.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── vercel.json
├── README.md
├── TESTES.md
├── .gitignore
├── assets/
│   ├── css/styles.css
│   ├── js/config.js
│   ├── js/main.js
│   ├── images/portrait-{480,960}.{avif,webp}
│   ├── images/portrait-960.jpg
│   ├── images/og.jpg
│   └── icons/ (monograma SVG e PNGs)
└── tools/
    ├── serve.mjs
    └── social-card.html
```

## Executar localmente

Com Node.js instalado, abra um terminal na pasta deste projeto:

```sh
node tools/serve.mjs
```

Acesse `http://127.0.0.1:4173`. Use Ctrl+C para encerrar. O servidor entrega a página personalizada com status HTTP 404 para caminhos inexistentes. É uma ferramenta de desenvolvimento; na publicação, a Vercel serve os arquivos.

Não abra `index.html` por duplo clique: os caminhos começam em `/` para funcionar corretamente na raiz do domínio. Use o servidor local.

## Editar conteúdo e adicionar projetos

Textos, projetos e SEO ficam no `index.html`. As seções são identificadas por `id`. O CSS usa os tokens no início de `assets/css/styles.css`; ajuste a paleta e o espaçamento ali.

Para adicionar um projeto:

1. Localize o comentário `PROJECT` dentro de `.project-grid`.
2. Copie um `<article class="project">` completo.
3. Defina um `id` exclusivo, título, descrição, tags e detalhes.
4. Troque a capa e o link. Use somente uma URL confirmada; se o projeto for conceitual, mantenha apenas os detalhes.
5. Para um repositório específico, use a URL real do repositório, em vez do perfil geral.
6. Preserve `target="_blank" rel="noopener noreferrer"` nos links externos.

O conteúdo estático funciona sem JavaScript e é legível por mecanismos de busca. Não há integração automática com a API do GitHub nem repositórios fictícios. O QA Automation Lab direciona ao perfil informado.

## Links e configurações pendentes

Edite **`assets/js/config.js`**:

| Campo | Estado inicial | Como preencher |
|---|---|---|
| `GITHUB_URL` | `https://github.com/shelldon-x` | Perfil confirmado. Se mudar, atualize também os links estáticos e `sameAs` no HTML. |
| `LINKEDIN_URL` | Vazio | URL HTTPS completa do perfil real. |
| `EMAIL` | `contato@shelldon.com.br` | Confirmado no comprovante de CNPJ fornecido. |
| `WHATSAPP_URL` | Vazio | URL HTTPS completa do contato autorizado. |
| `GA4_ID` | Vazio | Identificador real da propriedade, iniciado por `G-`. |
| `CLARITY_ID` | Vazio | Identificador real do projeto Clarity. |

Valores vazios não criam botões quebrados: os contatos só aparecem após a configuração. O e-mail empresarial e o GitHub são os canais visíveis. Não foi criado formulário de contato nem backend de envio. Inkure não tem URL pública, pois foi informado como conceito.

Após preencher o LinkedIn, adicione a mesma URL ao array `sameAs` do JSON-LD para disponibilizá-la também aos buscadores. O e-mail pode permanecer somente na configuração de contato.

## Substituir a foto

Exporte uma foto quadrada em 480 × 480 e 960 × 960, preservando a proporção. Substitua os arquivos `portrait-480.avif`, `portrait-960.avif`, `portrait-480.webp`, `portrait-960.webp` e `portrait-960.jpg`. Ferramentas como Squoosh ou Sharp permitem esses formatos. Verifique se a exportação remove metadados privados e conserva boa nitidez facial.

A foto fornecida foi apenas redimensionada e comprimida. O enquadramento e tratamento de exibição estão em `.hero-portrait` no CSS. Atualize o `alt` se a imagem mudar. Se mudar a proporção, atualize também `width`/`height` do `<img>` e os estilos de enquadramento.

## Imagem de compartilhamento e identidade

- `assets/images/og.jpg`: cartão de 1200 × 630, pronto para Open Graph e Twitter/X.
- `tools/social-card.html`: fonte editável do cartão. Com o servidor local ativo, abra `/tools/social-card.html`, use viewport de **1200 × 630**, escala 1 e exporte uma captura JPEG. Substitua `og.jpg`.
- `assets/icons/monogram.svg`: monograma SL editável e favicon principal.
- PNGs de 32, 180, 192 e 512 px atendem favicons, Apple Touch Icon e manifest.

Após mudar o cartão, atualize o nome do arquivo ou force nova inspeção nas ferramentas das redes, que podem manter imagens em cache. O `site.webmanifest` fornece identidade do site; não há service worker, suporte offline ou promessa de PWA instalável.

## Analytics

GA4 e Clarity ficam desativados quando seus IDs estão vazios. Com IDs válidos, aparece um pedido de permissão. Nenhum script de medição é solicitado antes de aceitar. A escolha fica em `localStorage`; o rodapé permite revê-la. Ao revogar, a página recarrega e não carrega os scripts novamente. Isso não apaga dados já enviados aos provedores.

O fluxo foi testado com respostas simuladas, sem enviar visitas para propriedades reais. Após configurar seus IDs, valide o recebimento no ambiente real. Ajuste sua informação de privacidade ao uso efetivo antes de ativar medição.

Referências oficiais: [Google tag](https://developers.google.com/tag-platform/gtagjs), [Clarity Consent API v2](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-consent-api-v2).

## SEO e acessibilidade

O HTML inclui title, description, canonical, Open Graph, Twitter/X Card e JSON-LD `Person` + `WebSite` + `Organization`. `robots.txt` e `sitemap.xml` apontam para o domínio de produção. A página 404 usa `noindex`.

Há link de salto com destino focalizável, navegação semântica, estados de foco visíveis, descrição do retrato, controle de menu com estado expandido e suporte a `prefers-reduced-motion`. Os detalhes funcionam com Enter ou Espaço. O conteúdo continua disponível sem JavaScript.

Ao alterar o domínio, revise canonical, metadados sociais, JSON-LD, sitemap e robots. Resultados de auditoria estão em `TESTES.md`; auditoria automatizada não equivale a certificação WCAG.

## Publicar no GitHub e na Vercel

1. Crie um repositório no GitHub.
2. Envie **o conteúdo desta pasta**, mantendo `index.html` na raiz do repositório. Não envie a pasta externa de relatórios nem os arquivos de trabalho do ambiente de criação.
3. Na Vercel, importe esse repositório como um novo projeto.
4. Selecione o preset **Other**, sem comando de instalação nem build. A saída deve ser a própria raiz (`.`); se mantiver este site dentro de uma subpasta do repositório, configure essa subpasta como Root Directory.
5. Publique e confira a URL fornecida pela Vercel.
6. Teste página inicial, imagem social e um caminho inexistente. A Vercel reconhece `404.html` em sites estáticos. Não adicione um rewrite geral para `index.html`, pois isso esconderia os erros 404.

O `vercel.json` adiciona cabeçalhos de segurança, URLs limpas e cache de um dia para assets. Os arquivos não usam nomes com hash: por isso, não há cache imutável de um ano. Quando precisar de atualização imediata, renomeie o asset e ajuste sua referência.

## Conectar shelldon.com.br e www.shelldon.com.br

1. Em **Settings → Domains**, adicione ambos os domínios ao projeto.
2. Use `www.shelldon.com.br` como endereço principal, coerente com o canonical. Configure o domínio sem `www` para redirecionar ao principal no painel.
3. No provedor de DNS, aplique **os registros exatos mostrados pela Vercel para este projeto**. Não há valores de A/CNAME fixados neste documento: eles dependem da configuração atual.
4. Preserve registros de e-mail (MX, SPF, DKIM e DMARC). Resolva apenas conflitos dos hosts usados pelo site.
5. Aguarde a validação de DNS e HTTPS. Confirme que ambos os endereços chegam à página e que a versão sem `www` redireciona.
6. Reexecute Lighthouse no endereço publicado e envie o sitemap ao Search Console, caso use essa ferramenta.

Referência: [Adicionar e configurar um domínio na Vercel](https://vercel.com/docs/domains/working-with-domains/add-a-domain).

Esta entrega prepara a publicação. Nenhum repositório, domínio ou projeto Vercel foi criado ou alterado automaticamente.

## Próximos passos opcionais — V2

- Cases com capturas reais, decisões de implementação e resultados documentados por você.
- Links diretos para repositórios selecionados, com README e exemplos de execução.
- Versão em inglês, com conteúdo revisado, URLs próprias e `hreflang`.
- Novas formas de contato após confirmação dos dados.

Não há métricas, credenciais, certificações ou histórico profissional inventados no conteúdo.

## Revisão de posicionamento e empresa

A copy destaca a atuação informada como profissional de QA, gerente de projetos e empresário de TI. A seção de negócios inclui Shelldon Tech & Projects como nome de apresentação, conforme a identificação usada na pasta fornecida; o documento não informa nome fantasia registrado. A razão social aparece separadamente no rodapé e no JSON-LD.

Razão social, CNPJ 67.042.383/0001-31, cidade e e-mail foram conferidos no comprovante fornecido pelo titular. Não há afirmação de consulta cadastral em tempo real. O rodapé usa São Paulo/SP; o endereço completo e o telefone cadastral foram omitidos. Nenhum número foi presumido como WhatsApp. O PDF original não integra o pacote público.

O bloco pessoal permanece curto, com ARPGs, MMORPGs e jogos de plataforma, sem sugerir atuação profissional em games.

