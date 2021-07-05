<footer class="footer">
    <div class="footer_top">
        <div class="container">
            <div class="row">
                <div class="col-xl-3 col-md-6 col-lg-3">
                    <div class="footer_widget">
                        <h3 class="footer_title">
                            address
                        </h3>
                        <p class="footer_text"> 200, Green road, Mongla, <br>
                            New Yor City USA</p>
                        <a href="#" class="line-button">Get Direction</a>
                    </div>
                </div>
                <div class="col-xl-3 col-md-6 col-lg-3">
                    <div class="footer_widget">
                        <h3 class="footer_title">
                            Reservation
                        </h3>
                        <p class="footer_text">+10 367 267 2678 <br>
                            reservation@montana.com</p>
                    </div>
                </div>
                <div class="col-xl-2 col-md-6 col-lg-2">
                    <div class="footer_widget">
                        <h3 class="footer_title">
                            Navigation
                        </h3>
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Rooms Tes Edit</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">News</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-xl-4 col-md-6 col-lg-4">
                    <div class="footer_widget">
                        <h3 class="footer_title">
                            Newsletter
                        </h3>
                        <form action="#" class="newsletter_form">
                            <input type="text" placeholder="Enter your mail">
                            <button type="submit">Sign Up</button>
                        </form>
                        <p class="newsletter_text">Subscribe newsletter to get updates</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="copy-right_text">
        <div class="container">
            <div class="footer_border"></div>
            <div class="row">
                <div class="col-xl-8 col-md-7 col-lg-9">
                    <p class="copy_right">
                        <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
                        Copyright &copy;<script>
                            document.write(new Date().getFullYear());
                        </script> All rights reserved | This template is made with <i class="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>. Downloaded from <a href="https://themeslab.org/" target="_blank">Themeslab</a>
                        <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
                </div>
                <div class="col-xl-4 col-md-5 col-lg-3">
                    <div class="socail_links">
                        <ul>
                            <li>
                                <a href="#">
                                    <i class="fa fa-facebook-square"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="fa fa-twitter"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="fa fa-instagram"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>


<script type="text/javascript">
    $(document).ready(function() {

        ShowDataPackage();
        // var x = localStorage.getItem("token");

        // console.log('hadeuh', x);
        $("#formLogin").submit(function(e) {
            e.preventDefault();
            Login();
            return false;
        });



    });

    function Register() {
        var data = $('#formRegister').serialize();
        var first_name = document.getElementById("first_name").value;
        var last_name = document.getElementById("last_name").value;
        var company = document.getElementById("company").value;
        var company_abn = document.getElementById("company_abn").value;
        var mobile_number = document.getElementById("mobile_number").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var sender = document.getElementById("sender").value;

        $.ajax({
            type: 'POST',
            url: "/process/processLogin.php?f=AddUserUI&packageType=1",
            data: data,
            dataType: 'json',

            beforeSend: function() {
                Swal.fire({
                    html: '<h5>Loading...</h5>',
                    showConfirmButton: false,
                    onRender: function() {
                        // there will only ever be one sweet alert open.
                        $('.swal2-content').prepend(sweet_loader);
                    }
                });
            },

            success: function(response) {
                // console.log(response)
                if (response.success == true) {
                    Swal.fire({
                        icon: "success",
                        title: "Registration success!",
                        text: 'Please check your email, you are almost there. We have sent an email to ' +
                            email,
                        confirmButtonText: "Ok"
                    }).then(() => {
                        document.getElementById("formTrial").reset();
                        // window.location = "http://13.211.215.52/website-landing/";
                        window.location = "http://smsbroadcast.onecontact.com.au/";
                    });
                } else if (response.emailDupplicate !== null) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Email has been duplicated!',
                    })
                } else if (response.PhoneDupplicate !== null) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Mobile Number has been duplicated!',
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something Wrong please check your data!',
                    })
                }
            },
            error: function(response) {
                console.log(response.responseText);
            }
        });
    }


    function Login() {

        // var data = $('#formLogin').serialize();
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        let payload = {
            username: username,
            password: password
        };

        $.ajax({
            type: 'POST',
            url: "http://101.50.0.53:8000/api/v1/login",
            contentType: 'application/json',
            data: JSON.stringify(payload),
            dataType: 'json',
            success: function(response) {

                Swal.fire({
                    icon: 'success',
                    title: 'Success Login Happy Staycation !',
                }).then(() => {
                    console.log(response.data.token);

                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('username', response.data.user.username);
                    localStorage.setItem('name', response.data.user.name);
                    localStorage.setItem('no_hp', response.data.user.no_hp);

                    window.location = "index.php?=home";
                });
                // console.log(data);
                // console.log(response)
            },
            error: function(response) {
                console.log(response);
            }
        });
    }


    const maxLength = (text, limit = 50) => {
        let result = text.length > limit ? `${text.substring(0, limit)} ....` : text;
        return result;
    };

    function ShowDataPackage() {

        $.ajax({
            type: 'GET',
            url: "http://101.50.0.53:8000/api/v1/public/products?page=1&name=&place=",
            contentType: 'application/json',
            dataType: 'json',
            success: function(response) {
                console.log(response);
                console.log(response.data.total);
                console.log('id dr response datapackage', );

                for (i = 0; i < response.data.total; i++) {


                    var readmore = maxLength(response.data.data[i].description, 50);
                    console.log('hasil potong string', readmore);

                    var html;
                    $html =
                        `<div class="col-xl-4 col-md-4">
                        <div class="single_offers">
                        <div class="about_thumb">
                        <img src="${response.data.data[i].url_photo}" width="400px" height="400px" alt="">
                        </div>
                        <h3>${response.data.data[i].name_product}</h3>
                        <h3><b>${readmore}</b></h3>
                        <br/>
                        <a href="#test-form" class="book_now">book now</a>
                        <br/>
                        </div>
                        <br/>
                    </div>
                    <br>
                    `;

                    $("#showDataPackage").append($html);
                }



                // localStorage.setItem('token', response.data.token);
                // localStorage.setItem('username', response.data.user.username);
                // localStorage.setItem('name', response.data.user.name);
                // localStorage.setItem('no_hp', response.data.user.no_hp);

                // window.location = "index.php?=home";

                // console.log(data);
                // console.log(response)
            },
            error: function(response) {
                console.log(response);
            }
        });
    }
</script>