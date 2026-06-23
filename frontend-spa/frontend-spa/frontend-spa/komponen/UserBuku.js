import Login from './komponen/Login.js';
import Dashboard from './komponen/Dashboard.js';
import Kategori from './komponen/Kategori.js';

const Home = {
    template: `
        <div class="min-h-screen bg-gradient-to-tr from-violet-100 via-purple-50 to-indigo-100 py-10 px-4">
            <div class="space-y-12 max-w-7xl mx-auto px-2 pb-20 animate-in fade-in duration-700">
                
                <div class="relative overflow-hidden bg-white/40 backdrop-blur-xl border border-white/60 p-10 md:p-12 rounded-[2.5rem] shadow-xl shadow-purple-200/40 text-slate-800">
                    <div class="absolute -right-10 -top-10 w-40 h-40 bg-purple-300/30 rounded-full blur-2xl pointer-events-none"></div>
                    <div class="absolute -left-10 -bottom-10 w-40 h-40 bg-indigo-300/30 rounded-full blur-2xl pointer-events-none"></div>
                    
                    <h2 class="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 mb-3 flex items-center gap-3">
                        📚 Perpustakaan Lola E-Library
                    </h2>
                    <p class="text-slate-600 text-base md:text-lg font-medium max-w-md leading-relaxed">
                        Jelajahi koleksi novel & komik eksklusif pilihanmu. Pinjam dengan sentuhan mudah nan ajaib! ✨
                    </p>
                </div>

                <div class="max-w-full">
                    <div class="relative bg-white/50 backdrop-blur-lg rounded-2xl border border-white/80 shadow-lg shadow-purple-100/50 focus-within:border-purple-400/60 focus-within:ring-4 focus-within:ring-purple-100/50 transition-all duration-300">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-xl">
                            🔍
                        </div>
                        <input 
                            v-model="searchQuery" 
                            type="text" 
                            placeholder="Cari novel atau penulis favoritmu di sini..." 
                            class="w-full pl-14 pr-12 py-4 bg-transparent text-slate-700 placeholder-purple-300 font-bold rounded-2xl outline-none text-base"
                        />
                        <button 
                            v-if="searchQuery" 
                            @click="searchQuery = ''" 
                            class="absolute inset-y-0 right-0 flex items-center pr-5 text-purple-400 hover:text-purple-600 transition-colors font-black text-lg"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                <div v-if="filteredBuku.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div v-for="buku in filteredBuku" :key="buku.id" 
                         class="group bg-white/40 backdrop-blur-md p-6 rounded-[2.5rem] border border-white/70 shadow-lg shadow-purple-100/30 hover:shadow-2xl hover:shadow-purple-200/50 hover:bg-white/60 transition-all duration-500 flex flex-col justify-between hover:-translate-y-2">
                        
                        <div>
                            <div class="w-14 h-14 bg-gradient-to-tr from-purple-100 to-indigo-50 text-purple-500 rounded-2xl flex items-center justify-center text-3xl mb-5 shadow-inner border border-white">
                                📖
                            </div>
                            <h3 class="font-black text-slate-800 text-lg mb-1 leading-tight tracking-tight group-hover:text-purple-700 transition-colors">
                                {{ buku.judul }}
                            </h3>
                            <p class="text-purple-500/90 text-xs font-bold mb-6">✍️ {{ buku.penulis }}</p>
                        </div>

                        <div>
                            <div class="flex justify-between items-center mb-5 text-[11px] font-black uppercase tracking-wider">
                                <span :class="parseInt(buku.stok) > 0 ? 'text-purple-600 bg-purple-100/60 px-3 py-1 rounded-full border border-purple-200/40' : 'text-rose-500 bg-rose-100/60 px-3 py-1 rounded-full border border-rose-200/40'">
                                    {{ parseInt(buku.stok) > 0 ? '🌸 Tersedia' : '☁️ Habis' }}
                                </span>
                                <span class="text-slate-400/90 font-bold bg-white/40 px-2 py-0.5 rounded-md">{{ buku.stok }} Unit</span>
                            </div>

                            <button @click="pinjamBuku(buku)" 
                                    :disabled="parseInt(buku.stok) <= 0"
                                    class="w-full py-3.5 rounded-2xl font-black text-sm transition-all duration-300 shadow-md active:scale-95 border"
                                    :class="parseInt(buku.stok) > 0 ? 'bg-gradient-to-r from-purple-400 to-indigo-400 hover:from-purple-500 hover:to-indigo-500 text-white border-purple-300/40 shadow-purple-200' : 'bg-slate-200/50 text-slate-400 border-transparent cursor-not-allowed shadow-none'">
                                {{ parseInt(buku.stok) > 0 ? 'Pinjam Sekarang ✨' : 'Stok Kosong' }}
                            </button>
                        </div>
                    </div>
                </div>

                <div v-else-if="listBuku.length > 0" class="text-center py-16 bg-white/30 backdrop-blur-lg rounded-[2.5rem] border border-dashed border-purple-300/60 max-w-md mx-auto p-8 shadow-lg">
                    <p class="text-5xl animate-bounce mb-2">💫</p>
                    <h4 class="font-black text-slate-700 text-lg">Buku Gak Ditemukan</h4>
                    <p class="text-sm text-slate-500 mt-1 font-medium">Koleksi novel di Perpustakaan Lola dengan kata kunci "{{ searchQuery }}" belum ada di rak nih.</p>
                </div>
            </div>
        </div>
    `,
    data() { 
        return { 
            listBuku: [],
            searchQuery: '' 
        } 
    },
    computed: {
        filteredBuku() {
            const query = this.searchQuery.toLowerCase().trim();
            if (!query) return this.listBuku;
            return this.listBuku.filter(buku => {
                const judul = buku.judul ? buku.judul.toLowerCase() : '';
                const penulis = buku.penulis ? buku.penulis.toLowerCase() : '';
                return judul.includes(query) || penulis.includes(query);
            });
        }
    },
    methods: {
        async fetchKatalog() {
            try {
                const response = await axios.get('http://localhost:8080/api/buku');
                this.listBuku = response.data;
            } catch (error) { console.error(error); }
        },
        pinjamBuku(buku) {
            const nama = prompt("Masukkan nama lengkap Anda:");
            if (!nama || nama.trim() === "") return;

            const token = localStorage.getItem('token'); 

            axios.post('http://localhost:8080/api/peminjaman', 
                { buku_id: buku.id, nama_peminjam: nama }, 
                { headers: { 'Authorization': `Bearer ${token}` } }
            )
            .then(() => { 
                alert("Sukses meminjam novel!"); 
                buku.stok = parseInt(buku.stok) - 1; 
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    alert("Gagal meminjam: Sesi berakhir. Silakan login kembali.");
                } else {
                    alert("Gagal meminjam. Terjadi kesalahan pada server.");
                }
                console.error(error);
            });
        }
    },
    mounted() { this.fetchKatalog(); }
};

const router = VueRouter.createRouter({ 
    history: VueRouter.createWebHashHistory(), 
    routes: [
        { path: '/', component: Home },
        { path: '/login', component: Login },
        { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
        { path: '/kategori', component: Kategori, meta: { requiresAuth: true } }
    ]
});

router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isLoggedIn) { next('/login'); } else { next(); }
    } else { next(); }
});

const app = Vue.createApp({
    data() { 
        return { isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' } 
    },
    watch: {
        $route() { this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; }
    },
    methods: {
        logout() {
            localStorage.clear();
            this.isLoggedIn = false;
            this.$router.push('/').then(() => { window.location.reload(); });
        }
    }
});

app.use(router);
app.mount('#app');