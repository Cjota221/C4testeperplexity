const C4App = {
  config: {
    environment: 'development'
  },
  modules: {},
  user: null,

  async init() {
    // Inicializar Supabase (config.js deve ser carregado antes)
    this.database = C4App.database;
    this.auth = C4App.auth;

    await this.auth.checkAuth();

    // Inicializar módulos
    this.modules.products = C4App.modules.products;
    this.modules.sales = C4App.modules.sales;
    Object.values(this.modules).forEach(module => {
      if (module.init) module.init();
    });

    this.setupNavigation();
    this.navigate('dashboard');
  },

  setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.navigate(btn.dataset.page);
      });
    });
  },

  navigate(pageId) {
    document.querySelectorAll('.page').forEach(page => {
      page.style.display = 'none';
      page.classList.remove('active');
    });
    const targetPage = document.getElementById(`${pageId}-page`);
    if (targetPage) {
      targetPage.style.display = 'block';
      targetPage.classList.add('active');
      // Renderizar módulo se existir
      if (this.modules[pageId] && this.modules[pageId].render) {
        this.modules[pageId].render();
      }
    }
    // Atualizar estado ativo dos botões
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.page === pageId);
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  C4App.init();
});
