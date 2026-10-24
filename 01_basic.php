<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1> working for now </h1>
    <?php
    ecHo "testing";
    echo "<br>";
    echo "testing 2";

    echo "<h2>Variables & operators</h2>";

    $var1 = 10;
    $var2 = 15;

    echo var_dump(1 >= 10);

    echo "<br>";

    $str = "ACE";
    echo var_dump($str);

    echo "<br>";
    define('constVar', 3.12);
    // define("constVar", 3.12); can also use ""
    echo constVar;

    echo"<br>";
    echo "<h2>Arrays in PHP</h2>";
    echo "<br>";

    $langs = array("c++","Java", "Go");
    echo "arr output :: ";
    echo $langs[0];
    echo $langs[2];

    echo count($langs); // count of items in arr;


    
    echo"<br>";
    echo "<h2>Loops in PHP</h2>";
    echo "<br>";

    $a = 10;
    while($a > 0){
        echo $a;
        echo " ";
        $a--;
    }

    $i = count($langs) - 1;
    while ($i >= 0) {
        echo $langs[$i];
        echo" ";
        $i--;
    }
    echo "<br>";
    $iterator = 0;
    while($iterator < count($langs)){
        echo $langs[$iterator];
        echo "  ";
        $iterator++; 
    }

    $it = 0;
    do{
        echo $langs[$it];
        echo "  ";
        $it++;

    }while($it > count($langs)); // never true still c++ got printed we'll know why...

    echo"<br>";
    echo"For Loop";
    echo"<br>";

    for ($a = 0; $a < count($langs); $a++) { 
        echo $langs[$a];
        echo "  ";
        
    }

    foreach($langs as $i){
        echo $i;
        echo " ";
    }

    echo"<h2>Function in PHP</h2>";
    function adder($n1, $n2){
        return $n1 + $n2;
    }

    $num = adder(10, 10);
    echo $num;


    echo "<br>";
    echo"<h2>strings in PHP</h2>";
    echo "<br>";

    $str = "testing string";
    echo "output :" .strlen($str); // dot for concatenation

    
    ?>
</body>
</html>