<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "vue-form-editor";

if(isset($_POST['form'])){
    $form = $_POST['form'];
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "INSERT INTO form (form) VALUES ('$form')";
        $conn->exec($sql);

        $last_id = $conn->lastInsertId();
        echo $last_id;
    }
    catch(PDOException $e) {
        echo '<b>Operation that failed:</b> ' . $sql . "<br><b>Error Message:</b> " . $e->getMessage();
    }
}
else {
    echo 'Form not set.';
}
