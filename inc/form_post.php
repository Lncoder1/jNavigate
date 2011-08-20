<?php 

  require_once 'functions.php';
  
  if (!strlen($_POST['name'])) 
		$name_err = true;
	if (!strlen($_POST['email']))
		$email_err = true;
	if (!strlen($_POST['comment']))
		$comment_err = true;

  if (!isset($name_err) && !isset($email_err) && !isset($comment_err)) {
  	require '../../tutorials/apps/mailer/Mailer.php';
  	$mailer = new Mailer(
				$_POST['name']
			,	$_POST['email']
			,	'phil@profilepicture.co.uk'
			,	'jNavigate form submission'
			,	$_POST['comment']
		);
		if ($mailer->validate()) {
			$mailer->send();
			$form_sent = true;
		}
		else $email_err = true;
  }
