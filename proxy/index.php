<?php
//http://scratchextproxy.x10.mx/?p=start.js
header("Access-Control-Allow-Origin: *");

echo '<h1>IN DEVELOPMENT</h1>';
$url = 'https://raw.githubusercontent.com/GrannyCookies/scratchext2/master/code/' . $_GET['p'];

// mime content detector
$finfo = finfo_open($url);
$mime_type = finfo_file($finfo, $filename);
finfo_close($finfo);

// set MIME type based on extension
echo $mime_type;
header('Content-Type: text/html');

echo file_get_contents('<br>' . $url);
?>
