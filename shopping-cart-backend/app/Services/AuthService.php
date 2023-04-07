<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;

class AuthService
{
    public function fetchAuthenticatedUser()
    {
        return Auth::user();
    }

    public function fetchAuthToken(array $credentials)
    {
        $token = Auth::attempt($credentials);

        return $token;
    }

    public function refreshToken()
    {
        return Auth::refresh();
    }

    public function fetchTokenExpirationTime()
    {
        return Config::get('jwt.ttl');
    }

    public function logout()
    {
        Auth::logout();
    }
}