const C4App = {
  config: {
    environment: 'development'
  },
  modules: {},
  init() {
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
