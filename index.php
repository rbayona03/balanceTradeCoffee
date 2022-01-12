<?php
    $msg = '';
    $msgClass = '';

    if(filter_has_var(INPUT_POST, 'submit')){
        //get form data
        $email = htmlspecialchars($_POST['email']);

        //check required fields
        if(!empty($email)){
            if(filter_var($email, FILTER_VALIDATE_EMAIL) === false){
                //failed email validation
                $msg="<h3 class='danger'>Please Enter Valid Email.</h3>";
                $msgClass="danger";
            }else{
                $to = 'im-roberto@roberto-bayona.com';
                $subject = 'Newsletter Request From: ' . $email;
                $body = `<h2>Newsletter Request</h2>` . '<h4>' . 'Email' . '</h4>' . '<p>'. $email.'</p>'.
          

                $headers = "MIME-Version: 1.0" . "\r\n";
                $headers .="Content-Type:text/html;charset=UTF-8" . "\r\n";
                $headers .= "From:" . "<". $email . ">". "\r\n";

                if(mail($to, $subject, $body, $headers)){
                    $msg="<h3 class='success'>Email Submitted!</h3>";
                    $msgClass="success";
                }else{
                    $msg="<h3 class='danger'>An error occurred.</h3>";
                    $msgClass="danger";
                }
            };

        }else{
            $msg="<h3 class='danger'>Please fill out all fields</h3>";
            $msgClass="danger";
        };
    };
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Balance Trade Coffee</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="styles/style.css">
    <link rel="stylesheet" href="styles/mobile.css">
</head>
<body>
    <nav class="navContainer-Mobile">
        <div id="navBtn">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <ul class="navWrapper-Mobile">
        <li class="navLink-Mobile"><a href="index.php"><img class="logo" src="./images/BeanLogo1.png" alt="Balance Trade Logo"></a></li>
            <li class="navLink-Mobile"><a href="index.php">Home</a></li>
            <li class="navLink-Mobile"><a href="shop.html">Shop</a></li>
            <li class="navLink-Mobile"><a href="info.html">Learn More</a></li>
        </ul>
    </nav>
    <nav class="navContainer-Desktop">
        <ul class="navWrapper-Desktop">
        <li class="navLink-Desktop"><a href="index.php"><img class="logo" src="./images/BeanLogo1.png" alt="Balance Trade Logo"></a></li>
            <li class="navLink-Desktop"><a href="index.php">Home</a></li>
            <li class="navLink-Desktop"><a href="shop.html">Shop</a></li>
            <li class="navLink-Desktop"><a href="info.html">Learn More</a></li>
        </ul>
    </nav>
    <main>

<!--Hero Section-->
        <section class="heroWrapper">
            <div class="heroBackDrop"></div>
            <div class="intro">
                <div class="introWrap">
                    <div class="staticText">This is</div>
                </div>
                <ul class="dynamic-text">
                    <li><span><strong>Coffee</strong></span></li>
                    <li><span><strong>Balance</strong></span></li>
                    <li><span><strong>Duality</strong></span></li>
                    <li><span><strong>You</strong></span></li>
                </ul>
            </div>
           
        </section>
        <!--CTA == Call To Action-->
        <section class="shopCTA">
            <div class="ctaImg">
                <img src="images/ctaImg.jpg" alt="Coffee Pouring coffee into bags">
            </div>
            <div class="ctaMessage">
                <h2>Every Morning starts with you in mind.</h2>
                <p>Days aren't as daunting when you put yourself first.
                    With our Fresh brew as your first step you're accomplishing great things.
                </p>
                <div class="ctaButton"><a href="shop.html">Check Out our latest</a></div>
            </div>            
        </section>
        <section class="featuredItems">
            <h2>This Years Best:</h2>
            <div class="featuredItems-Container">
                <div class="itemWrapper stacked">
                    <div class="itemImg">
                        <img src="images/BeanBag3.png" alt="Light Roast Coffee Bag">
                    </div>
                    <div class="itemContent">
                        <h3>Emerald Buddha</h3>
                        <p>Harmony has found its way to your cup.</p>
                        <div class="itemButton"><a class="itemButton"href="shop.html">Shop Now</a></div>
                    </div>
                </div>
                <div class="itemWrapper stacked">
                    <div class="itemImg">
                        <img src="images/btccMerch-5.png" alt="Light Roast Coffee Bag">
                    </div>
                    <div class="itemContent">
                        <h3>Emerald Buddha</h3>
                        <p>A fresh brew is the ultimate wingman.</p>
                        <div class="itemButton"><a class="itemButton"href="shop.html">Shop Now</a></div>
                    </div>
                </div>
                <div class="itemWrapper stacked">
                    <div class="itemImg">
                        <img src="images/BeanBag1.png" alt="Light Roast Coffee Bag">
                    </div>
                    <div class="itemContent">
                        <h3>Emerald Buddha</h3>
                        <p>A blonde roast crafted with <em>Mastery</em></p>
                        <div class="itemButton"><a class="itemButton"href="shop.html">Shop Now</a></div>
                    </div>
                </div>
            </div>
        </section>
        <section class="newsletter">
            <h3>Stay up to date with Balance Trade</h3>
            <form class="newsletterForm" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="post">
                <label  for="email">Enter Your Email:</label>
                <input class="email" type="text" name="email" id="email"/><br>
                <button class="newsletterForm-btn" type="submit" name="submit">Enroll Now</button>
            </form>
            <?php if($msg != ''):?>
            <div class="alert <?php echo $msgClass ?>"><?php echo $msg ?></div>
            <?php endif; ?>
        </section>
    </main>
    <footer>
        <h2>Connected with us</h2>
        <ul>
            <li>Email</li>
            <li>FaceBook</li>
            <li>Twitter</li>
            <li>Instagram</li>
        </ul>
        <p class="employeePrivacy">Employee Privacy Policy</p>
        <h6>&copy; Bayona Web Media 2021; All Rights Reserved</h6>
    </footer>
    <script src="scripts/script.js"></script>
</body>
</html>