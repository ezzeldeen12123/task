<!DOCTYPE html>
<html lang="">

    @include('components.head')

    <body>
    <!-- BEGIN .main-content -->
    <div class="main-content">
            <div class="row">
            <div class="col-lg-12 col-xs-12 col-md-12 col-sm-12">

                <div class="card">
                    <div class="card-header">
                        Welcome {{request()->cookie('name')}}
                        
                        <div class="float-right">
                            <a href="{{route('home')}}">Home</a>
                            <a href="{{route('logout')}}">Logout</a>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">

                        Provider Locations Information

                        @if(request()->cookie('login') == 'admin' || request()->cookie('login') == 'provider')
                        <div class="btn-group float-right">
                            <div class="btn-group">
                                <a target="_blank" class="btn btn-primary" href="{{route('add_location', ['user'=> $user->id])}}">New Location</a>
                            </div>
                        </div>
                        @endif

                    </div>

                    <div class="card-body">
                        <table class="table table-striped m-0">
                            <tbody>

                                <tr>
                                    <th scope="row" width="300px">Name</th>
                                    <td>{{ $user->name }}</td>
                                </tr>

                                <tr>
                                    <th scope="row" width="300px">Email</th>
                                    <td>{{ $user->email }}</td>
                                </tr>
                                @php($count = 1)
                                @foreach($locations as $location)

                                    <tr>
                                        <th scope="row" width="300px">Location {{$count}}</th>
                                        <td>Latitude: {{ $location->latitude }} <br> Longitude: {{ $location->longitude }}</td>
                                    </tr>
                                    @php($count++)
                                @endforeach

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <!-- Row end -->
    </div>
    <!-- END: .main-content -->
</body>
