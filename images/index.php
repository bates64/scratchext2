<?php
 if ($handle = opendir('.')) {
   while (false !== ($file = readdir($handle)))
      {
          if ($file != "." && $file != ".." && $file != "index.php")
	  {
          	$thelist .= '<a href="'.$file.'">'.$file.'</a><br>';
          }
       }
  closedir($handle);
  }
?>
<style>

html {
    font-family: sans-serif;
    background-color: black;
    color: white;
}

a {
    text-decoration: none;
    color: #4CCF2A;
}

a:hover {
    color: #369A1C;
}

p {
    line-height: 28px;
}

</style>
<h1>ScratchExt 2.0 Source Code</h1>
<p><?=$thelist?></p>