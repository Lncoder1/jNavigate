<!DOCTYPE html>
<html>
<head>
</head>
<body style="font-family: Arial, sans-serif; font-size: 12px;">
  <table width="580px" cellspacing="0" cellpadding="10px" border="0" style="margin-left: auto; margin-right: auto; margin-bottom: 40px;">
    <tbody>
      <tr>
        <td align="right" style="border-bottom: solid 2px #CCCCCC;">
          <h1 style="font-size: 18px; color: #333333; margin-bottom: 4px; line-height: 18px;">
            New form submission from ProfilePicture
          </h1>
          <p style="font-size: 12px; color: #999999; margin-top: 0px;">
            <?php echo date('l d F, Y'); ?>
          </p>
      </tr>
      <tr>
        <td>
          <strong>Message sent by:</strong> <cite><?php echo $this->name; ?></cite>
        </td>
      </tr>
      <tr>
        <td style="border-bottom: solid 2px #CCCCCC;">
          <strong>Message:</strong><br />
          <p style="margin-top: 5px; margin-bottom: 10px;">
            <?php echo strip_tags($this->message, '<a>'); ?>
          </p>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>