<!DOCTYPE html>
<html lang="">

    @include('components.head')

    <body>
    <!-- BEGIN .main-content -->
    <div class="main-content">
        <div class="row gutters">
            <div class="col-lg-12 col-xs-12 col-md-12 col-sm-12">

                <div class="card">
                    <div class="card-header">
                        Welcome {{request()->cookie('name')}} 
                        <div class="btn-group float-right">
                            <a href="{{route('logout')}}">Logout</a>
                        </div>
                    </div>
                </div>
                
                <div class="card">

                    <div class="card-header">
                        Providers Information

                        @if(request()->cookie('login') == 'admin')
                        <div class="btn-group float-right">
                            <div class="btn-group">
                                <a target="_blank" class="btn btn-primary" href="{{route('register')}}">New Provider</a>
                            </div>
                        </div>
                        @endif

                    </div>

                    <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                        <div class="card-body">
                            <table id="data_table" class="table table-striped m-0" style="width:100%">
                                <thead>
                                    <tr>
                                        <th width="5%">#</th>
                                        <th width="40%">Name</th>
                                        <th width="40%">Email</th>
                                        <th width="15%">Locations</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach($users as $user)

                                    <tr>
                                        <td>{{$user->id}}</td>
                                        <td>{{$user->name}}</td>
                                        <td>{{$user->email}}</td>
                                        <td>
                                            <a title='locations' target='_blank' href="{{route('locations', ['user'=> $user->user_name])}}">Show</a>
                                        </td>
                                    </tr>

                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <!-- Row end -->
    </div>
    <!-- END: .main-content -->
</body>
