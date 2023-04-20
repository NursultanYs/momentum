'use strict';

//Timer

let hash=window.location.hash;
hash=hash.substring(1);
const clock=document.querySelector('.time');
function clockTimer()
{

  const day = document.querySelector(".date");
  const date = new Date(); 
  let time = [date.getHours(),date.getMinutes(),date.getSeconds()]; // |[0] = Hours| |[1] = Minutes| |[2] = Seconds|
  let dayOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  let dayOfWeekRu = ["Воскресенье","Понедельник","Четверг","Среда","Четверг","Пятница","Воскресенье"]
  let MonthofYear=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let MonthofYearRu=['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  let days = date.getDay();
  let dayOfMonth=date.getDate();
  let month=date.getMonth();


  if(time[0] < 10){time[0] = "0"+ time[0];}
  if(time[1] < 10){time[1] = "0"+ time[1];}
  if(time[2] < 10){time[2] = "0"+ time[2];}
  
  let current_time = [time[0],time[1],time[2]].join(':');
  clock.innerHTML = current_time;
  if(hash==="en"){
    day.innerHTML = `${dayOfWeek[days]}, ${MonthofYear[month]} ${dayOfMonth}`;
  }else if(hash==="ru"){
    day.innerHTML = `${dayOfWeekRu[days]}, ${MonthofYearRu[month]} ${dayOfMonth}`;
  }
  
  
  
  setTimeout("clockTimer()", 1000);
}
clockTimer();

//Greeting

const greeting=document.querySelector('.greeting');

function changeGreeting(){
    const date=new Date();
    const hours=date.getHours();

    if(hash==='en'){
    if(hours>=5 && hours<12){
        greeting.textContent="Good morning";
    }else if(hours>=12 && hours<18){
      greeting.textContent="Good afternoon";
    }else if(hours>=18 && hours<24){
      greeting.textContent="Good evening";
    }else if(hours>=0 && hours<6){
      greeting.textContent="Good night"
    }
    }else if(hash==='ru'){
      if(hours>=5 && hours<12){
        greeting.textContent="Доброе утро";
      }else if(hours>=12 && hours<18){
      greeting.textContent="Добрый день";
      }else if(hours>=18 && hours<24){
      greeting.textContent="Добрый вечер";
      }else if(hours>=0 && hours<6){
      greeting.textContent="Доброй ночи"
      }
    }
}   
changeGreeting();


function saveLocal(title){
  let input = document.querySelector(`.${title}`);

  if (input) {
    input.value = localStorage.getItem(title) || "";

    input.addEventListener('input', function() {
      localStorage.setItem(title, this.value);
    });
  }
}
saveLocal('name');


// background
function setTimeDay(){
  const date=new Date();
  const hours=date.getHours();
  if(hours>=5 && hours<12){
    timeDay='morning';
  }else if(hours>=12 && hours<18){
    timeDay='afternoon';
  }else if(hours>=18 && hours<24){
    timeDay='evening';
  }else if(hours>=0 && hours<5) {
    timeDay='night';
  }
}
let timeDay='';

const body=document.querySelector('body');
const prev=document.querySelector('.slide-prev');
const next=document.querySelector('.slide-next');

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
function getZero(num) {
  if (num >= 0 && num < 10) {
      return '0' + num;
  } else {
      return num;
  }
}


function getBackgroundByGit(){
  console.log('ByGit');

  let imgOrder=getRandomIntInclusive(1,20);
  setTimeDay();
  
  let url=`https://raw.githubusercontent.com/Ana7a/stage1-tasks/assets/images/${timeDay}/${getZero(imgOrder)}.jpg`
  body.style.backgroundImage=`url(${url})`;
  prev.addEventListener('click',()=>{
      setTimeDay();
      if(imgOrder>1){
        imgOrder-=1;
      }else if(imgOrder<=1){
        imgOrder=20;
      }
      url=`https://raw.githubusercontent.com/Ana7a/stage1-tasks/assets/images/${timeDay}/${getZero(imgOrder)}.jpg`;
      body.style.backgroundImage=`url(${url})`;
      console.log('prevByGit');
  })
  next.addEventListener('click',()=>{
      setTimeDay();
      if(imgOrder<20){
        imgOrder+=1;
      }else if(imgOrder=20){
        imgOrder=1;
      }
      url=`https://raw.githubusercontent.com/Ana7a/stage1-tasks/assets/images/${timeDay}/${getZero(imgOrder)}.jpg`;
      body.style.backgroundImage=`url(${url})`;
      console.log('nextByGit');
  })
}

getBackgroundByGit();


let tag;
//Bacground UNSPLASH
function getBackgroundByUnsplash(){
  const clientId='FHKO5hh0ckM1Z2RA1bKzDSVvcApZVgPz5joCO3t41Eo';
  setTimeDay();
  let query = tag;
  if(!tag){
    query=timeDay;
  }
  let imgOrder=getRandomIntInclusive(0,20);
  let dataImages;
  const fetchPhotos=async()=>{
    try{
      const url = `https://api.unsplash.com/search/photos?page=30&query=${query}&per_page=${20}&client_id=${clientId}`;
      const response=await fetch(url);
      dataImages=await response.json();
      console.log(dataImages);
      body.style.backgroundImage=`url(${dataImages.results[imgOrder].urls.full})`;
      console.log(dataImages);
    }catch(err){
      console.log(err);
    }
  }
  fetchPhotos();  
  prev.addEventListener('click',()=>{
    setTimeDay();
    if(imgOrder>1){
      imgOrder-=1;
    }else if(imgOrder<=1){
      imgOrder=19;
    }
    body.style.backgroundImage=`url(${dataImages.results[imgOrder].urls.full})`;
    console.log('prevByUnsplash')
  })
  next.addEventListener('click',()=>{
    setTimeDay();
    if(imgOrder<19){
      imgOrder+=1;
    }else if(imgOrder=19){
      imgOrder=1;
    }
    body.style.backgroundImage=`url(${dataImages.results[imgOrder].urls.full})`;
    console.log('nextByUnsplash')
  })
  }

//Bacground FLICKR

function getBackgroundByFlikcr(){
  const apiKey = '572638bf41c478026f347692e1a8c85d';
  setTimeDay();
  let query = tag;
  if(!tag){
    query=timeDay;
  }
  let imgOrder=getRandomIntInclusive(0,20);
  let dataImgs;
  setTimeDay();
  const fetchByFlickr=async()=>{
    try{
      const apiUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${query}&extras=url_l&format=json&nojsoncallback=1`;
      const response=await fetch(apiUrl);
      const data=await response.json();
      dataImgs=data;
      console.log(data);
      body.style.backgroundImage=`url(${dataImgs.photos.photo[imgOrder].url_l})`;
    }catch(err){
      console.log(err);
    }
  }

  prev.addEventListener('click',()=>{
    setTimeDay();
    if(imgOrder>1){
      imgOrder-=1;
    }else if(imgOrder<=1){
      imgOrder=19;
    }
    body.style.backgroundImage=`url(${dataImgs.photos.photo[imgOrder].url_l})`;
    console.log('prevByFlickr');
  })

  next.addEventListener('click',()=>{
    setTimeDay();
    if(imgOrder<19){
      imgOrder+=1;
    }else if(imgOrder=19){
      imgOrder=1;  
    }
    body.style.backgroundImage=`url(${dataImgs.photos.photo[imgOrder].url_l})`;
    console.log('nextByFlickr');
  })
  fetchByFlickr();
}

const github=document.querySelector('.github'),
      unsplash=document.querySelector('.unsplash'),
      flickr=document.querySelector('.flickr');

if (localStorage.getItem('source')==='github'){
  github.classList.add('red');
  unsplash.classList.remove('red');
  flickr.classList.remove('red');
  getBackgroundByGit();
}else if(localStorage.getItem('source')==='unsplash'){
  unsplash.classList.add('red');
  github.classList.remove('red');
  flickr.classList.remove('red');
  getBackgroundByUnsplash();
}else if(localStorage.getItem('source')==='flickr'){
  flickr.classList.add('red');
  unsplash.classList.remove('red');
  github.classList.remove('red');
  getBackgroundByFlikcr();
}
//Weather

const apiKey='18c1cad7d8084f8e9da73943232002';
const weatherErr=document.querySelector('.weather-error'),
      temperature=document.querySelector('.temperature'),
      weatherDescr=document.querySelector('.weather-description'),
      wind=document.querySelector('.wind'),
      humidity=document.querySelector('.humidity'),
      icon=document.querySelector('.weather-icon'),
      weatherIcon=icon.querySelector('img');


// fetch(query).then((response)=>{
//   return response.json()
// }).then((data)=>{
//   console.log(data);
// })
function showWeather(){
  cityName=city.value.trim();

  const query=`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`;

  fetch(query).then((response)=>{
    return response.json()
    }).then((data)=>{
    if(data.error){
      localStorage.removeItem('weatherDescr');
      localStorage.removeItem('temperature');
      localStorage.removeItem('humidity');
      localStorage.removeItem('wind');
      localStorage.removeItem('WeatherIcon');
      weatherErr.textContent=`Error! city not found for ${cityName} !`;
      weatherDescr.textContent="";
      temperature.textContent="";
      humidity.textContent="";
      wind.textContent="";
      weatherIcon.src="";
    }else{
      localStorage.setItem('weatherDescr',data.current.condition.text);
      localStorage.setItem('temperature',data.current.temp_c)
      localStorage.setItem('Humidity',data.current.humidity)
      localStorage.setItem('wind',data.current.wind_mph);
      localStorage.setItem('WeatherIcon',data.current.condition.icon);

      weatherErr.textContent="";
      weatherDescr.textContent=data.current.condition.text;
      temperature.textContent=`${Math.round(data.current.temp_c)}°C`;
      humidity.textContent=`Humidity: ${Math.round(data.current.humidity)} %`;
      wind.textContent=`Wind speed: ${Math.round((data.current.wind_mph)/2.2)} m/s`
      weatherIcon.src=data.current.condition.icon;
    }
    })
}



const city=document.querySelector('.city');
let cityName;
city.addEventListener('keydown',(e)=>{
  if(e.code==='Enter'){
    console.log(city.value.trim());
    showWeather();
  }
})


saveLocal('city');
if(localStorage.getItem('city')){
  if(hash==="en"){
  weatherDescr.textContent=localStorage.getItem('weatherDescr');
  temperature.textContent=`${Math.round(localStorage.getItem('temperature'))}°C`;
  humidity.textContent=`Humidity: ${Math.round(localStorage.getItem('Humidity'))} %`;
  wind.textContent=`Wind speed: ${Math.round(localStorage.getItem('wind')/2.2)} m/s`;
  weatherIcon.src=localStorage.getItem('WeatherIcon');
  }else if(hash==="ru"){
    weatherDescr.textContent=localStorage.getItem('weatherDescr');
    temperature.textContent=`${Math.round(localStorage.getItem('temperature'))}°C`;
    humidity.textContent=`Влажность: ${Math.round(localStorage.getItem('Humidity'))} %`;
    wind.textContent=`Скорость ветра: ${Math.round(localStorage.getItem('wind')/2.2)} м/с`;
    weatherIcon.src=localStorage.getItem('WeatherIcon');
  }
}


// quote

const quote=document.querySelector('.quote'),
      author=document.querySelector('.author'),
      changeQuote=document.querySelector('.change-quote');

// fetch('https://dummyjson.com/quotes/random')
// .then(res => res.json())
// .then(data=>{
//   console.log(data);
//   quote.textContent=data.quote;
//   author.textContent=data.author;
// })

fetch("https://api.quotable.io/random?tags=inspirational|life&maxLength=100&languages=ru")
  .then(response => response.json())
  .then(data => {
    console.log(`English: ${data.content} - ${data.author}\nRussian: ${data.translation}`);
    quote.textContent=data.content;
    author.textContent=data.author;
  })
  .catch(error => console.error(error));


changeQuote.addEventListener('click',()=>{
  fetch("https://api.quotable.io/random?tags=inspirational|life&maxLength=100&languages=ru")
  .then(response => response.json())
  .then(data => {
    console.log(data);
    console.log(`English: ${data.content} - ${data.author}\nRussian: ${data.translation}`);
    quote.textContent=data.content;
    author.textContent=data.author;
  })
  .catch(error => console.error(error));
})


//Audio

const player=document.querySelector('.player'),
      play=document.querySelector('.play'),
      playPrev=document.querySelector('.play-prev'),
      playNext=document.querySelector('.play-next'),
      audio=document.querySelector('.audio'),
      songList=document.querySelectorAll('.play-item'),
      progressContainer=document.querySelector('.progress_container'),
      progress=document.querySelector('.progress'),
      currentSong=document.querySelector('.current-song'),
      actualTime=document.querySelector('.current-time'),
      songDuration=document.querySelector('.duration'),
      range=document.querySelector('.range'),
      soundImg=document.querySelector('.sound-img');


//----------------------------------------//
const songs=['Aqua Caelestis','Ennio Morricone','River Flows In You','Summer Wind'] 

let songIndex=0;

function songActive(){
  songList.forEach(item=>{
    item.classList.remove('item-active');
  })
  songList[songIndex].classList.add('item-active');
}

function loadSong(song){
  audio.src=`assets/sounds/${song}.mp3`
  currentSong.textContent=song;
}
loadSong(songs[songIndex]);

function playSong(){
  play.classList.add('pause');
  player.classList.add('playing');
  audio.play();
  songActive();
}
function pauseSong(){
  play.classList.remove('pause');
  player.classList.remove('playing');
  audio.pause();
}
play.addEventListener('click',()=>{
  const isPlaying=player.classList.contains('playing');
  if(isPlaying){
    pauseSong();
  }else{
    playSong();
  }
})

function nextSong(){
  songIndex++
  if(songIndex>songs.length-1){
    songIndex=0;
  }
  loadSong(songs[songIndex])
  playSong();

}
playNext.addEventListener('click',()=>{
  nextSong();
})

function prevSong(){
  songIndex--
  if(songIndex<0){
    songIndex=songs.length-1
  }
  loadSong(songs[songIndex])
  playSong();
}
playPrev.addEventListener('click',()=>{
  prevSong();
  
})

audio.addEventListener('ended',nextSong); 

//---------------------------------------------------//

function updateProgress(e){
  const {duration,currentTime}=e.srcElement;
  const progressPercent=(currentTime/duration)*100;
  progress.style.width=`${progressPercent}%`
  actualTime.textContent= timeFormat(currentTime*1000);
  if(Boolean(duration)===false){
    songDuration.textContent;
  }else{
    songDuration.textContent=timeFormat(duration*1000);
  }
}
audio.addEventListener('timeupdate',updateProgress);

//SetProgress

function SetProgress(e){
  const width=this.clientWidth;
  const clickX=e.offsetX
  const duration=audio.duration;
  audio.currentTime= (clickX/width)*duration;
 if(typeof(duration)===number){
    songDuration.textContent= timeFormat(duration*1000);
  }else{
    
  } 
}
progressContainer.addEventListener('click',SetProgress)

const timeFormat = (function (){
  function num(val){
      val = Math.floor(val);
      return val < 10 ? '0' + val : val;
  }

  return function (ms/**number*/){
      var sec = ms / 1000
        , minutes = sec / 60 % 60
        , seconds = sec % 60
      ;

      return num(minutes) + ":" + num(seconds);
  };
})();

//Mute Unmute

let muteStatus=true;
soundImg.addEventListener('click',()=>{
  if(muteStatus===true){
     muteStatus=false;
     soundImg.src="assets/img/sound_off.png"
     audio.volume=0;
     range.value=0;
  } else{
    muteStatus=true;
     soundImg.src="assets/img/sound.png"
     audio.volume=0.5;
     range.value=50;
  }
})
audio.value=0.5;
range.value=50;
range.addEventListener('input',()=>{
  audio.volume=(range.value)/100;
})


// SETINGS

const settingBtn=document.querySelector('.settings-icon'),
      settings=document.querySelector('.settings'),
      tagForImg=document.querySelector('.form__field');

function showHide(btn,element){
  btn.addEventListener('click',()=>{
    if(element.classList.contains('show') && !element.classList.contains('hide')){
      element.classList.remove('show');
      element.classList.add('hide');
      localStorage.setItem(element.className.split(" ")[0],'hidden');
      btn.classList.add('red');
    }else if(element.classList.contains('show') && element.classList.contains('hide')){
      element.classList.remove('hide')
      element.classList.add('show');
      localStorage.setItem(element.className.split(" ")[0],'show');
      btn.classList.remove('red');
    }
    else if(element.classList.contains('hide')){
      element.classList.remove('hide')
      element.classList.add('show');
      localStorage.setItem(element.className.split(" ")[0],'show');
      btn.classList.remove('red');
    }else{
      element.classList.remove('show');
      element.classList.add('hide');
      localStorage.setItem(element.className.split(" ")[0],'hidden');
      btn.classList.add('red');
    }
    console.dir(element.className.split(" ")[0]);
  })
}
showHide(settingBtn,settings);


github.addEventListener('click',()=>{
  localStorage.setItem('source','github')
  github.classList.add('red');
  unsplash.classList.remove('red');
  flickr.classList.remove('red');
  getBackgroundByGit();
})
unsplash.addEventListener('click',()=>{
  localStorage.setItem('source','unsplash')
  unsplash.classList.add('red');
  github.classList.remove('red');
  flickr.classList.remove('red');
  getBackgroundByUnsplash();
})
flickr.addEventListener('click',()=>{
  localStorage.setItem('source','flickr')
  flickr.classList.add('red');
  unsplash.classList.remove('red');
  github.classList.remove('red');
  getBackgroundByFlikcr();
})



tagForImg.addEventListener('change',()=>{
  tag=tagForImg.value;
  if(localStorage.getItem('source')==='unsplash'){
    getBackgroundByUnsplash();
  }else if(localStorage.getItem('source')==='flickr'){
    getBackgroundByFlikcr();
  }
})

// RemoveElements
const deleteTime=document.querySelector('.delete-time'),
      deleteDate=document.querySelector('.delete-date'),
      date=document.querySelector('.date'),
      deleteGreeting=document.querySelector('.delete-greeting'),
      greetingContainer=document.querySelector('.greeting-container'),
      deleteQuote=document.querySelector('.delete-quote'),
      quoteContainer=document.querySelector('.quote-container'),
      deleteWeather=document.querySelector('.delete-weather'),
      weather=document.querySelector('.weather'),
      deleteAudio=document.querySelector('.delete-audio'),
      deleteLinks=document.querySelector('.delete-links');

// const pressTime=document.querySelector('.press-time'),
//       pressDate=document.querySelector('.press-date'),
//       pressGreeting=document.querySelector('.press-greeting'),
//       pressQuote=document.querySelector('.press-quote'),
//       pressWeather=document.querySelector('.press-weather'),
//       pressAudio=document.querySelector('.press-audio'),
//       pressLinks=document.querySelector('.press-links');


showHide(deleteTime,clock);

showHide(deleteDate,date);

showHide(deleteGreeting,greetingContainer);

showHide(deleteQuote,quoteContainer);

showHide(deleteWeather,weather);

showHide(deleteAudio,player)

console.log(localStorage.getItem('date'));

function setHideSettings(){
  if(localStorage.getItem('date')=='hidden'){
    date.classList.add("hide");
    deleteDate.classList.add('red');
  }else{
    date.classList.add('show'); 
    deleteDate.classList.remove('red');
  }
  if(localStorage.getItem('time')=='hidden'){
    clock.classList.add("hide");
    deleteTime.classList.add('red');
  }else{
    clock.classList.add('show'); 
    deleteTime.classList.remove('red');
  }
  if(localStorage.getItem('greeting-container')=='hidden'){
    greetingContainer.classList.add("hide");
    deleteGreeting.classList.add('red');
  }else{
    greetingContainer.classList.add('show'); 
    deleteGreeting.classList.remove('red');
  }
  if(localStorage.getItem('quote-container')=='hidden'){
    quoteContainer.classList.add("hide");
    deleteQuote.classList.add('red');
  }else{
    quoteContainer.classList.add('show'); 
    deleteQuote.classList.remove('red');
  }
  if(localStorage.getItem('weather')=='hidden'){
    weather.classList.add("hide");
    deleteWeather.classList.add('red');
  }else{
    weather.classList.add('show'); 
    deleteWeather.classList.remove('red');
  }
  if(localStorage.getItem('player')=='hidden'){
    player.classList.add("hide");
    deleteAudio.classList.add('red');
  }else{
    player.classList.add('show'); 
    deleteAudio.classList.remove('red');
  }
}
setHideSettings();


//changeLang
const langArr={
  "lang":{
      "en":"Language",
      "ru":"Языки"
  },
  "en":{
      "en":"en",
      "ru":"англ."
  },
  "ru":{
      "en":"ru",
      "ru":"рус."
  },
  "sources":{
      "en":"Sources",
      "ru":"Ресурсы"
  },
  "tag":{
      "en":"Tag",
      "ru":"Тег"
  },
  "deleteoradd":{
      "en":"Delete or Add",
      "ru":"Удаление или добавление"
  },
  "time":{
      "en":"Time",
      "ru":"Время"
  },
  "date":{
      "en":"Date",
      "ru":"Дата"
  },
  "greeting":{
      "en":"Greeting",
      "ru":"Приветствие"
  },
  "quote":{
      "en":"Quote",
      "ru":"Цитата"
  },
  "weather":{
      "en":"Weather",
      "ru":"Погода"
  },
  "audio":{
      "en":"Audio",
      "ru":"Аудио"
  },
  "links":{
      "en":"Links",
      "ru":"Ссылки"
  },
  "name":{
      "en":"[Enter name]",
      "ru":"[Введите свое имя]"
  }
}

const select = document.querySelector('select'),
      allLang=['en','ru'],
      enLang=document.querySelector('.l-en'),
      ruLang=document.querySelector('.l-ru');

select.addEventListener('change',changeURLLanguage);

function changeURLLanguage(){
  let lang = select.value;
  location.href=window.location.pathname+"#"+lang; 
  location.reload();
}

enLang.addEventListener('click',()=>{
  select.value='en';
  changeURLLanguage();
  changeLanguage();
})
ruLang.addEventListener('click',()=>{
  select.value='ru';
  changeURLLanguage();
  changeLanguage();
})
function changeLanguage(){
  let hash=window.location.hash;
  hash=hash.substring(1);
  if(!allLang.includes(hash)){
    location.href=window.location.pathname+"#en"; 
    location.reload();
  }
  console.log(hash);
  select.value=hash;
  document.querySelector('.l-'+'name').placeholder=langArr['name'][hash];
  for (let key in langArr){
    document.querySelector('.l-'+key).innerHTML=langArr[key][hash];
  }
  if(hash==='en'){
    ruLang.classList.remove('red');
    enLang.classList.add('red');
  }else if(hash==='ru'){
    ruLang.classList.add('red');
    enLang.classList.remove('red');
  }
}
changeLanguage();


//Links

const newLink=document.querySelector('.links-new'),
      links=document.querySelector('.links'),
      linksItems=document.querySelectorAll('.links-list-item'),
      linksAdd=document.querySelector('.links-add'),
      linkPress=document.querySelector('.links-press'),
      linksList=document.querySelector('.links-list'),
      arrow=document.querySelector('.arrow-back'),
      linkButton=document.querySelector('.links-button'),
      inputName=document.querySelector('.links-name'),
      inputLinks=document.querySelector('.links-link'),
      deleteLink=document.querySelectorAll('.trash');

linkPress.addEventListener('click',()=>{
  if(links.classList.contains('hide')){
  links.classList.remove('hide');
  links.classList.add('show');
  }else if(links.classList.contains('show')){
    links.classList.remove('show');
    links.classList.add('hide');
  }
})

newLink.addEventListener('click',()=>{
  links.classList.remove('show');
  links.classList.add('hide');
  linksAdd.classList.remove('hide');
  linksAdd.classList.add('show');
})
function showList(){
    links.classList.remove('hide');
    links.classList.add('show');
    linksAdd.classList.remove('show');
    linksAdd.classList.add('hide');
}
arrow.addEventListener('click',showList);




let counter = parseInt(localStorage.getItem("counter")) || 0;
localStorage.setItem("counter", counter);

linkButton.addEventListener('click',()=>{
  
  if(inputName.value!=="" && inputLinks.value!==""){
    const trash=document.createElement('span');
    trash.innerHTML='<img class="trash" height="20px" width="20px" src="assets/img/trash.svg" alt="">';
    trash.addEventListener("click", function() {
      this.parentNode.remove();
    });
    let li=document.createElement('li');
    let a=document.createElement('a');
    let href=inputLinks.value;
    a.href=href;
    a.textContent=inputName.value;
    console.log(a);
    console.log(a.outerHTML);
    li.append(a);
    li.append(trash);
    console.log(a.outerHTML+'<img class="trash" height="20px" width="20px" src="assets/img/trash.svg" alt="">');
    localStorage.setItem('li'+localStorage.getItem('counter'), a.outerHTML+'<img class="trash" height="20px" width="20px" src="assets/img/trash.svg" alt="">');
    linksList.append(li);
    inputLinks.value='';
    inputName.value='';
    showList();
    counter += 1;
    localStorage.setItem("counter", counter);
  }
})



for(let i=0;i<localStorage.getItem('counter');i++){
  let li=document.createElement('li');
  li.innerHTML=localStorage.getItem('li'+i)
  linksList.append(li);
}

deleteLink.forEach(item=>{
  item.addEventListener('click',deleteItem);
})

function deleteItem() {
  let parent = this.parentNode;
  parent.parentNode.removeChild(parent);
}