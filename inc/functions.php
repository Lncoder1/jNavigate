<?php

  function load_partial() {
    $inc_folder = 'partials/';
    $inc_page = array_key_exists('page', $_GET) ?
      $_GET['page'].'.php' :
      'home.php';
    if (!file_exists($inc_folder.$inc_page)) $inc_page = '404.php';
    include $inc_folder.$inc_page;
  }
