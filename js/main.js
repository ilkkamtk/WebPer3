// vaihtoehto 1 XMLHttpRequest (vanha)
var xhr = new XMLHttpRequest();

// valmis HTML
var showImages = function(){
  if(xhr.readyState === 4 && xhr.status === 200){
    document.querySelector('ul').innerHTML = xhr.responseText;
  }
}

//  JSON, innerHTML versio
/*
var showImages = function(){
  if(xhr.readyState === 4 && xhr.status === 200){
    var json = JSON.parse(xhr.responseText);
    var output = '';
    for(var i in json){
      output += '<li>'
                    + '<figure>'
                        + '<a href="img/original/' + json[i].mediaUrl +'"><img src="img/thumbs/' + json[i].mediaUrl + '"></a>'
                        + '<figcaption>'
                            + '<h3>' + json[i].mediaTitle + '</h3>'
                        + '</figcaption>'
                   + ' </figure>'
                + '</li>';
    }
    document.querySelector('ul').innerHTML = output;
  }
}
*/
// JSON, DOM versio
/*
var showImages = function(){
  if(xhr.readyState === 4 && xhr.status === 200){
    var ul = document.querySelector('ul');
    var json = JSON.parse(xhr.responseText);
    for(var i in json){
      var li = document.createElement('li');
      var figure = document.createElement('figure');
      var a = document.createElement('a');
      a.setAttribute('href', 'img/original/' + json[i].mediaUrl);
      var img = document.createElement('img');
      img.setAttribute('src', 'img/thumbs/' + json[i].mediaUrl);
      var figcaption = document.createElement('figcaption');
      var h3 = document.createElement('h3');
      var title = document.createTextNode(json[i].mediaTitle);

      a.appendChild(img);
      h3.appendChild(title);
      figcaption.appendChild(h3);
      figure.appendChild(a);
      figure.appendChild(figcaption);
      li.appendChild(figure);
      ul.appendChild(li); 

      // DOM tapa parempi, jos elementteihin tarvitsee lisätä tapahtumia. Esim:
      li.addEventListener('mouseenter', function(evt){
        console.log(evt.target.querySelector('h3').innerHTML);
      });
    }
  }
}
*/
//hae valmis HTML
xhr.open('GET', 'models/mFetchImagesHTML.php');

//hae JSON
// xhr.open('GET', 'models/mFetchImages.php');
xhr.onreadystatechange = showImages;
xhr.send();

// vaihtoehto 2. fetch (moderni)
/*fetch('models/mFetchImages.php')
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    // console.log('parsed json', json);
    var output = '';
    for(var i in json){
      output += '<li>'
                    + '<figure>'
                        + '<a href="img/original/' + json[i].mediaUrl + '"><img src="img/thumbs/' + json[i].mediaUrl + '"></a>'
                        + '<figcaption>'
                            + '<h3>' + json[i].mediaTitle + '</h3>'
                        + '</figcaption>'
                   + ' </figure>'
                + '</li>';
    }
    document.querySelector('ul').innerHTML = output;
  }).catch(function(ex) {
    console.log('parsing failed', ex);
  });
 */ 