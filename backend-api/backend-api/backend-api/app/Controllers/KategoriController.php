<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;

class KategoriController extends BaseController
{
    use ResponseTrait;

    // Fungsi untuk mengambil semua data kategori buku
    public function index()
    {
        $db = \Config\Database::connect();
        $builder = $db->table('kategori');
        $data = $builder->get()->getResult();
        
        return $this->respond($data, 200);
    }

    // Fungsi untuk menyimpan kategori baru dari frontend
    public function create()
    {
        $json = $this->request->getJSON();
        
        if ($json && isset($json->nama_kategori)) {
            $db = \Config\Database::connect();
            $builder = $db->table('kategori');
            
            $builder->insert([
                'nama_kategori' => $json->nama_kategori
            ]);
            
            return $this->respondCreated(['status' => 'Kategori berhasil ditambahkan']);
        }
        
        return $this->fail('Data tidak valid', 400);
    }

    // Penanganan CORS Preflight untuk rute Kategori
    public function options()
    {
        return $this->response->setHeader('Access-Control-Allow-Origin', '*')
                              ->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
                              ->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
                              ->setStatusCode(200);
    }
}