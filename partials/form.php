<?php 
  if (array_key_exists('name', $_POST)) {
    include 'inc/form_post.php';
  }
?>
<h2>Using jNavigate for form submissions</h2>

<?php if (isset($form_sent)) : ?>
  <p>Thanks for taking the time to give feedback... Now go and code!</p>
<?php else : ?>
  <p>
    jNavigate is great for creating dynamic forms such as the comment form
    below. Check out the <a class="trigger" href="index.php?page=docs">
    option reference</a> for more information on how best to tailor it to 
    your needs. Currently the only 
    <abbr title="Hypertext Transfer Protocol">HTTP</abbr> verb pushed to 
    history is GET so no form posts will get submitted via the user
    hitting the back button, this will get better in the future but is good
    for now. Don't forget to leave me some feedback and 
    test out the form submission by filling 
    out the form below!
  </p>
  <form action="index.php?page=form" method="post">
    <fieldset>
      <p>
        <input type="text" name="name" value="<?php if (array_key_exists('name', $_POST)) echo $_POST['name']; ?>">
        <label>Your name</label>
        <?php if (isset($name_err)) : ?>
          <p class="form-error">Please add your name</p>
        <?php endif; ?>
      </p>
      <p>
        <input type="email" name="email" value="<?php if (array_key_exists('email', $_POST)) echo $_POST['email']; ?>">
        <label>Your email</label>
        <?php if (isset($email_err)) : ?>
          <p class="form-error">Please add a valid email address</p>
        <?php endif; ?>
      </p>
      <p>
        <textarea name="comment" cols="50" rows="5"><?php if (array_key_exists('comment', $_POST)) echo $_POST['comment']; ?></textarea>
        <label>Comment</label>
        <?php if (isset($comment_err)) : ?>
          <p class="form-error">Please add a comment</p>
        <?php endif; ?>
      </p>
      <p>
        <input class="trigger" type="submit" name="submit" value="Send">
      </p>
    </fieldset>
  </form>
<?php endif; ?>
