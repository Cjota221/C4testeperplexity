C4App.auth = {
  async checkAuth() {
    const user = supabase.auth.user();
    if (!user) {
      // Redirecionar para login ou mostrar modal
      this.showLogin();
    } else {
      this.user = user;
      console.log('Usuário autenticado:', user.email);
    }
  },

  async signIn(email, password) {
    const { user, error } = await supabase.auth.signIn({ email, password });
    if (error) {
      alert('Erro no login: ' + error.message);
      return false;
    }
    this.user = user;
    C4App.navigate('dashboard');
    return true;
  },

  async signOut() {
    await supabase.auth.signOut();
    this.user = null;
    this.showLogin();
  },

  showLogin() {
    // Aqui você pode implementar um modal ou página de login
    alert('Por favor, faça login para continuar.');
  }
};
