<?php
if (isset($_GET['page'])) {
    $page = $_GET['page'];

    switch ($page) {
        case 'home':
            include "./src/home.php";
            // $home = "src/home.php";
            break;
            // case 'tentang':
            //     include "src/tentang.php";
            //     break;
            // case 'tutorial':
            //     include "src/tutorial.php";
            //     break;
            // default:
            //     echo "<center><h3>Maaf. Halaman tidak di temukan !</h3></center>";
            //     break;
    }
    // console . log('pages', $pages);
} else {
    include "src/home.php";
    // console . log($page);
}

?>
<!doctype html>
<html class="no-js" lang="zxx">

<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Miami</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- <link rel="manifest" href="site.webmanifest"> -->
    <link rel="shortcut icon" type="image/x-icon" href="img/favicon.png">
    <!-- Place favicon.ico in the root directory -->


    <!-- CSS here -->
    <!-- require css Header -->

    <?php require_once 'template/cssHeader.php'; ?>
    <!-- End Header css-->
</head>

<body>
    <!-- Header -->
    <?php require_once 'template/Header.php'; ?>
    <!-- End Header -->

    <!--CONTENT  -->
    <!--  -->
    <!--  -->
    <!-- END CONTENT-->
    <!-- footer -->
    <?php require_once 'template/Footer.php'; ?>

    <!-- link that opens popup -->

    <!-- form itself end-->
    <form id="test-form" class="white-popup-block mfp-hide">
        <div class="popup_box ">
            <div class="popup_inner">
                <h3>Check Availability</h3>
                <form action="#">
                    <div class="row">
                        <div class="col-xl-6">
                            <input id="datepicker" placeholder="Check in date">
                        </div>
                        <div class="col-xl-6">
                            <input id="datepicker2" placeholder="Check out date">
                        </div>
                        <div class="col-xl-6">
                            <select class="form-select wide" id="default-select" class="">
                                <option data-display="Adult">1</option>
                                <option value="1">2</option>
                                <option value="2">3</option>
                                <option value="3">4</option>
                            </select>
                        </div>
                        <div class="col-xl-6">
                            <select class="form-select wide" id="default-select" class="">
                                <option data-display="Children">1</option>
                                <option value="1">2</option>
                                <option value="2">3</option>
                                <option value="3">4</option>
                            </select>
                        </div>
                        <div class="col-xl-12">
                            <select class="form-select wide" id="default-select" class="">
                                <option data-display="Room type">Room type</option>
                                <option value="1">Laxaries Rooms</option>
                                <option value="2">Deluxe Room</option>
                                <option value="3">Signature Room</option>
                                <option value="4">Couple Room</option>
                            </select>
                        </div>
                        <div class="col-xl-12">
                            <button type="submit" class="boxed-btn3">Check Availability</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </form>
    <!-- form itself end -->

    <!-- JS here -->
    <?php require_once 'template/cssFooter.php'; ?>

    <!-- JS -->

</body>

</html>