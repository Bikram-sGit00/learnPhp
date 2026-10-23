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
    
    ?>
</body>
</html>