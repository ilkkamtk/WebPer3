// Tee XMLHttpRequest-objekti. Anna sen nimeksi xhr

// Tee funktio 'showImages', joka
// tarkastaa onko readyState ja status sellaiset että ladatun sisällön voi näyttää sekä
// muuttaa ladatun JSON-tekstin JavaScript-objektiksi
// Tee funktioon myös muuttuja 'output', jolle annat arvoksi tyhjän merkkijonon sekä
// tee silmukka joka rakentaa jokaisesta kuvasta alla olevan HTML:n
/*
<li>
    <figure>
        <a href="img/original/filename.jpg"><img src="img/thumbs/filename.jpg"></a>
        <figcaption>
            <h3>Title</h3>
        </figcaption>
    </figure>
</li>
*/
// lisää em. HTML output-muuttujaan
// Silmukan jälkeen tulosta HTML-koodi (output) <ul>-elementin sisälle.
// Funktio päättyy.

// avaa XMLHttpRequest-yhteys osoitteeseen X, metodi GET
// kun readystate vaihtuu, kutsu showImages funktiota
// lähetä XMLHttpRequest-pyyntö


var xhr = new XMLHttpRequest();

var showImages = function(){
  if(xhr.readyState === 4 && xhr.status === 200){
    var json = JSON.parse(xhr.responseText);
    var output = '';
    for(var i in json){
      output += '<li>' +
                    '<figure>' +
                        '<a href="img/original/' + json[i].mediaUrl +'"><img src="img/thumbs/' + json[i].mediaUrl + '"></a>' +
                         '<figcaption>' +
                            '<h3>' + json[i].mediaTitle + '</h3>' +
                         '</figcaption>' +
                    '</figure>' +
                '</li>';
    }
    document.querySelector('ul').innerHTML = output;
  }
}

xhr.open('GET', 'kuvat.html');
xhr.onreadystatechange = showImages;
xhr.send();