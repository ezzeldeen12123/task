<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Session
Route::get('/', 'SessionsController@index')->name('login');
Route::post('login', 'SessionsController@login');
Route::get('logout', 'SessionsController@logout')->name('logout');

//Register
Route::get('register', 'RegisterController@index')->name('register');
Route::post('register', 'RegisterController@Register');

//home
Route::get('home', 'ProvidersController@index')->name('home');

//locations
Route::get('{user}/locations', 'LocationsController@index')->name('locations');
Route::get('{user}/locations/add', 'LocationsController@add')->name('add_location');
Route::post('locations/save', 'LocationsController@save')->name('save_location');
