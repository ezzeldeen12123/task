<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class SessionsController extends BaseController
{
	public function index()
    {
        return view('login');
    }

    public function login() {

        $user = User::where('email', request('email'))->where('password', request('password'))->first();

        if($user) {

        	return redirect()->route('home')->withCookie(cookie('login', $user->status, 800))->withCookie(cookie('name', $user->name, 800));
        }
        else {

        	return view('login');
        }
    }

    public function logout()
    {
        return redirect()->route('login')->withCookie(\Cookie::forget('login'))->withCookie(\Cookie::forget('name'));
    }
}