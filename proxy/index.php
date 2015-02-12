<?php
//http://scratchextproxy.x10.mx/?p=start.js
header("Access-Control-Allow-Origin: *");

// mime content detector
if(!function_exists('mime_content_type')) {
  function mime_content_type($filename) {
  $mime_types = array(
  'txt' => 'Text File',
  'htm' => 'HTML File',
  'html' => 'HTML File',
  'php' => 'PHP File',
  'css' => 'CSS File',
  'js' => 'JavaScript File',
  'json' => 'JSON File',
  'xml' => 'XML File ',
  'swf' => 'Shockwave Flash File',
  'flv' => 'FLV Video',
  'htaccess' => 'HTACCESS File',
  'htpasswd' => 'HTPASSWORD File',
  
  'ini' => 'INI File',
  
  // images
  'png' => 'PNG Image',
  'jpe' => 'JPEG Image',
  'jpeg' => 'JPEG Image',
  'jpg' => 'JPEG Image',
  'gif' => 'GIF Image',
  'bmp' => 'BMP Image',
  'psd' => 'PHOTOSHOP Files',
  'PDF' => 'PDF Files',
  'ico' => 'ICON File',
  'tiff' => 'TIFF Image',
  'tif' => 'TIFF Image',
  'svg' => 'SVG File',
  'svgz' => 'SVG File',
  
  // archives
  'zip' => 'ZIP File',
  'rar' => 'RAR File',
  'exe' => 'EXE Files',
  'msi' => 'MSI Files',
  'cab' => 'CAB Files',
  
  // audio/video
  'mp3' => 'audio/mpeg',
  'qt' => 'video/quicktime',
  'mov' => 'video/quicktime',
  
  // adobe
  'pdf' => 'application/pdf',
  'psd' => 'image/vnd.adobe.photoshop',
  'ai' => 'application/postscript',
  'eps' => 'application/postscript',
  'ps' => 'application/postscript',
  
  // ms office
  'doc' => 'MS WORD File',
  'docx' => 'MSWORD File',
  'rtf' => 'RTF File',
  'xls' => 'MS EXCEL File',
  'ppt' => 'MS POWER POINT File',
  'xlsx' => 'MS EXCEL File',
  'pptx' => 'MS POWER POINT File',
  
  // open office
  'odt' => 'application/vnd.oasis.opendocument.text',
  'ods' => 'application/vnd.oasis.opendocument.spreadsheet',
  );
  
  
  $ext = strtolower(array_pop(explode('.',$filename)));
  
  if (function_exists("finfo_file")) {
  $finfo = finfo_open(FILEINFO_MIME, "/usr/share/misc/magic");
  if ($finfo) {
  return finfo_file($finfo, $filename);
  
  }else{
  if(array_key_exists($ext, $mime_types)){
  return $mime_types[$ext]; 
  }
  }
  @finfo_close($finfo);
  }elseif (array_key_exists($ext, $mime_types)) {
  return $mime_types[$ext];
  }
  else {
  return 'application/octet-stream';
  }
  
  }
}

$url = $_GET['p'];
echo '<h1>IN DEVELOPMENT</h1>';

// set MIME type based on extension
echo mime_content_type($url);
header('Content-Type: text/html');

echo file_get_contents('<br>' . 'https://raw.githubusercontent.com/GrannyCookies/scratchext2/master/code/' . $url);
?>
