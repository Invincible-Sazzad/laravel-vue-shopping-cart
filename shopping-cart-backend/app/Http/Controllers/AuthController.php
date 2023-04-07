<?php

namespace App\Http\Controllers;

use App\Services\AuthService;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    private UserService $userService;
    private AuthService $authService;

    public function __construct()
    {
        $this->userService = new UserService();
        $this->authService = new AuthService();
    }


    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $credentials = $request->only('email', 'password');

        $token = $this->authService->fetchAuthToken($credentials);

        if (!$token) {
            return response()->json([
                'error' => true,
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = $this->authService->fetchAuthenticatedUser();

        return response()->json([
            'error' => false,
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
                'expires_in' => $this->authService->fetchTokenExpirationTime()
            ]
        ]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = $this->userService->create($request->all());

        if (! $user) {
            return response()->json([
                'error' => true,
                'message' => 'User registration failed!'
            ]);
        }

        return response()->json([
            'error' => false,
            'message' => 'User created successfully'
        ]);
    }

    public function logout()
    {
        $this->authService->logout();

        return response()->json([
            'error' => false,
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'error' => false,
            'user' => $this->authService->fetchAuthenticatedUser(),
            'authorisation' => [
                'token' => $this->authService->refreshToken(),
                'type' => 'bearer',
                'expires_in' => $this->authService->fetchTokenExpirationTime(),
            ]
        ]);
    }
}
