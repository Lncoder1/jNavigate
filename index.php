<?php 
  require_once 'inc/functions.php';
  if (array_key_exists('jnavigate', $_GET) || 
      array_key_exists('jnavigate', $_POST)) {
    load_partial();
  } else { 
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />

  <title>jNavigate jQuery plugin</title>
  <link href='http://fonts.googleapis.com/css?family=Yanone+Kaffeesatz:extralight,light,regular,bold' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" media="screen" type="text/css" href="style/style.css">
</head>

<body>
  <a id="fork-banner" href="http://github.com/p-m-p/jNavigate">
    <img src="https://d3nwyuy0nl342s.cloudfront.net/img/ce742187c818c67d98af16f96ed21c00160c234a/687474703a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f6c6566745f677261795f3664366436642e706e67" alt="Fork me on GitHub">
  </a> 
  <div id="wrap">
   
      
    <header>
      <h1>jNavigate jQuery plugin</h1>
    </header>

    <nav id="main-nav">
      <ol>
        <li><a class="ext-trigger" href="index.php?page=home">jNavigate home</a></li>
        <li><a class="ext-trigger" href="index.php?page=docs">Documentation</a></li>
        <li><a class="ext-trigger" href="index.php?page=form">Form example</a></li>
        <li><a class="ext-trigger" href="index.php?page=utils">Utility methods</a></li>
        <li><a id="kill" href="index.php?page=form">Kill jNavigate</a></li>
      </ol>
    </nav>
    
    <div id="main">
      <?php load_partial(); ?>
    </div>
    
    <footer>
      <a class="backBtn" href="http://www.profilepicture.co.uk/tutorials/jnavigate-jquery-plugin/">Back to the article</a>
    </footer>
    
  </div>

  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script>
  <script src="js/jnavigate.jquery.js"></script>
  <script>
    $(function () {
      $("#main").jNavigate({
          extTrigger: ".ext-trigger",
          intTrigger: ".trigger",
          loaded: utilsDemos
      });
      $("#kill").click(function (ev) {
        ev.preventDefault();
        $("#main").jNavigate("destroy");
      });
      utilsDemos(); // just in case user landed on utils page!
    });
    
    function utilsDemos () {
      $("#loadingDemo").click(function (ev) {
        ev.preventDefault();
        var $box = $("#loadingBox")
          , $loading = $box.data("jnavigate-overlay");
        if (!$loading) {
          $box.jNavigate("overlay");
          $loading = $box.data("jnavigate-overlay");
          $(this).text("Remove loading overlay");
        } else if ($loading.is(":hidden")) {
          $(this).text("Remove loading overlay");
          $loading.fadeIn(250);
        } else {
          $(this).text("Add loading overlay");
          $loading.fadeOut(400);
        }
      });
      $("#navigateDemo").click(function (ev) {
        ev.preventDefault();
        $("#navigateBox").jNavigate("navigate", {
            url: this.href
          , useHistory: false
        });
      });
    }
  </script>
<?php include 'inc/footer.php'; } ?>
