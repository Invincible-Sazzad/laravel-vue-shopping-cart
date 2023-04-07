<?php

namespace App\Services;

use App\Models\Cart;

class CartService
{
    public function all($userId)
    {
        return Cart::where('user_id', $userId)->orderby('created_at', 'desc')->get();
    }

    public function fetchActive($userId)
    {
        return Cart::where([
            'user_id' => $userId,
            'is_active' => 1
        ])->limit(1)->get();
    }

    public function fetchActiveCartWithItems($userId)
    {
        return Cart::with('cartItems.product')->where([
            'user_id' => $userId,
            'is_active' => 1
        ])->limit(1)->get();
    }

    public function create($userId)
    {
        $cart = Cart::create([
            'user_id' => $userId,
            'is_active' => 1,
        ]);

        return $cart;
    }

    public function update($cartId)
    {
        return Cart::where("id", $cartId)->update(["is_active" => 0]);
    }

    public function destroyACartOfAUser($userId, $cartId)
    {
        return Cart::where([
            "user_id" => $userId,
            "cart_id" => $cartId
        ])->delete();
    }

    public function destroyAllCartsOfAUser($userId)
    {
        return Cart::where("user_id", $userId)->delete();
    }
}