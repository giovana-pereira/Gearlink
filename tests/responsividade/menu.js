/* Guarda todos os elementos que possuem a classe .sidebar-menu-item */
var menuItems = document.querySelectorAll('.sidebar-menu-item');
var sidebarToggle = document.getElementById('sidebarToggle');
var sidebar = document.getElementById('sidebar'); // Usando o ID
var body = document.body;
var toggleIcon = sidebarToggle.querySelector('iconify-icon');
var toggleText = sidebarToggle.querySelector('.txt-link');

// Função para selecionar o link ativo
function selectLink() {
    menuItems.forEach((item) => {
        item.classList.remove('ativo');
        // Também remove a classe 'ativo' do ícone e texto dentro do item
        item.querySelector('.iconify-icon')?.classList.remove('ativo');
        item.querySelector('.txt-link')?.classList.remove('ativo');
    });
    this.classList.add('ativo');
    // Adiciona a classe 'ativo' ao ícone e texto do item clicado
    this.querySelector('.iconify-icon')?.classList.add('ativo');
    this.querySelector('.txt-link')?.classList.add('ativo');

    // Salva o link ativo no localStorage (opcional, para manter o estado após recarregar)
    localStorage.setItem('activeMenuItem', this.querySelector('a').href);
}

// Adiciona escutador de evento para cada item do menu
menuItems.forEach((item) => {
    // Garante que o evento seja no <a> dentro do <li>
    const link = item.querySelector('a');
    if (link) {
        link.addEventListener('click', function(event) {
            // Previne o comportamento padrão do link para que o JS possa gerenciar
            event.preventDefault();
            // Chama a função selectLink no elemento pai (o LI)
            selectLink.call(item);

            // Redireciona após a classe 'ativo' ser aplicada
            // Removido o setTimeout para redirecionar imediatamente após a classe ser aplicada
            window.location.href = this.href;
        });
    }
});

// **Função para expandir/recolher o menu e o conteúdo principal**
if (sidebarToggle) {
    sidebarToggle.addEventListener('click', function(event) {
        event.preventDefault(); // Previne o comportamento padrão do link

        // Ação centralizada: alterna a classe 'expandir' no body.
        body.classList.toggle('expandir');
        sidebar.classList.toggle('expandir');
        
        // O restante da lógica de troca de texto e ícone
        if (body.classList.contains('expandir')) {
            toggleIcon.setAttribute('icon', 'material-symbols-light:keyboard-double-arrow-right-rounded');
            toggleText.textContent = 'Ocultar menu';
        } else {
            toggleIcon.setAttribute('icon', 'material-symbols-light:keyboard-double-arrow-right-rounded');
            toggleText.textContent = 'Exibir menu';
        }
    });
}


// Ao carregar a página, verifica se há um item ativo salvo e o aplica
document.addEventListener('DOMContentLoaded', () => {
    const activeLinkHref = localStorage.getItem('activeMenuItem');
    if (activeLinkHref) {
        menuItems.forEach(item => {
            const link = item.querySelector('a');
            if (link && link.href === activeLinkHref) {
                item.classList.add('ativo');
                item.querySelector('.iconify-icon')?.classList.add('ativo');
                item.querySelector('.txt-link')?.classList.add('ativo');
            }
        });
    } else {
        // Se nenhum item estiver salvo, define o Dashboard como ativo por padrão
        const dashboardItem = document.querySelector('.sidebar-menu-item a[href="index.html"]')?.closest('.sidebar-menu-item');
        if (dashboardItem) {
            dashboardItem.classList.add('ativo');
            dashboardItem.querySelector('.iconify-icon')?.classList.add('ativo');
            dashboardItem.querySelector('.txt-link')?.classList.add('ativo');
        }
    }

    // Inicializa o texto e ícone do botão de toggle com base no estado inicial do sidebar
    if (sidebar.classList.contains('expandir')) {
        toggleIcon.setAttribute('icon', 'material-symbols-light:keyboard-double-arrow-left-rounded');
        toggleText.textContent = 'Ocultar menu';
    } else {
        toggleIcon.setAttribute('icon', 'material-symbols-light:keyboard-double-arrow-right-rounded');
        toggleText.textContent = 'Exibir menu';
    }
});




        
