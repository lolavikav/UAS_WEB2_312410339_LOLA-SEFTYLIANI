export default {
    template: `
        <div class="min-h-screen w-full flex items-center justify-center p-6 bg-gradient-to-tr from-pink-100 via-rose-50 to-purple-100 font-sans relative overflow-hidden">
            
            <!-- Ornamen Background Estetik Soft Pink-Purple -->
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div class="absolute -top-40 -right-40 w-[500px] h-[500px] bg-pink-200/40 rounded-full blur-[120px]"></div>
                <div class="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-[120px]"></div>
            </div>

            <!-- Kartu Login Glassmorphism Soft -->
            <div class="relative z-10 w-full max-w-md bg-white/60 backdrop-blur-2xl p-10 md:p-12 rounded-[2.5rem] border border-white/80 shadow-xl shadow-pink-100/40 space-y-8 animate-in fade-in zoom-in-95 duration-500">
                
                <div class="flex flex-col items-center space-y-4">
                    <div class="relative group">
                        <!-- Kotak Ikon Diubah Jadi Gradasi Pink -->
                        <div class="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-400 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-200 transition-transform group-hover:scale-105 duration-300 transform rotate-3">
                            <span class="text-3xl transform -rotate-3">📖</span>
                        </div>
                        <div class="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full border-2 border-pink-100 flex items-center justify-center text-xs shadow-sm">✨</div>
                    </div>
                    <div class="text-center space-y-1">
                        <!-- Nama Diganti Jadi Perpustakaan Lola dengan Teks Gradasi -->
                        <h2 class="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                            Perpustakaan Lola
                        </h2>
                        <p class="text-[10px] font-black text-pink-400 uppercase tracking-widest">Sistem Akses Dashboard</p>
                    </div>
                </div>

                <form @submit.prevent="submitLogin" class="space-y-5">
                    <div class="space-y-1.5">
                        <label class="block text-xs font-black text-slate-500 uppercase tracking-wider">Username Admin</label>
                        <div class="relative">
                            <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 select-none pointer-events-none">👤</span>
                            <!-- Fokus Input Diubah Jadi Pink -->
                            <input v-model="username" type="text" 
                                   class="w-full pl-11 pr-4 py-3.5 bg-white/60 border border-slate-200/50 rounded-xl font-bold text-sm text-slate-700 placeholder:text-slate-400/70 focus:bg-white focus:border-pink-300 focus:ring-4 focus:ring-pink-100 outline-none transition-all shadow-inner" 
                                   placeholder="Masukkan username..." required>
                        </div>
                    </div>
                    
                    <div class="space-y-1.5">
                        <label class="block text-xs font-black text-slate-500 uppercase tracking-wider">Kata Sandi</label>
                        <div class="relative">
                            <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 select-none pointer-events-none">🔒</span>
                            <!-- Fokus Input Diubah Jadi Pink -->
                            <input v-model="password" type="password" 
                                   class="w-full pl-11 pr-4 py-3.5 bg-white/60 border border-slate-200/50 rounded-xl font-bold text-sm text-slate-700 placeholder:text-slate-400/70 focus:bg-white focus:border-pink-300 focus:ring-4 focus:ring-pink-100 outline-none transition-all shadow-inner" 
                                   placeholder="••••••••" required>
                        </div>
                    </div>
                    
                    <!-- Tombol Masuk Aplikasi Diubah Total ke Pink Gradasi -->
                    <button type="submit" 
                            class="w-full py-4 mt-2 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white font-black text-xs rounded-xl shadow-lg shadow-pink-200 transition-all active:scale-95 uppercase tracking-widest">
                        Masuk Aplikasi
                    </button>
                </form>

                <div class="text-center">
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">© 2026 Universitas Pelita Bangsa</p>
                </div>
            </div>
        </div>
    `,
    data() { 
        return { 
            username: '', 
            password: '' 
        } 
    },
    methods: {
        async submitLogin() {
            try {
                const response = await axios.post('http://localhost:8080/api/auth/login', {
                    username: this.username,
                    password: this.password
                });
                if (response.data.token) {
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('token', response.data.token);
                    alert('Login Berhasil! Selamat datang admin.');
                    this.$router.push('/dashboard');
                }
            } catch (error) {
                console.error("Gagal Otentikasi:", error);
                alert('Kombinasi Username & Password salah.');
            }
        }
    }
}