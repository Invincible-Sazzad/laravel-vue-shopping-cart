<?php

namespace App\Services;

use App\Models\CartItem;

class CartItemService
{
    public function findItemsOfACart($cartId)
    {
        return CartItem::select('cart_items.id', 'cart_items.cart_id', 'cart_items.quantity', 
                'cart_items.product_id', 'products.title', 'products.description', 'products.image_url', 
                'products.price')
                ->where('cart_id', $cartId)
                ->join('products', 'cart_items.product_id', '=', 'products.id')
                ->orderByDesc('cart_items.created_at')
                ->get();
    }

    public function findAnItem($cartId, $productId)
    {
        return CartItem::where([
            'cart_id' => $cartId,
            'product_id' => $productId
        ])->get();
    }

    public function create($cartId, $productId, $quantity)
    {
        $cartItem = CartItem::create([
            'cart_id' => $cartId,
            'product_id' => $productId,
            'quantity' => $quantity,
        ]);

        return $cartItem;
    }

    public function update($cartId, $productId, $quantity)
    {
        return CartItem::where([
            'cart_id' => $cartId,
            'product_id' => $productId
        ])->update(['quantity' => $quantity]);
    }

    public function destroy($cartId, $productId)
    {
        return CartItem::where([
            'cart_id' => $cartId,
            'product_id'=> $productId
        ])->delete();
    }
}