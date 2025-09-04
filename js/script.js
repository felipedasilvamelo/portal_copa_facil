// Portal de Procedimentos Copa Fácil - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Inicialização
    initializeNavigation();
    initializeSearch();
    initializeMobileMenu();
    initializeProcedures();
    
    console.log('Portal Copa Fácil carregado com sucesso!');
});

// ===== NAVEGAÇÃO ENTRE SEÇÕES =====
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            navigateToSection(targetId);
        });
    });
}

function navigateToSection(sectionId) {
    // Ocultar todas as seções
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar seção alvo
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Atualizar navegação ativa
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Fechar menu mobile se estiver aberto
    closeMobileMenu();
    
    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== FUNCIONALIDADE DE BUSCA =====
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            performSearch(searchTerm);
        });
    }
}

function performSearch(searchTerm) {
    if (searchTerm === '') {
        clearSearchResults();
        return;
    }
    
    const searchResults = [];
    
    // Buscar em procedimentos
    const procedures = document.querySelectorAll('.procedure-item');
    procedures.forEach(procedure => {
        const title = procedure.querySelector('.procedure-header h3').textContent.toLowerCase();
        const content = procedure.querySelector('.procedure-content').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || content.includes(searchTerm)) {
            searchResults.push({
                type: 'procedure',
                element: procedure,
                title: procedure.querySelector('.procedure-header h3').textContent,
                section: 'procedimentos'
            });
        }
    });
    
    // Buscar em respostas rápidas
    const responses = document.querySelectorAll('.response-item');
    responses.forEach(response => {
        const title = response.querySelector('h3').textContent.toLowerCase();
        const content = response.querySelector('.response-content p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || content.includes(searchTerm)) {
            searchResults.push({
                type: 'response',
                element: response,
                title: response.querySelector('h3').textContent,
                section: 'respostas-rapidas'
            });
        }
    });
    
    // Buscar em changelog
    const changelogItems = document.querySelectorAll('.changelog-item');
    changelogItems.forEach(item => {
        const title = item.querySelector('h4').textContent.toLowerCase();
        const content = item.textContent.toLowerCase();
        
        if (title.includes(searchTerm) || content.includes(searchTerm)) {
            searchResults.push({
                type: 'changelog',
                element: item,
                title: item.querySelector('h4').textContent,
                section: 'changelog'
            });
        }
    });
    
    displaySearchResults(searchResults);
}

function displaySearchResults(results) {
    // Remover resultados anteriores
    clearSearchResults();
    
    if (results.length === 0) {
        showNoResults();
        return;
    }
    
    // Criar container de resultados
    const resultsContainer = createSearchResultsContainer();
    
    results.forEach(result => {
        const resultItem = createSearchResultItem(result);
        resultsContainer.appendChild(resultItem);
    });
    
    // Mostrar seção de resultados
    navigateToSearchResults();
}

function createSearchResultsContainer() {
    let container = document.getElementById('search-results-section');
    
    if (!container) {
        container = document.createElement('section');
        container.id = 'search-results-section';
        container.className = 'section';
        container.innerHTML = `
            <h2>Resultados da Busca</h2>
            <div id="search-results-list"></div>
        `;
        document.querySelector('.content').appendChild(container);
    }
    
    const resultsList = container.querySelector('#search-results-list');
    resultsList.innerHTML = '';
    
    return resultsList;
}

function createSearchResultItem(result) {
    const item = document.createElement('div');
    item.className = 'search-result-item';
    item.innerHTML = `
        <div class="search-result-header">
            <h3>${result.title}</h3>
            <span class="search-result-type">${getSectionName(result.section)}</span>
        </div>
        <button class="search-result-btn" onclick="goToSearchResult('${result.section}', '${result.element.id || result.element.querySelector('h3, h4').textContent}')">
            Ver detalhes
        </button>
    `;
    
    // Adicionar estilos inline para os resultados de busca
    item.style.cssText = `
        background: white;
        border: 2px solid #e2e8f0;
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 1rem;
        transition: all 0.3s ease;
    `;
    
    item.addEventListener('mouseenter', function() {
        this.style.borderColor = '#50EA95';
        this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.borderColor = '#e2e8f0';
        this.style.boxShadow = 'none';
    });
    
    return item;
}

function getSectionName(sectionId) {
    const sectionNames = {
        'procedimentos': 'Procedimentos',
        'respostas-rapidas': 'Respostas Rápidas',
        'modelos-formularios': 'Modelos & Formulários',
        'changelog': 'Changelog'
    };
    return sectionNames[sectionId] || sectionId;
}

function goToSearchResult(section, itemIdentifier) {
    navigateToSection(section);
    
    // Destacar o item encontrado
    setTimeout(() => {
        const targetElement = findElementByIdentifier(section, itemIdentifier);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            highlightElement(targetElement);
        }
    }, 300);
}

function findElementByIdentifier(section, identifier) {
    const sectionElement = document.getElementById(section);
    if (!sectionElement) return null;
    
    // Tentar encontrar por ID
    let element = document.getElementById(identifier);
    if (element) return element;
    
    // Tentar encontrar por texto do título
    const titles = sectionElement.querySelectorAll('h3, h4');
    for (let title of titles) {
        if (title.textContent.includes(identifier)) {
            return title.closest('.procedure-item, .response-item, .changelog-item');
        }
    }
    
    return null;
}

function highlightElement(element) {
    const originalStyle = element.style.cssText;
    element.style.cssText += 'border: 3px solid #50EA95; background-color: rgba(80, 234, 149, 0.1);';
    
    setTimeout(() => {
        element.style.cssText = originalStyle;
    }, 3000);
}

