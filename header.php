<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>JS Project</title>
    <!--William Chalifoux-->
    <!--Bradley Keith Steben -->
    <!-- Duncan BH-->
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/style.css">
  </head>

  session_start();
  include_once 'includes/functions.inc.php';

  <body>

    <!--A quick navigation-->
    <nav>
      <div class="wrapper">
        <a href="index.html"><img src="img/logo-white.png" alt="Blogs logo"></a>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="discover.html">About Us</a></li>
          <li><a href="community.html">Community</a></li>
          <?php
            if (isset($_SESSION["useruid"])) {
              echo "<li><a href='profile.html'>Profile Page</a></li>";
              echo "<li><a href='logout.html'>Logout</a></li>";
            }
            else {
              echo "<li><a href='signup.html'>Sign up</a></li>";
              echo "<li><a href='login.html'>Log in</a></li>";
            }
          ?>
        </ul>
      </div>
    </nav>

<!--A quick wrapper to align the content (ends in footer)-->
<div class="wrapper">
