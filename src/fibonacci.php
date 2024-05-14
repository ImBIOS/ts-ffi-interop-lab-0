<?php

function fibonacci($x) {
  if ($x <= 2) {
      return 1;
  } else {
      return fibonacci($x - 1) + fibonacci($x - 2);
  }
}


$result = fibonacci($argv[1]);
echo $result;

?>