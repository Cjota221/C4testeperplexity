// assets/js/modules/clients.js
C4App.modules.clients = {
  clientsList: [],
  async init() {
    await this.loadClients();
    this.render();
  },
  async loadClients() {
    const resp = await C4App.database.read('clients', { user_id: C4App.auth.user.id });
    this.clientsList = resp.success ? resp.data : [];
  },
  render() {
    const container = document.querySelector('#clients-page .grid-container');
    container.innerHTML = '';
    this.clientsList.forEach(client => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="card-header">${client.name}</div>
        <div class="card-content">
          <p>Telefone: ${client.phone}</p>
          <p>Email: ${client.email}</p>
          <p>Última compra: ${client.last_purchase ? new Date(client.last_purchase).toLocaleDateString() : '-'}</p>
        </div>
      `;
      container.appendChild(card);
    });
  }
};
