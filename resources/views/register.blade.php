<!DOCTYPE html>
<html lang="">

    @include('components.head')

    <body>
        <div class="container">
            <div class="login-screen row align-items-center">
                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3"></div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                    <form method="post" action="register" aria-label="Login">
                        {{ csrf_field() }}
                        <div class="login-container">
                            
                            @if(!empty($errors->all()))
                                <div class="alert alert-danger text-white bg-danger">
                                    <ul>
                                        @foreach($errors->all() as $error)
                                            <li>{{ $error }}</li>
                                        @endforeach
                                    </ul>
                                </div>
                            @endif

                            <div class="row no-gutters">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                    <div class="login-box">
                                        <div class="input-group">

                                            <span class="input-group-addon btn-lg"><i class="icon-account_circle"></i></span>
                                            <input placeholder="User Name" id="user_name" type="text" class="form-control" name="user_name" required autofocus>

                                        </div>

                                        <br>

                                        <div class="input-group">

                                            <span class="input-group-addon btn-lg"><i class="icon-account_circle"></i></span>
                                            <input placeholder="Name" id="name" type="text" class="form-control" name="name" required>

                                        </div>

                                        <br>

                                        <div class="input-group">

                                            <span class="input-group-addon btn-lg"><i class="icon-account_circle"></i></span>
                                            <input placeholder="Email" id="email" type="email" class="form-control" name="email" required>

                                        </div>

                                        <br>

                                        <div class="input-group">

                                            <span class="input-group-addon btn-lg"><i class="icon-verified_user"></i></span>
                                            <input placeholder="Password" id="password" type="password" class="form-control" name="password" required>

                                        </div>

                                        <div class="actions clearfix">
                                            <button type="submit" class="btn btn-primary">Register</button>
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
