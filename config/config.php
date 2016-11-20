<?php
define('SITE_ROOT', '/mediaManagerServer/');

/*Poistetaan vanhat käyttämättömät sessiot aina kun uusi sessio käynnistetään
* Roskien kerääjä hoitaa tämän (Garbage collection)
* Vähentää riskiä jottei vanhojen sessioiden tietoja voisi jäljittää
* Määrittele myös tallennuspaikka 
*/
// session_save_path('/home2-1/i/ilkkamtk/public_html/mediaManagerServer/session');
// ini_set('session.gc_probability', 1);
// Cookie voimassa kunnes selain suljetaan eli myös sessio vanhenee silloin
// session_set_cookie_params ( 0, SITE_ROOT ); 
session_start();

// Käytetään Ilen tietokantaa
$user = 'ilkkamtk';
$pass = 'q1w2e3r4';
$host = 'localhost';
$dbname = 'ilkkamtk';


/*Käytetään omaa tietokantaa
$user = 'tunnus';
$pass = 'salasana';
$host = 'mysql.metropolia.fi';
$dbname = 'tunnus';
*/

//Tietokantayhteys sulkeutuu automaattisesti kun </html> eli sivun scripti loppuu
//Normaali olion elinkaari
try { //Avataan kahva tietokantaan
	$DBH = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
    // virheenkäsittely: virheet aiheuttavat poikkeuksen
	$DBH->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
	// käytetään  yleistä nerkistöä utf8
	$DBH->exec("SET NAMES utf8;");
} catch(PDOException $e) {
	echo "Yhteysvirhe.";
	file_put_contents('log/DBErrors.txt', 'Connection: '.$e->getMessage()."\n", FILE_APPEND);
}//HUOM hakemistopolku eli tä config.php:tä saa sisällyttää VAIN päätasolta!
//Voisi laittaa SITE_ROOTin mukaan niin silloin tilanne muuttuisi

function login($user, $pwd, $DBH) {
	// !! on suola
	$hashpwd = hash('sha256', $pwd.'#€%&&/');
	$data = array('kayttaja' => $user, 'passu' => $hashpwd);
	print_r($data);
	try {
		$STH = $DBH->prepare("SELECT * FROM mm_user WHERE userEmail=:kayttaja AND
		userPwd = :passu");
		$STH->execute($data);
		$STH->setFetchMode(PDO::FETCH_OBJ);
		$row = $STH->fetch();
		// print_r($row);
		if($STH->rowCount() > 0){
			return $row;
		} else {
			return false;
		}
	} catch(PDOException $e) {
		echo "Login DB error.";
		file_put_contents('log/DBErrors.txt', 'Login: '.$e->getMessage()."\n", FILE_APPEND);
	}
}

//This works in 5.2.3
//First function turns SSL on if it is off.
//Second function detects if SSL is on, if it is, turns it off.

//==== Redirect... Try PHP header redirect, then Java redirect, then try http redirect.:
function redirect($url){
    if (!headers_sent()){    //If headers not sent yet... then do php redirect
        header('Location: '.$url); exit;
    }else{                    //If headers are sent... do java redirect... if java disabled, do html redirect.
        echo '<script type="text/javascript">';
        echo 'window.location.href="'.$url.'";';
        echo '</script>';
        echo '<noscript>';
        echo '<meta http-equiv="refresh" content="0;url='.$url.'" />';
        echo '</noscript>'; exit;
    }
}//==== End -- Redirect

//==== Turn on HTTPS - Detect if HTTPS, if not on, then turn on HTTPS:
function SSLon(){
    if($_SERVER['HTTPS'] != 'on'){
        $url = "https://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
        redirect($url);
    }
}//==== End -- Turn On HTTPS

//==== Turn Off HTTPS -- Detect if HTTPS, if so, then turn off HTTPS:
function SSLoff(){
    if($_SERVER['HTTPS'] == 'on'){
        $url = "http://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
        redirect($url);
    }
}//==== End -- Turn Off HTTPS

?>
