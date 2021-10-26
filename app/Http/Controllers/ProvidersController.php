<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use App\User;

class ProvidersController extends BaseController
{
	public function index() {

        if(request()->cookie('login')){

            $users = User::get();

            return view('home', compact('users'));
        }
    }
}