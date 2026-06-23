const Dashboard = {
    template: `
        <div class="min-h-screen bg-gradient-to-tr from-pink-100 via-purple-100 to-sky-100 relative overflow-hidden font-sans">
            <div class="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-pink-300/30 rounded-full blur-[80px] pointer-events-none"></div>
            <div class="absolute bottom-[-5%] right-[-5%] w-[35vw] h-[35vw] bg-sky-300/30 rounded-full blur-[80px] pointer-events-none"></div>
            <div class="absolute top-[40%] left-[50%] w-[25vw] h-[25vw] bg-purple-300/20 rounded-full blur-[60px] pointer-events-none"></div>

            <div class="space-y-8 max-w-[1600px] mx-auto mt-6 px-4 md:px-6 pb-20 relative z-10 animate-in fade-in duration-700">
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="bg-white/40 backdrop-blur-xl p-6 rounded-[2.5rem] text-slate-800 border border-white/60 shadow-xl shadow-purple-200/40 flex items-center gap-5 relative overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:shadow-purple-300/50 hover:-translate-y-1.5">
                        <div class="absolute top-0 right-0 w-32 h-32 bg-pink-200/40 rounded-full blur-xl -mr-5 -mt-5 transition-all duration-700 group-hover:scale-125"></div>
                        <div class="absolute -right-4 -bottom-4 text-pink-300/20 text-8xl font-black select-none transform rotate-12 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">📚</div>
                        <div class="w-14 h-14 bg-pink-200/60 text-pink-600 rounded-2xl flex items-center justify-center text-2xl backdrop-blur-md shadow-sm border border-white/50 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">📖</div>
                        <div class="relative z-10">
                            <span class="block text-[11px] font-black uppercase tracking-widest text-slate-400">Total Judul</span>
                            <span class="block text-2xl font-black mt-0.5 leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">{{ listBuku.length }} Koleksi</span>
                        </div>
                    </div>

                    <div class="bg-white/40 backdrop-blur-xl p-6 rounded-[2.5rem] text-slate-800 border border-white/60 shadow-xl shadow-emerald-200/40 flex items-center gap-5 relative overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-300/50 hover:-translate-y-1.5">
                        <div class="absolute top-0 right-0 w-32 h-32 bg-emerald-200/40 rounded-full blur-xl -mr-5 -mt-5 transition-all duration-700 group-hover:scale-125"></div>
                        <div class="absolute -right-4 -bottom-4 text-emerald-300/20 text-8xl font-black select-none transform rotate-12 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">📦</div>
                        <div class="w-14 h-14 bg-emerald-100/70 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl backdrop-blur-md shadow-sm border border-white/50 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">📦</div>
                        <div class="relative z-10">
                            <span class="block text-[11px] font-black uppercase tracking-widest text-slate-400">Total Stok</span>
                            <span class="block text-2xl font-black mt-0.5 leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">{{ totalStok }} Buku</span>
                        </div>
                    </div>

                    <div class="bg-white/40 backdrop-blur-xl p-6 rounded-[2.5rem] text-slate-800 border border-white/60 shadow-xl shadow-rose-200/40 flex items-center gap-5 relative overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:shadow-rose-300/50 hover:-translate-y-1.5">
                        <div class="absolute top-0 right-0 w-32 h-32 bg-rose-200/40 rounded-full blur-xl -mr-5 -mt-5 transition-all duration-700 group-hover:scale-125"></div>
                        <div class="absolute -right-4 -bottom-4 text-rose-300/20 text-8xl font-black select-none transform rotate-12 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">🧸</div>
                        <div class="w-14 h-14 bg-rose-100/70 text-rose-500 rounded-2xl flex items-center justify-center text-2xl backdrop-blur-md shadow-sm border border-white/50 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">⚠️</div>
                        <div class="relative z-10">
                            <span class="block text-[11px] font-black uppercase tracking-widest text-slate-400">Stok Kosong</span>
                            <span class="block text-2xl font-black mt-0.5 leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">{{ stokKosong }} Judul</span>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    
                    <div class="bg-white/30 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/60 shadow-xl shadow-purple-200/30 space-y-6">
                        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                            <div>
                                <h3 class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">✨ Manajemen Koleksi</h3>
                                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Sirkulasi data buku digital.</p>
                            </div>
                            <button @click="bukaModalTambah" class="px-5 py-3 bg-gradient-to-r from-purple-400 via-pink-400 to-pink-500 hover:opacity-90 text-white rounded-2xl font-black text-xs shadow-md shadow-pink-200 border border-white/20 transition-all active:scale-95 flex items-center justify-center gap-1.5 self-start sm:self-auto">
                                <span>🧸</span> Tambah Buku
                            </button>
                        </div>

                        <div class="overflow-x-auto rounded-[2rem] border border-white/40 shadow-inner bg-white/20">
                            <table class="w-full text-left border-collapse">
                                <thead>
                                    <tr class="bg-white/40 text-slate-500 text-[10px] font-black uppercase tracking-widest border-b border-white/40">
                                        <th class="px-5 py-4">Judul Buku</th>
                                        <th class="px-5 py-4">Penulis</th>
                                        <th class="px-5 py-4">Stok</th>
                                        <th class="px-5 py-4 text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-white/30 text-xs font-bold text-slate-700">
                                    <tr v-for="buku in listBuku" :key="buku.id" class="hover:bg-white/40 transition-colors">
                                        <td class="px-5 py-4">
                                            <b class="block text-slate-800 leading-tight hover:text-purple-600 transition-colors">{{ buku.judul }}</b>
                                        </td>
                                        <td class="px-5 py-4 text-purple-600 font-extrabold">
                                            🎀 {{ buku.penulis }}
                                        </td>
                                        <td class="px-5 py-4">
                                            <span :class="parseInt(buku.stok) > 0 ? 'text-emerald-600 bg-emerald-100/60 border border-emerald-200/50 px-2.5 py-1 rounded-xl text-[11px] font-black shadow-sm' : 'text-rose-500 bg-rose-100/60 border border-rose-200/50 px-2.5 py-1 rounded-xl text-[11px] font-black shadow-sm'">
                                                {{ buku.stok }} Buku
                                            </span>
                                        </td>
                                        <td class="px-5 py-4">
                                            <div class="flex items-center justify-center gap-1.5">
                                                <button v-if="parseInt(buku.stok) > 0" @click="bukaModalPinjam(buku)" class="px-3 py-1.5 bg-purple-100/70 text-purple-600 hover:bg-purple-200 border border-purple-200/40 rounded-xl text-[11px] font-black transition-all shadow-sm" title="Pinjam Buku">🍭 Pinjam</button>
                                                <button @click="editBuku(buku)" class="p-2 bg-amber-100/70 text-amber-600 hover:bg-amber-200 border border-amber-200/40 rounded-xl transition-all shadow-sm" title="Ubah Data">✏️</button>
                                                <button @click="hapusBuku(buku.id)" class="p-2 bg-rose-100/70 text-rose-600 hover:bg-rose-200 border border-rose-200/40 rounded-xl transition-all shadow-sm" title="Hapus Buku">🗑️</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr v-if="listBuku.length === 0">
                                        <td colspan="4" class="text-center py-12 text-slate-400 font-medium bg-white/10">Data Buku masih kosong (•_•)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="bg-white/30 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/60 shadow-xl shadow-purple-200/30 space-y-6">
                        <div>
                            <h3 class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">🌸 Riwayat Peminjaman</h3>
                            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Log sirkulasi mahasiswa.</p>
                        </div>

                        <div class="overflow-x-auto rounded-[2rem] border border-white/40 shadow-inner bg-white/20">
                            <table class="w-full text-left border-collapse">
                                <thead>
                                    <tr class="bg-white/40 text-slate-500 text-[10px] font-black uppercase tracking-widest border-b border-white/40">
                                        <th class="px-5 py-4">Peminjam & Buku</th>
                                        <th class="px-5 py-4">Status</th>
                                        <th class="px-5 py-4 text-center">Respon</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-white/30 text-xs font-bold text-slate-700">
                                    <tr v-for="log in listPeminjaman" :key="log.id" class="hover:bg-white/40 transition-colors">
                                        <td class="px-5 py-4">
                                            <b class="block text-slate-800 leading-tight">🍼 {{ log.nama_peminjam }}</b>
                                            <span class="text-[10px] text-purple-400 font-medium mt-0.5 block pl-4">📘 {{ log.judul_buku || 'Buku Terhapus' }}</span>
                                        </td>
                                        <td class="px-5 py-4">
                                            <span class="text-purple-600 bg-purple-100/70 border border-purple-200/50 px-2.5 py-1 rounded-xl text-[10px] uppercase font-black tracking-widest shadow-sm">
                                                Aktif
                                            </span>
                                        </td>
                                        <td class="px-5 py-4">
                                            <div class="flex items-center justify-center">
                                                <button @click="kembalikanBuku(log.id)" class="px-4 py-1.5 bg-emerald-100/70 text-emerald-600 hover:bg-emerald-200 border border-emerald-200/40 rounded-xl font-black text-[11px] transition-all shadow-sm active:scale-95">🐾 Selesai</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr v-if="listPeminjaman.length === 0">
                                        <td colspan="3" class="text-center py-12 text-slate-400 font-medium bg-white/10">Tidak ada pinjaman aktif o(〃＾▽＾〃)o</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>

            <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-md p-4">
                <div class="bg-white/60 backdrop-blur-2xl w-full max-w-md p-8 rounded-[2.5rem] border border-white shadow-2xl shadow-purple-300/40 space-y-6 animate-in zoom-in-95 duration-200">
                    <div>
                        <h4 class="text-xl font-black text-slate-800 tracking-tight">
                            {{ isEditMode ? '📝 Edit Data Buku' : '⭐ Tambah Buku Baru' }}
                        </h4>
                        <p class="text-[11px] font-black text-slate-400 uppercase tracking-wider mt-0.5">Isi detail kelengkapan katalog.</p>
                    </div>

                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs font-black text-slate-500 mb-1.5 uppercase tracking-wider">Judul Buku</label>
                            <input v-model="formData.judul" type="text" placeholder="Contoh: The Midnight Library" class="w-full px-4 py-3 bg-white/50 border border-white/80 rounded-2xl font-bold text-sm text-slate-700 placeholder-slate-400/70 focus:bg-white focus:border-purple-300 focus:ring-4 focus:ring-purple-100 outline-none transition-all shadow-inner" required />
                        </div>
                        <div>
                            <label class="block text-xs font-black text-slate-500 mb-1.5 uppercase tracking-wider">Nama Penulis</label>
                            <input v-model="formData.penulis" type="text" placeholder="Contoh: Matt Haig" class="w-full px-4 py-3 bg-white/50 border border-white/80 rounded-2xl font-bold text-sm text-slate-700 placeholder-slate-400/70 focus:bg-white focus:border-purple-300 focus:ring-4 focus:ring-purple-100 outline-none transition-all shadow-inner" required />
                        </div>
                        <div>
                            <label class="block text-xs font-black text-slate-500 mb-1.5 uppercase tracking-wider">Kategori Buku</label>
                            <select v-model="formData.kategori_id" class="w-full px-4 py-3 bg-white/50 border border-white/80 rounded-2xl font-bold text-sm text-slate-700 focus:bg-white focus:border-purple-300 focus:ring-4 focus:ring-purple-100 outline-none transition-all shadow-inner" required>
                                <option value="" disabled>-- Pilih Kategori --</option>
                                <option v-for="kat in listKategori" :key="kat.id_kategori || kat.id" :value="kat.id_kategori || kat.id">
                                    {{ kat.nama_kategori }}
                                </option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-black text-slate-500 mb-1.5 uppercase tracking-wider">Jumlah Stok</label>
                            <input v-model="formData.stok" type="number" placeholder="Contoh: 10" class="w-full px-4 py-3 bg-white/50 border border-white/80 rounded-2xl font-bold text-sm text-slate-700 placeholder-slate-400/70 focus:bg-white focus:border-purple-300 focus:ring-4 focus:ring-purple-100 outline-none transition-all shadow-inner" required />
                        </div>
                    </div>

                    <div class="flex gap-3 pt-2">
                        <button @click="tutupModal" class="flex-1 py-3.5 bg-white/40 border border-white/80 hover:bg-slate-100/60 text-slate-500 font-black text-xs rounded-2xl transition-all uppercase tracking-widest">
                            Batal
                        </button>
                        <button @click="simpanData" class="flex-1 py-3.5 bg-gradient-to-r from-purple-400 to-pink-400 hover:opacity-90 text-white font-black text-xs rounded-2xl shadow-md shadow-pink-200 transition-all uppercase tracking-widest">
                            Simpan
                        </button>
                    </div>
                </div>
            </div>

            <div v-if="showModalPinjam" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-md p-4">
                <div class="bg-white/60 backdrop-blur-2xl w-full max-w-md p-8 rounded-[2.5rem] border border-white shadow-2xl shadow-purple-300/40 space-y-6 animate-in zoom-in-95 duration-200">
                    <div>
                        <h4 class="text-xl font-black text-slate-800 tracking-tight">🎒 Formulir Pinjam Buku</h4>
                        <p class="text-[11px] font-black text-slate-400 uppercase tracking-wider mt-0.5">Konfirmasi pencatatan sirkulasi buku.</p>
                    </div>

                    <div class="p-4 bg-purple-100/40 border border-white/60 rounded-2xl space-y-1 backdrop-blur-sm shadow-inner">
                        <span class="block text-[10px] font-black uppercase tracking-wider text-purple-400">Buku yang dipilih:</span>
                        <span class="block text-sm font-black text-slate-800 leading-tight">🎨 {{ dataBukuDipilih.judul }}</span>
                        <span class="block text-xs font-bold text-slate-500 mt-0.5 pl-4">Penulis: {{ dataBukuDipilih.penulis }}</span>
                    </div>

                    <div class="space-y-2">
                        <label class="block text-xs font-black text-slate-500 uppercase tracking-wider">Nama Lengkap Peminjam</label>
                        <input v-model="formPinjam.nama_peminjam" type="text" placeholder="Masukkan nama mahasiswa..." class="w-full px-4 py-3 bg-white/50 border border-white/80 rounded-2xl font-bold text-sm text-slate-700 placeholder-slate-400/70 focus:bg-white focus:border-purple-300 focus:ring-4 focus:ring-purple-100 outline-none transition-all shadow-inner" />
                    </div>

                    <div class="flex gap-3 pt-2">
                        <button @click="tutupModalPinjam" class="flex-1 py-3.5 bg-white/40 border border-white/80 hover:bg-slate-100/60 text-slate-500 font-black text-xs rounded-2xl transition-all uppercase tracking-widest">
                            Batal
                        </button>
                        <button @click="prosesPinjamBuku" class="flex-1 py-3.5 bg-gradient-to-r from-purple-400 to-pink-400 hover:opacity-90 text-white font-black text-xs rounded-2xl shadow-md shadow-pink-200 transition-all uppercase tracking-widest">
                            Konfirmasi
                        </button>
                    </div>
                </div>
            </div>

        </div>
    `,
    data() {
        return {
            listBuku: [],
            listPeminjaman: [],
            listKategori: [], 
            showModal: false,
            isEditMode: false,
            
            showModalPinjam: false,
            dataBukuDipilih: {},
            formPinjam: {
                nama_peminjam: ''
            },

            formData: {
                id: null,
                judul: '',
                penulis: '',
                kategori_id: '', 
                stok: ''
            }
        };
    },
    computed: {
        totalStok() {
            return this.listBuku.reduce((acc, buku) => acc + parseInt(buku.stok || 0), 0);
        },
        stokKosong() {
            return this.listBuku.filter(buku => parseInt(buku.stok || 0) === 0).length;
        }
    },
    methods: {
        async fetchAllData() {
            try {
                const resBuku = await axios.get('http://localhost:8080/api/buku');
                this.listBuku = resBuku.data;

                const resPinjam = await axios.get('http://localhost:8080/api/peminjaman');
                this.listPeminjaman = resPinjam.data;
            } catch (err) {
                console.error("Gagal sirkulasi data API:", err);
            }
        },
        async fetchKategori() {
            try {
                const response = await axios.get('http://localhost:8080/api/kategori');
                this.listKategori = response.data;
            } catch (err) {
                console.error("Gagal memuat data kategori:", err);
            }
        },
        bukaModalTambah() {
            this.isEditMode = false;
            this.formData = { id: null, judul: '', penulis: '', kategori_id: '', stok: '' };
            this.showModal = true;
        },
        editBuku(buku) {
            this.isEditMode = true;
            this.formData = { 
                id: buku.id,
                judul: buku.judul,
                penulis: buku.penulis,
                kategori_id: buku.kategori_id || buku.id_kategori || '', 
                stok: buku.stok
            };
            this.showModal = true;
        },
        tutupModal() {
            this.showModal = false;
        },

        bukaModalPinjam(buku) {
            this.dataBukuDipilih = buku;
            this.formPinjam.nama_peminjam = '';
            this.showModalPinjam = true;
        },
        tutupModalPinjam() {
            this.showModalPinjam = false;
            this.dataBukuDipilih = {};
        },
        prosesPinjamBuku() {
            if (!this.formPinjam.nama_peminjam.trim()) {
                alert("Nama peminjam wajib diisi!");
                return;
            }

            const token = localStorage.getItem('token');
            const configHeaders = {
                headers: { 'Authorization': `Bearer ${token}` }
            };

            const payloadPinjam = {
                buku_id: this.dataBukuDipilih.id,
                nama_peminjam: this.formPinjam.nama_peminjam
            };

            axios.post('http://localhost:8080/api/peminjaman', payloadPinjam, configHeaders)
            .then(() => {
                alert(`Berhasil meminjamkan buku "${this.dataBukuDipilih.judul}"!`);
                this.tutupModalPinjam();
                this.fetchAllData();
            })
            .catch((error) => {
                console.error("Error sirkulasi pinjam:", error);
                alert("Gagal memproses peminjaman buku.");
            });
        },

        simpanData() {
            const { id, judul, penulis, kategori_id, stok } = this.formData;
            if (!judul || !penulis || !kategori_id || !stok) {
                alert("Harap semua kolom form diisi (termasuk kategori)!");
                return;
            }

            const token = localStorage.getItem('token');

            if (this.isEditMode) {
                const payloadDataWithSpoofing = new URLSearchParams();
                payloadDataWithSpoofing.append('_method', 'PUT');
                payloadDataWithSpoofing.append('judul', judul);
                payloadDataWithSpoofing.append('penulis', penulis);
                payloadDataWithSpoofing.append('stok', parseInt(stok));
                payloadDataWithSpoofing.append('kategori_id', kategori_id); 

                const configHeaders = {
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };

                axios.post(`http://localhost:8080/api/buku/${id}`, payloadDataWithSpoofing, configHeaders)
                .then(() => {
                    alert("Buku Berhasil Diperbarui!");
                    this.tutupModal();
                    this.fetchAllData();
                })
                .catch((error) => {
                    console.error("Detail Error Perbarui Buku:", error.response);
                    alert("Gagal memperbarui data.");
                });
            } else {
                const payloadData = { 
                    judul, 
                    penulis, 
                    stok: parseInt(stok),
                    kategori_id: parseInt(kategori_id) 
                };

                const configHeaders = {
                    headers: { 'Authorization': `Bearer ${token}` }
                };

                axios.post('http://localhost:8080/api/buku', payloadData, configHeaders)
                .then(() => {
                    alert("Buku Berhasil Ditambahkan!");
                    this.tutupModal();
                    this.fetchAllData();
                })
                .catch((error) => {
                    console.error(error);
                    alert("Gagal menambah data buku. Pastikan token valid.");
                });
            }
        },
        hapusBuku(id) {
            if (!confirm("Apakah Anda yakin ingin menghapus buku ini dari katalog?")) return;
            const token = localStorage.getItem('token');
            axios.delete(`http://localhost:8080/api/buku/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then(() => { alert("Buku Berhasil Dihapus!"); this.fetchAllData(); })
            .catch(() => alert("Gagal menghapus data."));
        },
        kembalikanBuku(id) {
            if (!confirm("Konfirmasi pengembalian buku?")) return;
            const token = localStorage.getItem('token');
            axios.delete(`http://localhost:8080/api/peminjaman/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then(() => { alert("Buku Berhasil Dikembalikan!"); this.fetchAllData(); })
            .catch(() => alert("Gagal memproses respon balik."));
        }
    },
    mounted() {
        this.fetchAllData();
        this.fetchKategori(); 
    }
};

export default Dashboard;