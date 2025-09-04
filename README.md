# Portal de Procedimentos - Copa Fácil

## Descrição
Portal interno de informações e guia de procedimentos para a equipe de suporte da Copa Fácil. Site estático responsivo desenvolvido em HTML, CSS e JavaScript.

## Estrutura do Projeto
```
copa-facil-portal/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos CSS responsivos
├── js/
│   └── script.js       # Funcionalidades JavaScript
├── assets/             # Diretório para imagens e outros recursos
├── README.md           # Este arquivo
└── todo.md            # Lista de tarefas do projeto
```

## Funcionalidades
- ✅ Layout responsivo (mobile-first)
- ✅ Navegação lateral fixa (desktop)
- ✅ Barra de busca inteligente
- ✅ Seções organizadas: Home, Como Usar, Procedimentos, Respostas Rápidas, Modelos & Formulários, Changelog
- ✅ Accordion para procedimentos
- ✅ Botões de copiar texto com feedback visual
- ✅ Design com cores da marca Copa Fácil (#384355 e #50EA95)
- ✅ Tipografia Inter/Arial

## Como Usar

### Para visualizar o portal:
1. Abra o arquivo `index.html` em qualquer navegador web moderno
2. O portal funcionará completamente offline

### Para editar conteúdo:

#### Adicionar novos procedimentos:
1. Abra o arquivo `index.html`
2. Localize o comentário `<!-- EDITAR AQUI: Adicione novos procedimentos na lista abaixo -->`
3. Copie a estrutura de um procedimento existente
4. Modifique o conteúdo conforme necessário
5. Certifique-se de usar IDs únicos (proc4, proc5, etc.)

#### Adicionar novas respostas rápidas:
1. Abra o arquivo `index.html`
2. Localize o comentário `<!-- EDITAR AQUI: Adicione novas respostas rápidas na lista abaixo -->`
3. Copie a estrutura de uma resposta existente
4. Modifique o texto e a função `copyToClipboard()`

#### Adicionar entradas no changelog:
1. Abra o arquivo `index.html`
2. Localize o comentário `<!-- EDITAR AQUI: Adicione novas entradas de changelog na lista abaixo -->`
3. Copie a estrutura de uma entrada existente
4. Adicione a nova entrada no topo da lista

### Para personalizar o design:
1. Abra o arquivo `css/styles.css`
2. Modifique as variáveis CSS no `:root` para alterar cores, fontes e espaçamentos
3. As cores principais estão definidas em `--primary-color` e `--accent-color`

## Tecnologias Utilizadas
- HTML5 semântico
- CSS3 com variáveis customizadas
- JavaScript ES6+
- Font Awesome (ícones)
- Google Fonts (Inter)

## Compatibilidade
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Dispositivos móveis (iOS/Android)

## Suporte
Para dúvidas sobre o portal, consulte a seção "Como Usar" dentro do próprio sistema ou entre em contato com a equipe de desenvolvimento.

---
**Copa Fácil** - Processo claro. Time forte. Cliente feliz.

