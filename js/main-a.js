// tee XMLHttpRequest-objekti. Anna sen nimeksi xhr

// tee funktio 'showImages', joka
// tarkastaa onko readyState ja status sellaiset että ladatun sisällön voi näyttää, sekä 
// lisää ladatun HTML-sisällön <ul> elementin sisälle

// avaa XMLHttpRequest-yhteys osoitteeseen X, metodi GET
// kun readystate vaihtuu, kutsu showImages funktiota
// lähetä XMLHttpRequest-pyyntö


var xhr = new XMLHttpRequest();

var showImages = function(){
  if(xhr.readyState === 4 && xhr.status === 200){
    document.querySelector('ul').innerHTML = xhr.responseText;
  }
}

xhr.open('GET', 'kuvat.html');
xhr.onreadystatechange = showImages;
xhr.send();