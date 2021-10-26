<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use App\User;
use App\Location;
use Illuminate\Routing\Controller as BaseController;

class LocationsController extends BaseController
{
	public function index($userName) {

		if(request()->cookie('login')) {

			$user = User::where('user_name', $userName)->first();

	        $locations = Location::where('provider_id', $user->id)->get();

	        return view('locations', compact('user', 'locations'));
	    }
    }

    public function add(User $user) {

    	if(request()->cookie('login') == 'admin' || request()->cookie('login') == 'provider')
        	return view('add_location', compact('user'));
    }

    public function save() {

    	$numberOfLocations = Location::where('provider_id', request('provider_id'))->count();

    	if($numberOfLocations <= 5) {

	        $locations = new Location();
	        $locations->provider_id = request('provider_id');
	        $locations->latitude = request('latitude');
	        $locations->longitude = request('longitude');
	        $locations->save();
	    }

        $user = User::find(request('provider_id'));
        $locations = Location::where('provider_id', $user->id)->get();

        return view('locations', compact('user', 'locations'));
    }
}