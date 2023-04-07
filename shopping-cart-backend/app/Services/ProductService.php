<?php

namespace App\Services;

use App\Models\Product;

class ProductService
{
    public function all()
    {
        return Product::get();
    }

    public function findById($id)
    {
        return Product::find($id);
    }

    public function filter($keyword)
    {
        return Product::where('title', 'LIKE', '%'. $keyword .'%')
                        ->orWhere('description', 'LIKE', '%'. $keyword .'%')
                        ->orderByDesc('created_at')
                        ->get();
    }
}