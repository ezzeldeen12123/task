<!DOCTYPE html>
<html lang="">

    @include('components.head')

    <body>
        <div class="container">
            <div class="login-screen row align-items-center">
                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3"></div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                    <form method="post" action="login" aria-label="Login">
                        {{ csrf_field() }}
                        <div class="login-container">
                            <div class="row no-gutters">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                    <div class="login-box">

                                        <div class="form-group col-lg-12 row gutters">
                                            <label class="form-control-label col-lg-3">Email</label>
                                            <input placeholder="Email" id="email" type="email" class="form-control col-lg-9" name="email" required autofocus>
                                        </div>

                                        <br>

                                        <div class="form-group col-lg-12 row gutters">
                                            <label class="form-control-label col-lg-3">Password</label>
                                            <input placeholder="Password" id="password" type="password" class="form-control col-lg-9" name="password" required>
                                        </div>

                                        <div class="actions">
                                            <button type="submit" class="col-xl-12 col-lg-12 col-md-12 col-sm-12 btn btn-primary">Login</button>
                                        </div>

                                        <div class="actions clearfix">
                                            <a type="button" href="register" class="col-xl-12 col-lg-12 col-md-12 col-sm-12 btn btn-primary">Register</a>
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