function navigateToSearchResults() {
    navigateToSection('search-results-section');
}

function clearSearchResults() {
    const resultsSection = document.getElementById('search-results-section');
    if (resultsSection) {
        resultsSection.remove();
    }
}

function showNoResults() {
    const container = createSearchResultsContainer();
    container.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: #64748b;">
            <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; color: #50EA95;"></i>
            <h3>Nenhum resultado encontrado</h3>
            <p>Tente usar palavras-chave diferentes ou verifique a ortografia.</p>
        </div>
    `;
    navigateToSearchResults();
}

// ===== MENU MOBILE =====
function initializeMobileMenu() {
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (mobileToggle && sidebar) {
        mobileToggle.addEventListener('click', function() {
            toggleMobileMenu();
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }
}

function toggleMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

function closeMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.remove('active');
    }
}

// ===== PROCEDIMENTOS (ACCORDION) =====
function initializeProcedures() {
    const procedureHeaders = document.querySelectorAll('.procedure-header');
    
    procedureHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const procedureId = this.getAttribute('data-procedure');
            toggleProcedure(procedureId);
        });
    });
}

function toggleProcedure(procedureId) {
    const content = document.getElementById(procedureId);
    const header = content.previousElementSibling;
    const icon = header.querySelector('i');
    
    if (content.classList.contains('active')) {
        // Fechar
        content.classList.remove('active');
        icon.style.transform = 'rotate(0deg)';
    } else {
        // Fechar todos os outros procedimentos
        const allContents = document.querySelectorAll('.procedure-content');
        const allIcons = document.querySelectorAll('.procedure-header i');
        
        allContents.forEach(c => c.classList.remove('active'));
        allIcons.forEach(i => i.style.transform = 'rotate(0deg)');
        
        // Abrir o selecionado
        content.classList.add('active');
        icon.style.transform = 'rotate(180deg)';
    }
}

// ===== FUNCIONALIDADE DE COPIAR =====
function copyToClipboard(button, text) {
    // Usar a API moderna do clipboard se disponível
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showCopySuccess(button);
        }).catch(() => {
            fallbackCopyToClipboard(text, button);
        });
    } else {
        fallbackCopyToClipboard(text, button);
    }
}

function fallbackCopyToClipboard(text, button) {
    // Método alternativo para navegadores mais antigos
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccess(button);
    } catch (err) {
        console.error('Erro ao copiar texto:', err);
        showCopyError(button);
    }
    
    document.body.removeChild(textArea);
}

function showCopySuccess(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Copiado!';
    button.classList.add('copied');
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.classList.remove('copied');
    }, 2000);
}

function showCopyError(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-times"></i> Erro';
    button.style.backgroundColor = '#ef4444';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.backgroundColor = '';
    }, 2000);
}

// Função específica para copiar o template de bug
function copyBugTemplate() {
    const template = `**Passos para reproduzir:**
1. [Descreva o primeiro passo]
2. [Descreva o segundo passo]
3. [Continue até o problema ocorrer]

**Resultado esperado:**
[O que deveria acontecer]

**Resultado obtido:**
[O que realmente aconteceu]

**ID do campeonato:**
[ID ou link do campeonato]

**Horário do ocorrido:**
[Data e hora exata]

**Prints/evidências:**
[Anexar capturas de tela ou vídeos]`;

    const button = event.target;
    copyToClipboard(button, template);
}

// ===== UTILITÁRIOS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce na busca para melhor performance
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        const debouncedSearch = debounce(function() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            performSearch(searchTerm);
        }, 300);
        
        searchInput.removeEventListener('input', performSearch);
        searchInput.addEventListener('input', debouncedSearch);
    }
});

// ===== ANIMAÇÕES E EFEITOS =====
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos que devem ter animação
    const animatedElements = document.querySelectorAll('.card, .rule-item, .procedure-item, .response-item, .changelog-item');
    animatedElements.forEach(el => observer.observe(el));
}

// Inicializar animações quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', addScrollAnimations);

// ===== ACESSIBILIDADE =====
document.addEventListener('keydown', function(e) {
    // Navegação por teclado
    if (e.key === 'Escape') {
        closeMobileMenu();
        
        // Limpar busca se estiver ativa
        const searchInput = document.getElementById('searchInput');
        if (searchInput && searchInput.value) {
            searchInput.value = '';
            clearSearchResults();
            navigateToSection('home');
        }
    }
    
    // Atalhos de teclado
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'k':
                e.preventDefault();
                const searchInput = document.getElementById('searchInput');
                if (searchInput) {
                    searchInput.focus();
                }
                break;
        }
    }
});

// ===== FEEDBACK VISUAL =====
function addLoadingState(element) {
    element.classList.add('loading');
}

function removeLoadingState(element) {
    element.classList.remove('loading');
}

// ===== LOGS E DEBUG =====
function logAction(action, details = {}) {
    if (window.console && console.log) {
        console.log(`[Copa Fácil Portal] ${action}:`, details);
    }
}

// Log de navegação para analytics (se necessário)
function logNavigation(section) {
    logAction('Navegação', { section, timestamp: new Date().toISOString() });
}

// Interceptar navegação para logs
const originalNavigateToSection = navigateToSection;
navigateToSection = function(sectionId) {
    logNavigation(sectionId);
    return originalNavigateToSection(sectionId);
};

console.log('Portal Copa Fácil - JavaScript carregado e inicializado com sucesso!');

