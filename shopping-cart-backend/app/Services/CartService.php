<?php

namespace App\Services;

use App\Models\Cart;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

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

    public function destroyACartWithItems($cartId)
    {
        $errorMessage = '';

        try {
            DB::beginTransaction();
            
            $cart = Cart::find($cartId);

            if (! $cart) {
                throw new \Exception("Invalid cart!");
            }

            Log::debug($cart);

            foreach($cart->cartItems as $item) {
                $affectedRows = (new CartItemService())->destroy($item->cart_id, $item->product_id);

                if ($affectedRows <= 0) {
                    throw new \Exception("Cart item can not be removed [cart_id=" . $item->cart_id . ", 
                    and product_id=" . $item->product_id . "]");
                }
            }

            $deleteResult = $cart->delete();

            if ($deleteResult <= 0) {
                throw new \Exception("Cart can not be removed [cart_id=" . $cart->cart_id . "]");
            }

            DB::commit();
        } catch (\Throwable $th) {
            $errorMessage = $th->getMessage();
            DB::rollBack();
        }

        return $errorMessage;
    }

    public function destroyAllCartsOfAUser($userId)
    {
        return Cart::where("user_id", $userId)->delete();
    }
}