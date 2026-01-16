/* NAVEGACIÓN PÁGINAS */
const pages=document.querySelectorAll('.page');
function showPage(n){
  pages.forEach(p=>p.classList.remove('active'));
  pages[n].classList.add('active');
}

/* FAVORITOS */
let favorites=JSON.parse(localStorage.getItem("favorites"))||[];
function toggleFavorite(i){
  const heart=document.querySelector(`.page[data-page="${i}"] .favorite`);
  if(favorites.includes(i)){
    favorites=favorites.filter(f=>f!==i);
    heart.classList.remove("active");
  }else{
    favorites.push(i);
    heart.classList.add("active");
  }
  localStorage.setItem("favorites",JSON.stringify(favorites));
}
favorites.forEach(i=>{
  const h=document.querySelector(`.page[data-page="${i}"] .favorite`);
  if(h)h.classList.add("active");
});

/* MÚSICA */
const songs=[
"Combustión - Jósean Log(MP3_160K).mp3",
"Diego Luna - Te Amo Y Más (Letra)(MP3_160K).mp3",
"el libro de la vida - No Matter Where You Are _ letra en español(MP3_160K).mp3",
"En las danzas y en los sueños - Estoico _ Valka (Cómo Entrenar a Tu Dragón 2)  _ _Letra_(M4A_128K).m4a",
"Enanitos Verdes - Mariposas(MP3_160K).mp3",
"Frances Limon(MP3_160K).mp3",
"Glup_ -  Freebola (Video Oficial Remasterizado)(MP3_160K).mp3",
"Hombres G - Si no te tengo a ti (Audio Oficial)(MP3_160K).mp3",
"Igual Que Ayer(MP3_160K).mp3",
"Jósean Log - Jacaranda (lyric video)(MP3_160K).mp3",
"Jósean Log - Pruébame a Ti (video oficial)(MP3_160K).mp3",
"Jósean Log - Si Hay Algo (video oficial)(MP3_160K).mp3",
"León - Como Tú (video oficial con letra)(MP3_160K).mp3",
"Mon Laferte - Amárrame ft. Juanes(MP3_160K).mp3",
"Mon Laferte - Amor Completo(MP3_160K).mp3",
"Química Mayor(MP3_160K).mp3",
"Bonita (Bonus Track)(MP3_160K)_1.mp3"
];

const audio=document.getElementById("audio");
const songName=document.getElementById("songName");
const playlist=document.getElementById("playlist");
const playBtn=document.getElementById("playBtn");
let index=0;
let shuffle=false;

function cleanName(n){
  return n.replace(/\(.*?\)|\.mp3|\.m4a/gi,"").trim();
}

songs.forEach((s,i)=>{
  const div=document.createElement("div");
  div.textContent=cleanName(s);
  div.onclick=()=>{index=i;loadSong();}
  playlist.appendChild(div);
});

function loadSong(){
  audio.src=songs[index];
  songName.textContent=cleanName(songs[index]);
  audio.play();
  playBtn.innerHTML='<i class="fa-solid fa-stop"></i>';
}

function togglePlay(){
  if(audio.paused){
    audio.play();
    playBtn.innerHTML='<i class="fa-solid fa-stop"></i>';
  }else{
    audio.pause();
    playBtn.innerHTML='<i class="fa-regular fa-circle-play"></i>';
  }
}

function nextSong(){
  index = shuffle ? Math.floor(Math.random()*songs.length) : (index+1)%songs.length;
  loadSong();
}

function prevSong(){
  index=(index-1+songs.length)%songs.length;
  loadSong();
}

function toggleShuffle(){shuffle=!shuffle;}

function togglePlaylist(){
  playlist.style.display=playlist.style.display==="block"?"none":"block";
}

/* BARRA DE PROGRESO */
audio.ontimeupdate=()=>{
  if(audio.duration){
    const progressBar=document.querySelector(".progress");
    progressBar.max=audio.duration;
    progressBar.value=audio.currentTime;
  }
};
document.querySelector(".progress").oninput=(e)=>{
  audio.currentTime=e.target.value;
};

/* CARGAR PRIMERA CANCIÓN */
loadSong();
