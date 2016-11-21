// Tee XMLHttpRequest-objekti. Anna sen nimeksi xhr

// Tee funktio 'showImages', joka
// tarkastaa onko readyState ja status sellaiset että ladatun sisällön voi näyttää sekä
// muuttaa ladatun JSON-tekstin JavaScript-objektiksi
// Lisää funktioon muuttuja nimeltään ul, joka sisältää HTML-sivulla olevan <ul>-elementin.
// Lisää funktioon silmukka, joka rakentaa jokaisesta kuvasta alla olevan HTML:n
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
// Tee HTML-elementit createElement-metodilla ja
// lisää attribuutit setAttribute-metodilla tai elementti.attribuutti -syntaksilla.
// Lisää elementit toistensa sisälle appendChild-metodilla.
// Lisää ne lopuksi ul muuttuja sisälle, jolloinka ne tulostuvat HTML-sivulle.
// Funktio päättyy.

// avaa XMLHttpRequest-yhteys osoitteeseen X, metodi GET
// kun readystate vaihtuu, kutsu showImages funktiota
// lähetä XMLHttpRequest-pyyntö

var xhr = new XMLHttpRequest();

var showImages = function(){
  if(xhr.readyState === 4 && xhr.status === 200){
    var json = JSON.parse(xhr.responseText);
    console.log(json);
    for(var i in json){
        // lähdetään sisältä ulos
        var title = document.createTextNode(json[i].mediaTitle);
        var h3 = document.createElement('h3');
        h3.appendChild(title);

        var figcaption = document.createElement('figcaption');
        figcaption.appendChild(h3);

        var img = document.createElement('img');
        img.setAttribute('src', 'img/thumbs/'+json[i].mediaThumb)
        var a = document.createElement('a');
        a.setAttribute('href', 'img/original/'+json[i].mediaUrl);
        a.appendChild(img);

        var figure = document.createElement('figure');
        figure.appendChild(a);
        figure.appendChild(figcaption);

        var li = document.createElement('li');
        li.appendChild(figure);

        var ul = document.querySelector('ul');
        ul.appendChild(li);
    }
  }
}

xhr.open('GET', 'kuvat.json');
xhr.onreadystatechange = showImages;
xhr.send();