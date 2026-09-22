# Verificação da entrega

Executada em 22/09/2026, com Chrome 153.0.8010.53 e Lighthouse 13.5.0, no site servido em `http://127.0.0.1:4173/`.

## Lighthouse mobile

| Categoria | Nota |
|---|---:|
| Performance | 100 |
| Acessibilidade | 100 |
| Boas práticas | 100 |
| SEO | 100 |

- Largest Contentful Paint (LCP): **1,7 s**.
- Cumulative Layout Shift (CLS): **0**.
- Total Blocking Time (TBT): **20 ms**.
- Perfil mobile e throttling simulado padrão do Lighthouse; sem remoção de conteúdo, bloqueio de recursos do site ou mudança do site para a auditoria.
- Analytics estavam desativados, conforme a configuração entregue.
- O Chrome foi iniciado pelo Playwright e conectado ao Lighthouse. Os flags padrão do navegador de testes desativam o back/forward cache; o relatório registra essa limitação do ambiente.
- O servidor local não comprime respostas. O relatório aponta esse diagnóstico; a configuração real da hospedagem deve ser verificada após publicar.

Os relatórios completos `lighthouse-mobile.html` e `lighthouse-mobile.json` acompanham a entrega fora da pasta pública do site. Estas são medidas de laboratório local, não resultados de campo nem garantia para todos os dispositivos. INP de usuários reais não foi medido. A nota de acessibilidade automatizada não substitui uma auditoria manual completa com tecnologias assistivas.

## Responsividade

Larguras testadas: **320, 375, 390, 430, 768, 1024, 1440, 1920 e 2560 px**. Em todas:

- Sem overflow horizontal.
- Retrato e ícones carregados.
- Destinos das âncoras existentes.
- CLS observado igual a zero após corrigir o estado inicial do menu.

Revisões visuais do desktop e mobile foram realizadas em duas etapas. Ajustes incluíram ocultação do botão de menu no desktop, foco no link de salto e prevenção do deslocamento inicial no mobile.

## Interações e navegação

- Link “Pular para o conteúdo”: acessível por Tab; transfere o foco para `main`.
- Menu mobile: abre, fecha, responde a Escape e devolve o foco ao botão.
- Âncora do menu: fecha o menu e move foco ao destino.
- Quatro painéis de cases: abrem e fecham com Enter/Espaço.
- Redução de movimento: rolagem suave e animações desativadas.
- Pequeno teste do rodapé: verifica carregamento das imagens e limite horizontal; não é uma afirmação de que todos os testes do projeto passaram.
- Sem JavaScript: conteúdo, navegação e os quatro cases permanecem disponíveis em 320 px.
- Sem erros JavaScript ou falhas de recursos durante a suíte de navegação.
- Caminho inexistente: status HTTP 404, página própria e link funcional de retorno.

## Links, assets e SEO

- URLs locais referenciadas no HTML retornaram HTTP 200.
- `https://www.caracois.com.br`: HTTP 200.
- `https://beecosmetics.store`: HTTP 200.
- `https://github.com/shelldon-x`: HTTP 200.
- Links externos com nova aba incluem `noopener noreferrer`.
- JSON-LD validado sintaticamente, com `Person` e `WebSite`.
- Canonical, metadados sociais, favicon, manifest, robots e sitemap presentes.
- OG exportado em 1200 × 630 e inspecionado visualmente.

## Configurações opcionais

Testado com uma configuração temporária interceptada apenas no navegador de teste, sem alterar os dados entregues:

- LinkedIn, e-mail e WhatsApp aparecem com valores válidos.
- Valores vazios ficam ocultos.
- Nenhuma chamada a analytics antes do aceite.
- Recusa não carrega scripts.
- Aceite carrega as duas integrações configuradas.
- Revogação persiste a recusa e impede novos carregamentos após recarregar.
- Respostas dos provedores foram simuladas. O recebimento em propriedades reais não foi validado porque não foram fornecidos IDs.

## Repetir a auditoria

Inicie o site com `node tools/serve.mjs` e use Lighthouse no Chrome DevTools em modo mobile, com as quatro categorias habilitadas. Também é possível executar a CLI oficial:

```sh
npx lighthouse http://127.0.0.1:4173 --only-categories=performance,accessibility,best-practices,seo --output=html --output-path=./lighthouse.html
```

Esse comando baixa a ferramenta de auditoria; ela não é dependência do site. Repita no domínio público depois do deploy, especialmente após ativar analytics ou adicionar imagens.

## Limites da validação

Não foram testados Safari/iOS e Firefox reais, leitores de tela físicos, dados de campo, DNS, certificados do novo deploy ou ingestão real de analytics. Nenhuma publicação foi realizada. A fonte de verdade das notas é o relatório anexado, com suas condições de execução.


## Revisão empresarial — validação adicional

Nova auditoria Lighthouse após a revisão: 100 nas quatro categorias, LCP 1,7 s, CLS 0 e TBT 20 ms. Revalidados os nove tamanhos de tela, menu e ausência de erros JavaScript. Os dois CTAs de e-mail apontam para contato@shelldon.com.br. CNPJ e razão social foram conferidos visualmente no PDF; somente cidade/UF aparecem na página. O JSON-LD agora contém Person, WebSite e Organization. Links externos e integrações de analytics permanecem como na versão anteriormente testada.

