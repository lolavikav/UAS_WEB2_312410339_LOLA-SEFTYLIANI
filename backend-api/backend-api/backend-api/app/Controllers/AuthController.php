<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;

class AuthController extends BaseController
{
    use ResponseTrait;

    /**
     * Endpoint: POST /api/auth/login
     * Mengurus otentikasi admin & generate bearer token
     */
    public function login()
    {
        // 1. Mengambil data JSON input dari Frontend VueJS / Axios
        $json = $this->request->getJSON();
        
        if (!$json || empty($json->username) || empty($json->password)) {
            return $this->respond([
                'status'  => 400,
                'message' => 'Username dan password wajib diisi!'
            ], 400);
        }

        $username = trim($json->username);
        $password = $json->password;

        // 2. Mencari user di database berdasarkan username
        $db   = \Config\Database::connect();
        $user = $db->table('users')->getWhere(['username' => $username])->getRow();

        // 3. Validasi Keberadaan User dan Kecocokan Password (Hash Bcrypt atau Fail-safe)
        if (!$user) {
            return $this->respond([
                'status'  => 401,
                'message' => 'Username tidak ditemukan!'
            ], 401);
        }

        // Mengecek apakah password sesuai hash (kata 'admin') atau input teks manual 'admin123'
        $isPasswordValid = password_verify($password, $user->password) || ($password === 'admin123') || ($password === 'admin');

        if (!$isPasswordValid) {
            return $this->respond([
                'status'  => 401,
                'message' => 'Password Salah!'
            ], 401);
        }

        // 4. Menggunakan Token Statis agar sinkron dengan AuthFilter di sisi Buku/Komik
        $token = 'KODETOKENSUPERAMANADMIN';

        // 5. Simpan Token tersebut ke database pada baris user yang bersangkutan
        $db->table('users')->where('id', $user->id)->update(['token' => $token]);

        // 6. Kembalikan response sukses berbentuk JSON ke Frontend VueJS
        return $this->respond([
            'status'  => 200,
            'message' => 'Login Berhasil!',
            'token'   => $token,
            'user'    => [
                'username' => $user->username
            ]
        ], 200);
    }

    /**
     * Endpoint: POST /api/auth/logout
     * Menghapus sesi token aktif di server (Wajib melampirkan token di header)
     */
    public function logout()
    {
        // Ambil header Authorization dari request klien
        $authHeader = $this->request->getServer('HTTP_AUTHORIZATION');
        
        if ($authHeader && preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            $token = $matches[1];
            
            // Hapus token di database (set NULL) agar token lama mati total
            $db = \Config\Database::connect();
            $db->table('users')->where('token', $token)->update(['token' => null]);
        }

        return $this->respond([
            'status'  => 200,
            'message' => 'Sesi Token berhasil dihapus dari server!'
        ], 200);
    }
}