<?php
$zip = new ZipArchive;
$res = $zip->open('../vendor/composer.zip');
if ($res === TRUE) {
  $zip->extractTo('../vendor/');
  $zip->close();
  echo 'ok';
} else {
  echo 'failed';
}
unlink('../vendor/composer.zip');
unlink('unzip_composer.php');
?>
