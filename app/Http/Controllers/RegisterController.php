<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use App\User;

class RegisterController extends BaseController
{
	public function index() {

        return view('register');
    }

    public function Register() {

        $userExsist = User::where('user_name', request('user_name'))->orWhere('email', request('email'))->first();

        $usersCount = User::count();
        
        if(!$userExsist) {

            $user = new User();
            $user->user_name = request('user_name');
            $user->name = request('name');
            $user->email = request('email');
            $user->password = request('password');

            if($usersCount == 0) {

                $user->status = 'admin';
            }
            else if(request()->cookie('login') == 'admin') {

                $user->status = 'provider';
            }
            else {

                $user->status = 'customer';
            }

            $user->save();

            if(request()->cookie('login') == 'admin') {

                return redirect()->route('home');
            }
            else {

                return redirect()->route('login');
            }
        }
        else {
            return view('register')->with('error','User already exsists');;
        }
    }
}