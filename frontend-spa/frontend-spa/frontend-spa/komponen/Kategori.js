export default {
    template: `
        <div class="p-6 bg-slate-50/50 min-h-screen font-sans">
            <div class="max-w-4xl mx-auto space-y-6">
                
                <div class="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div>
                        <h2 class="text-xl font-black text-slate-800 tracking-tight">Kategori Buku</h2>
                        <p class="text-xs font-bold text-violet-500 uppercase tracking-wider">Kelola Kategori Koleksi Library</p>
                    </div>
                    <span class="text-2xl">📚</span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-fit space-y-4">
                        <h3 class="text-sm font-black text-slate-700 uppercase tracking-wider">Tambah Kategori</h3>
                        <form @submit.prevent="tambahKategori" class="space-y-4">
                            <div class="space-y-1.5">
                                <label class="block text-xs font-bold text-slate-500">Nama Kategori</label>
                                <input v-model="kategoriBaru" type="text" 
                                       class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm text-slate-700 placeholder:text-slate-400 focus:bg-white focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition-all"
                                       placeholder="Contoh: Novel, Komik..." required>
                            </div>
                            <button type="submit" 
                                    class="w-full py-3 bg-violet-400 hover:bg-violet-500 text-white font-black text-xs rounded-xl shadow-md shadow-violet-100 transition-all uppercase tracking-widest">
                                Simpan Kategori
                            </button>
                        </form>
                    </div>

                    <div class="md:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        <div class="p-6 border-b border-slate-100">
                            <h3 class="text-sm font-black text-slate-700 uppercase tracking-wider">Daftar Kategori Tersedia</h3>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="w-full text-left border-collapse">
                                <thead class="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-100">
                                    <tr>
                                        <th class="px-6 py-3.5 text-center w-16">No</th>
                                        <th class="px-6 py-3.5">Nama Kategori</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-slate-50 text-sm font-bold text-slate-600">
                                    <tr v-for="(kat, index) in daftarKategori" :key="kat.id_kategori" class="hover:bg-slate-50/50 transition-colors">
                                        <td class="px-6 py-4 text-center text-slate-400">{{ index + 1 }}</td>
                                        <td class="px-6 py-4 text-slate-700">{{ kat.nama_kategori }}</td>
                                    </tr>
                                    <tr v-if="daftarKategori.length === 0">
                                        <td colspan="2" class="px-6 py-8 text-center text-slate-400 text-xs uppercase tracking-wider font-bold">Belum ada kategori.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `,
    data() {
        return {
            daftarKategori: [],
            kategoriBaru: ''
        }
    },
    mounted() {
        this.ambilKategori();
    },
    methods: {
        async ambilKategori() {
            try {
                const response = await axios.get('http://localhost:8080/api/kategori');
                this.daftarKategori = response.data;
            } catch (error) {
                console.error("Gagal mengambil kategori:", error);
            }
        },
        async tambahKategori() {
            try {
                await axios.post('http://localhost:8080/api/kategori', {
                    nama_kategori: this.kategoriBaru
                });
                alert('Kategori berhasil ditambahkan!');
                this.kategoriBaru = '';
                this.ambilKategori(); 
            } catch (error) {
                alert('Gagal menambah kategori.');
            }
        }
    }
}