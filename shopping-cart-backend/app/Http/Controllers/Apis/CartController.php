<?php

namespace App\Http\Controllers\Apis;

use App\Http\Controllers\Controller;
use App\Services\CartItemService;
use App\Services\CartService;
use Illuminate\Http\Request;

class CartController extends Controller
{
    private CartService $cartSevice;
    private CartItemService $cartItemService;

    public function __construct()
    {
        $this->cartSevice = new CartService();
        $this->cartItemService = new CartItemService();
    }

    public function index($userId)
    {
        return response()->json([
            'cart' => $this->cartSevice->fetchActiveCartWithItems($userId)
        ]);
    }

    public function store(Request $request)
    {
        $hasError = true;

        $userId = $request->user_id;
        $productId = $request->product_id;
        $quantity = $request->quantity;

        $carts = $this->cartSevice->fetchActive($userId);

        if ($carts->count()) {
            $cart = $carts->first(); 

            $item = $this->cartItemService->create($cart->id, $productId, $quantity);

            if ($item) {
                $hasError = false;
            }

        } else {
            $cart = $this->cartSevice->create($userId);

            $item = $this->cartItemService->create($cart->id, $productId, $quantity);

            if ($item) {
                $hasError = false;
            }
        }

        if ($hasError) {
            return response()->json([
                'error' => true,
                'message' => 'Cart can not be saved!'
            ]);
        }

        return response()->json([
            'error' => false,
            'message' => 'Cart saved successfully!'
        ]);
    }

    public function updateQty(Request $request)
    {
        $cartId = $request->cart_id;
        $productId = $request->product_id;
        $quantity = $request->quantity;

        $affectedRows = $this->cartItemService->update($cartId, $productId, $quantity);

        if ($affectedRows) {
            return response()->json([
                'error' => false,
                'message' => 'Quantity updated successfully'
            ]);
        }
        
        return response()->json([
            'error' => true,
            'message' => 'Quantity update failed'
        ]);
    }

    public function checkout(Request $request)
    {
        $cartId = $request->cart_id;

        $affectedRows = $this->cartSevice->update($cartId);

        if ($affectedRows) {
            return response()->json([
                'error' => false,
                'message' => 'Checkout completed successfully'
            ]);
        }
        
        return response()->json([
            'error' => true,
            'message' => 'Checkout failed!'
        ]);
    }

    public function destroyACartItem(Request $request)
    {
        $cartId = $request->cart_id; 
        $productId = $request->product_id;

        $affectedRows = $this->cartItemService->destroy($cartId, $productId);

        if ($affectedRows) {
            return response()->json([
                "error" => false,
                "message" => "Successfully deleted!"
            ]);
        }

        return response()->json([
            "error" => true,
            "message" => "Deletion failed!"
        ]);
    }

    public function destroy(Request $request)
    {
        $cartId = $request->cart_id;
        
        $errorResult = $this->cartSevice->destroyACartWithItems($cartId);

        if (! empty($errorResult)) {
            return response()->json([
                'error' => true,
                'message' => $errorResult
            ]);
        }

        return response()->json([
            'error' => false,
            'message' => 'Cart is removed successfuly'
        ]);
    }
}
