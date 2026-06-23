

#UAS PEMOGRAMAN WEB2_ SISTEM INFORMASI RENTAL BUKU/NOVEL DIGITAL (E-LIBRARY)

## NAMA: LOLA SEFTYLIANI
## KELAS: I241D
## NIM: 312410339

## Desripsi
Aplikasi ini dirancang dengan menerapkan arsitektur terpisah (Decoupled Architecture), sehingga bagian backend dan frontend dikembangkan serta dikelola secara independen. Sistem yang dibuat mengusung konsep Rental Buku atau Komik Digital (E-Library), yang berfungsi untuk mengelola berbagai data seperti koleksi buku, kategori atau genre, informasi penulis dan penerbit, proses peminjaman, serta data anggota yang terdaftar dalam sistem.

## Codingan nya 
1. Buku.Js
```
import BukuComponent from './Buku.js';

export default {
    components: {
        'buku-manager': BukuComponent
    },
    template: `
        <div class="min-h-screen bg-pink-100 p-4 md:p-8 space-y-8 font-sans">
            
            <div class="bg-white p-8 rounded-[3rem] border-4 border-pink-200 shadow-xl flex justify-between items-center">
                <div>
                    <h1 class="text-4xl font-black text-pink-600 tracking-tighter uppercase">Katalog E-Library Marsya's Digital</h1>
                    <p class="text-pink-400 font-bold text-sm tracking-widest mt-1">Selamat datang! Cari, lihat ketersediaan stok, dan lakukkan simulasi peminjaman komik & buku favoritmu secara langsung.</p>
                </div>
                <div class="hidden md:block">
                    <span class="px-6 py-3 bg-pink-100 text-pink-600 rounded-full text-xs font-black uppercase tracking-widest border-2 border-pink-200">
                        STATUS: ONLINE
                    </span>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="bg-pink-500 p-8 rounded-[3rem] border-4 border-pink-400 shadow-xl flex items-center gap-5 text-white">
                    <div class="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center text-3xl">📚</div>
                    <div>
                        <span class="block text-[10px] font-black text-pink-200 uppercase tracking-widest">Total Judul</span>
                        <span class="text-2xl font-black">{{ totalJudul }} Koleksi</span>
                    </div>
                </div>
                <div class="bg-pink-500 p-8 rounded-[3rem] border-4 border-pink-400 shadow-xl flex items-center gap-5 text-white">
                    <div class="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center text-3xl">📦</div>
                    <div>
                        <span class="block text-[10px] font-black text-pink-200 uppercase tracking-widest">Total Stok</span>
                        <span class="text-2xl font-black">{{ totalStok }} Pcs</span>
                    </div>
                </div>
                <div class="bg-pink-500 p-8 rounded-[3rem] border-4 border-pink-400 shadow-xl flex items-center gap-5 text-white sm:col-span-2 lg:col-span-1">
                    <div class="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center text-3xl">⚠️</div>
                    <div>
                        <span class="block text-[10px] font-black text-pink-200 uppercase tracking-widest">Kosong</span>
                        <span class="text-2xl font-black">{{ totalKosong }} Judul</span>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-[3rem] border-4 border-pink-200 shadow-2xl p-6 overflow-hidden">
                <div class="flex justify-between items-center mb-6 px-2">
                    <h3 class="text-xl font-black text-pink-600 uppercase tracking-widest">Riwayat Peminjaman</h3>
                    <button @click="bukaModalTambah" class="px-5 py-2.5 bg-pink-500 hover:bg-pink-600 text-white rounded-2xl font-bold text-sm shadow-md transition-all active:scale-95">
                        ➕ Tambah Buku
                    </button>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left">
                        <thead class="bg-pink-100 text-pink-600 text-[10px] font-black uppercase tracking-widest">
                            <tr>
                                <th class="p-5 rounded-tl-2xl">Peminjam</th>
                                <th class="p-5">Judul Komik & Buku</th>
                                <th class="p-5">Tanggal</th>
                                <th class="p-5 rounded-tr-2xl text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y-2 divide-pink-50">
                            <tr v-for="log in listPeminjam" :key="log.id" class="hover:bg-pink-50">
                                <td class="p-5 font-black text-pink-900">{{ log.nama_peminjam }}</td>
                                <td class="p-5 font-bold text-pink-500">{{ log.judul }}</td>
                                <td class="p-5 font-bold text-pink-400">{{ log.tanggal_pinjam }}</td>
                                <td class="p-5 text-center">
                                    <span class="px-4 py-2 bg-pink-500 text-white rounded-full text-[10px] font-black uppercase">{{ log.status }}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <buku-manager ref="bukuRef" @data-loaded="updateStatistik" @edit-buku="bukaModalEdit"></buku-manager>

            <div v-if="isModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div class="bg-white rounded-[2.5rem] border-4 border-pink-200 shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in duration-300">
                    <h3 class="text-xl font-black text-pink-600 uppercase tracking-widest mb-1 text-center">
                        {{ isEditMode ? '📝 Edit Data Buku' : '✨ Tambah Buku Baru' }}
                    </h3>
                    <p class="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Isi Detail Kelengkapan Katalog.</p>
                    
                    <form @submit.prevent="simpanBuku" class="space-y-4">
                        <div>
                            <label class="block text-xs font-black text-pink-500 uppercase tracking-wider mb-1">Judul Buku</label>
                            <input v-model="formBuku.judul" type="text" placeholder="Contoh: The Midnight Library" class="w-full px-4 py-3 bg-pink-50 border-2 border-pink-100 rounded-xl font-bold text-sm outline-none focus:border-pink-400 transition-all" required />
                        </div>

                        <div>
                            <label class="block text-xs font-black text-pink-500 uppercase tracking-wider mb-1">Penulis</label>
                            <input v-model="formBuku.penulis" type="text" placeholder="Contoh: Matt Haig" class="w-full px-4 py-3 bg-pink-50 border-2 border-pink-100 rounded-xl font-bold text-sm outline-none focus:border-pink-400 transition-all" required />
                        </div>

                        <div>
                            <label class="block text-xs font-black text-pink-500 uppercase tracking-wider mb-1">Kategori Buku</label>
                            <select v-model="formBuku.id_kategori" class="w-full px-4 py-3 bg-pink-50 border-2 border-pink-100 rounded-xl font-bold text-sm outline-none focus:border-pink-400 text-slate-700 transition-all" required>
                                <option value="" disabled>-- Pilih Kategori --</option>
                                <option v-for="kat in listKategori" :key="kat.id_kategori" :value="kat.id_kategori">
                                    {{ kat.nama_kategori }}
                                </option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-xs font-black text-pink-500 uppercase tracking-wider mb-1">Jumlah Stok</label>
                            <input v-model="formBuku.stok" type="number" placeholder="Contoh: 10" class="w-full px-4 py-3 bg-pink-50 border-2 border-pink-100 rounded-xl font-bold text-sm outline-none focus:border-pink-400 transition-all" required />
                        </div>

                        <div class="flex gap-3 pt-4">
                            <button type="button" @click="isModalOpen = false" class="w-1/2 py-3 bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold rounded-xl transition-all uppercase text-xs tracking-wider">
                                Batal
                            </button>
                            <button type="submit" class="w-1/2 py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-xl shadow-md transition-all uppercase text-xs tracking-wider">
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    `,
    data() {
        return {
            totalJudul: 0,
            totalStok: 0,
            totalKosong: 0,
            listPeminjam: [],
            listKategori: [], 
            isModalOpen: false,
            isEditMode: false,
            formBuku: {
                id: null,
                judul: '',
                penulis: '',
                id_kategori: '', 
                stok: 0
            }
        }
    },
    methods: {
        updateStatistik() {
            const listData = this.$refs.bukuRef?.listBuku || [];
            if (listData.length > 0) {
                this.totalJudul = listData.length;
                this.totalStok = listData.reduce((acc, curr) => acc + (parseInt(curr.stok) || 0), 0);
                this.totalKosong = listData.filter(buku => (parseInt(buku.stok) || 0) <= 0).length;
            }
        },
        async fetchLogPeminjaman() {
            try {
                const response = await axios.get('http://localhost:8080/api/peminjaman');
                this.listPeminjam = response.data;
            } catch (error) { console.error("Gagal memuat log:", error); }
        },
        async fetchKategori() {
            try {
                const response = await axios.get('http://localhost:8080/api/kategori');
                this.listKategori = response.data;
            } catch (error) { console.error("Gagal memuat kategori:", error); }
        },
        bukaModalTambah() {
            this.isEditMode = false;
            this.formBuku = { id: null, judul: '', penulis: '', id_kategori: '', stok: 0 };
            this.isModalOpen = true;
        },
        bukaModalEdit(buku) {
            this.isEditMode = true;
            // Memastikan id_kategori ikut terbawa saat data dilempar dari komponen anak
            this.formBuku = { 
                id: buku.id, 
                judul: buku.judul, 
                penulis: buku.penulis, 
                id_kategori: buku.id_kategori || '', 
                stok: buku.stok 
            };
            this.isModalOpen = true;
        },
        async simpanBuku() {
            const token = localStorage.getItem('token');
            const headers = { 'Authorization': `Bearer ${token}` };

            try {
                if (this.isEditMode) {
                    await axios.put(`http://localhost:8080/api/buku/${this.formBuku.id}`, this.formBuku, { headers });
                    alert("Data buku berhasil diperbarui!");
                } else {
                    await axios.post('http://localhost:8080/api/buku', this.formBuku, { headers });
                    alert("Buku baru berhasil ditambahkan!");
                }
                this.isModalOpen = false;
                
                // Panggil ulang data di tabel anak agar langsung sinkron tanpa reload manual
                if (this.$refs.bukuRef?.fetchBuku) {
                    this.$refs.bukuRef.fetchBuku(); 
                } else {
                    window.location.reload(); 
                }
            } catch (error) { 
                alert("Gagal menyimpan data buku. Pastikan form terisi dengan benar."); 
            }
        }
    },
    mounted() {
        this.fetchLogPeminjaman();
        this.fetchKategori(); 
        setTimeout(this.updateStatistik, 800);
    }
}
```

## Berikut SS nya

1. Database
<img width="953" height="395" alt="image" src="https://github.com/user-attachments/assets/01687851-fab9-47e2-b2e8-e5c83e380b42" />

2.Uji keamanan API (Backend)
<img width="1195" height="878" alt="image" src="https://github.com/user-attachments/assets/244b9760-be15-4b3f-94f2-8f9cc2567249" />


3. Halamn Katalog User
   <img width="866" height="472" alt="image" src="https://github.com/user-attachments/assets/5273488d-6ea2-485c-984e-89f5d39dcbd7" />

4. Halaman Login
   <img width="779" height="422" alt="image" src="https://github.com/user-attachments/assets/109c2a32-6f98-4a9e-9837-678df540eaf5" />

5. Halaman Dashboard Admin
<img width="835" height="470" alt="image" src="https://github.com/user-attachments/assets/841522db-f683-4658-a99e-bb8178d48f02" />

6. Halaman Tambah Buku
<img width="768" height="457" alt="image" src="https://github.com/user-attachments/assets/bf763f37-93ce-4ae0-8e56-6fff8f821faa" />

7. Halaman Edit Buku
<img width="734" height="442" alt="image" src="https://github.com/user-attachments/assets/dc31e9b3-d8d3-4c21-8001-e0981d9c428d" />


8. Hapus Buku
<img width="856" height="475" alt="image" src="https://github.com/user-attachments/assets/efb4bdd9-d8e8-4fc4-9fe6-21b89c0a696e" />

9. Halaman minjam buku
<img width="836" height="482" alt="image" src="https://github.com/user-attachments/assets/ac5e37ce-4872-4446-8b13-86ad5eeecbd9" />


10. Halaman Kategori
    <img width="763" height="392" alt="image" src="https://github.com/user-attachments/assets/50495887-1af7-4d5b-bfb1-0147d2799aa8" />

11. Halaman Katalog Admin
   <img width="864" height="424" alt="image" src="https://github.com/user-attachments/assets/48d8b0b3-fda5-4107-a6b0-c854bea29865" />






