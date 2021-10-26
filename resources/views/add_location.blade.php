<!DOCTYPE html>
<html lang="">

    @include('components.head')

    <body>
        <div class="container">
            <div class="login-screen row align-items-center">
                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3"></div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                    <form method="post" action="{{route('save_location')}}" aria-label="location">
                        {{ csrf_field() }}
                        <div class="login-container">
                            <div class="row no-gutters">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">

                                    <input id="provider_id" type="hidden" class="form-control" name="provider_id" value="{{$user->id}}">

                                    <div class="login-box">

                                        <div class="form-group col-lg-12 row gutters">
                                            <label class="form-control-label col-lg-5">Provider Name</label>
                                            <input id="user_name" type="text" class="form-control col-lg-7" name="user_name" value="{{$user->name}}" disabled>
                                        </div>

                                        <br>

                                        <div class="form-group col-lg-12 row gutters">
                                            <label class="form-control-label col-lg-5">Location Latitude</label>
                                            <input placeholder="Latitude" id="latitude" type="number" class="form-control col-lg-7" name="latitude" required autofocus>
                                        </div>

                                        <br>

                                        <div class="form-group col-lg-12 row gutters">
                                            <label class="form-control-label col-lg-5">Location Longitude</label>
                                            <input placeholder="Longitude" id="longitude" type="number" class="form-control col-lg-7" name="longitude" required>
                                        </div>

                                        <div class="actions">
                                            <button type="submit" class="btn btn-primary">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </body>
</html>
