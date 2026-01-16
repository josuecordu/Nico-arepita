document.addEventListener("DOMContentLoaded", () => {

/* =========================
   NAVEGACIÓN PÁGINAS
========================= */
const pages = document.querySelectorAll('.page');
function showPage(n){
  pages.forEach(p => p.classList.remove('active'));
  pages[n].classList.add('active');
}
window.showPage = showPage;

/* =========================
   FAVORITOS
========================= */
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function toggleFavorite(i){
  const heart = document.querySelector(`.page[data-page="${i}"] .favorite`);
  if(favorites.includes(i)){
    favorites = favorites.filter(f => f !== i);
    heart.classList.remove("active");
  } else {
    favorites.push(i);
    heart.classList.add("active");
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
}
window.toggleFavorite = toggleFavorite;

favorites.forEach(i => {
  const h = document.querySelector(`.page[data-page="${i}"] .favorite`);
  if(h) h.classList.add("active");
});

/* =========================
   MÚSICA
========================= */
const songs = [
  { file: "Combustión - Jósean Log(MP3_160K).mp3" },
  { file: "Diego Luna - Te Amo Y Más (Letra)(MP3_160K).mp3" },
  { file: "el libro de la vida - No Matter Where You Are _ letra en español(MP3_160K).mp3" },
  { file: "En las danzas y en los sueños - Estoico _ Valka (Cómo Entrenar a Tu Dragón 2)  _ _Letra_(M4A_128K).m4a" },
  { file: "Enanitos Verdes - Mariposas(MP3_160K).mp3" },
  { file: "Frances Limon(MP3_160K).mp3" },
  { file: "Glup_ -  Freebola (Video Oficial Remasterizado)(MP3_160K).mp3" },
  { file: "Hombres G - Si no te tengo a ti (Audio Oficial)(MP3_160K).mp3" },
  { file: "Igual Que Ayer(MP3_160K).mp3" },
  { file: "Jósean Log - Jacaranda (lyric video)(MP3_160K).mp3" },
  { file: "Jósean Log - Pruébame a Ti (video oficial)(MP3_160K).mp3" },
  { file: "Jósean Log - Si Hay Algo (video oficial)(MP3_160K).mp3" },
  { file: "León - Como Tú (video oficial con letra)(MP3_160K).mp3" },
  { file: "Mon Laferte - Amárrame ft. Juanes(MP3_160K).mp3" },
  { file: "Mon Laferte - Amor Completo(MP3_160K).mp3" },
  { file: "Química Mayor(MP3_160K).mp3" },

  /* 🎵 NEW */
  { file: "Bonita (Bonus Track)(MP3_160K)_1.mp3", isNew: true },
  { file: "La Gloria Eres Tu(MP3_160K).mp3", isNew: true }
];

const audio = document.getElementById("audio");
const songName = document.getElementById("songName");
const playlist = document.getElementById("playlist");
const playBtn = document.getElementById("playBtn");

let index = 0;
let shuffle = false;

function cleanName(name){
  return name.replace(/\(.*?\)|\.mp3|\.m4a/gi, "").trim();
}

/* =========================
   CREAR PLAYLIST
========================= */
playlist.innerHTML = "";

songs.forEach((song, i) => {
  const item = document.createElement("div");
  item.className = "song-item";
  item.onclick = () => {
    index = i;
    loadSong();
  };

  const title = document.createElement("span");
  title.textContent = cleanName(song.file);
  item.appendChild(title);

  if(song.isNew){
    const badge = document.createElement("span");
    badge.className = "new-badge";
    badge.textContent = "NEW"; // 🔴 CAMBIO AQUÍ
    item.appendChild(badge);
  }

  playlist.appendChild(item);
});

/* =========================
   CONTROLES
========================= */
function loadSong(){
  audio.src = songs[index].file;
  songName.textContent = cleanName(songs[index].file);
  audio.play();
  playBtn.innerHTML = '<i class="fa-solid fa-stop"></i>';
}

function togglePlay(){
  if(audio.paused){
    audio.play();
    playBtn.innerHTML = '<i class="fa-solid fa-stop"></i>';
  } else {
    audio.pause();
    playBtn.innerHTML = '<i class="fa-regular fa-circle-play"></i>';
  }
}

function nextSong(){
  index = shuffle
    ? Math.floor(Math.random() * songs.length)
    : (index + 1) % songs.length;
  loadSong();
}

function prevSong(){
  index = (index - 1 + songs.length) % songs.length;
  loadSong();
}

function toggleShuffle(){
  shuffle = !shuffle;
}

function togglePlaylist(){
  playlist.style.display =
    playlist.style.display === "block" ? "none" : "block";
}

/* =========================
   PROGRESO
========================= */
audio.ontimeupdate = () => {
  const bar = document.querySelector(".progress");
  if(audio.duration){
    bar.max = audio.duration;
    bar.value = audio.currentTime;
  }
};

document.querySelector(".progress").oninput = e => {
  audio.currentTime = e.target.value;
};

/* =========================
   EXPONER FUNCIONES
========================= */
window.togglePlay = togglePlay;
window.nextSong = nextSong;
window.prevSong = prevSong;
window.toggleShuffle = toggleShuffle;
window.togglePlaylist = togglePlaylist;

/* =========================
   INICIO
========================= */
loadSong();

});
