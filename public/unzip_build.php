<?php
$zip = new ZipArchive;
$res = $zip->open('build.zip');
if ($res === TRUE) {
  $zip->extractTo('./');
  $zip->close();
  echo 'ok';
} else {
  echo 'failed';
}
unlink('build.zip');
unlink('unzip_build.php');
?>
