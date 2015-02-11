<?php
// our rawgit mini
// usage:
// http://www.stefanbates.com/scratchext2/temp/index.php?p=start.js

header('Content-Type: text/javascript');
header("Access-Control-Allow-Origin: *");

$url = $_GET['p'];
echo '<h1>ScratchExt 2.0 Rawgit Mini - Test</h1>';
echo $url;
?>
