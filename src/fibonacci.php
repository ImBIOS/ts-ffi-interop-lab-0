<?php

function fibonacci($n) {
  if ($n <= 0) {
    return [];
  } elseif ($n == 1) {
    return [0];
  } elseif ($n == 2) {
    return [0, 1];
  } else {
    $fib = [0, 1];
    for ($i = 2; $i < $n; $i++) {
      $fib[$i] = $fib[$i - 1] + $fib[$i - 2];
    }
    return $fib;
  }
}

// Example usage
$sequence = fibonacci($argv[1]);
echo implode(', ', $sequence);

?>