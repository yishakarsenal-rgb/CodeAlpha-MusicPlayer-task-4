document.addEventListener("DOMContentLoaded", () => {
  // Local audio paths mapped to your exact downloaded filenames
  const songs = [
    // Acoustic & Chill
    {
      title: "Acoustic Morning",
      artist: "Acoustic",
      category: "Acoustic",
      src: "audio/SoundHelix-Song-1.mp3",
      cover:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&q=70",
    },
    {
      title: "Sunset Strings",
      artist: "Acoustic",
      category: "Acoustic",
      src: "audio/SoundHelix-Song-2.mp3",
      cover:
        "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=300&q=70",
    },
    {
      title: "Gentle Breeze",
      artist: "Acoustic",
      category: "Acoustic",
      src: "audio/SoundHelix-Song-3.mp3",
      cover:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&q=70",
    },

    // Electronic & Synthwave
    {
      title: "Cyber Pulse",
      artist: "Electronic",
      category: "Electronic",
      src: "audio/SoundHelix-Song-4.mp3",
      cover:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=300&q=70",
    },
    {
      title: "Neon Drive",
      artist: "Electronic",
      category: "Electronic",
      src: "audio/SoundHelix-Song-5.mp3",
      cover:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=70",
    },
    {
      title: "Digital Horizon",
      artist: "Electronic",
      category: "Electronic",
      src: "audio/SoundHelix-Song-6.mp3",
      cover:
        "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&q=70",
    },

    // Cinematic & Ambient
    {
      title: "Deep Ambient",
      artist: "Ambient",
      category: "Ambient",
      src: "audio/SoundHelix-Song-7.mp3",
      cover:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&q=70",
    },
    {
      title: "Space Drift",
      artist: "Ambient",
      category: "Ambient",
      src: "audio/SoundHelix-Song-8.mp3",
      cover:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&q=70",
    },
    {
      title: "Atmospheric Echoes",
      artist: "Ambient",
      category: "Ambient",
      src: "audio/SoundHelix-Song-9.mp3",
      cover:
        "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=300&q=70",
    },
  ];

  const audio = document.getElementById("audio-player");
  const playBtn = document.getElementById("play-btn");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const trackTitle = document.getElementById("track-title");
  const trackArtist = document.getElementById("track-artist");
  const coverArt = document.getElementById("cover-art");
  const progressBar = document.getElementById("progress-bar");
  const currentTimeEl = document.getElementById("current-time");
  const totalDurationEl = document.getElementById("total-duration");
  const volumeBar = document.getElementById("volume-bar");
  const playlistEl = document.getElementById("playlist");

  let currentSongIndex = 0;
  let isPlaying = false;

  audio.preload = "auto";

  function loadSong(song) {
    trackTitle.textContent = song.title;
    trackArtist.textContent = song.artist;
    coverArt.src = song.cover;
    audio.src = song.src;
    updatePlaylistHighlight();
  }

  function playSong() {
    isPlaying = true;
    playBtn.innerHTML = "&#10074;&#10074;";

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.warn("Playback error:", error);
      });
    }
  }

  function pauseSong() {
    isPlaying = false;
    playBtn.innerHTML = "&#9654;";
    audio.pause();
  }

  playBtn.addEventListener("click", () => {
    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  });

  prevBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    if (isPlaying) playSong();
  });

  nextBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    if (isPlaying) playSong();
  });

  function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }

  audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
      const progressPercent = (audio.currentTime / audio.duration) * 100;
      progressBar.value = progressPercent;
      currentTimeEl.textContent = formatTime(audio.currentTime);
      totalDurationEl.textContent = formatTime(audio.duration);
    }
  });

  progressBar.addEventListener("input", () => {
    if (audio.duration) {
      const seekTime = (progressBar.value / 100) * audio.duration;
      audio.currentTime = seekTime;
    }
  });

  volumeBar.addEventListener("input", (e) => {
    audio.volume = e.target.value / 100;
  });

  function renderPlaylist() {
    playlistEl.innerHTML = "";
    songs.forEach((song, index) => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${song.title}</span><small>${song.category}</small>`;
      li.addEventListener("click", () => {
        currentSongIndex = index;
        loadSong(songs[currentSongIndex]);
        playSong();
      });
      playlistEl.appendChild(li);
    });
  }

  function updatePlaylistHighlight() {
    const items = playlistEl.querySelectorAll("li");
    items.forEach((item, index) => {
      if (index === currentSongIndex) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  audio.addEventListener("ended", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
  });

  renderPlaylist();
  loadSong(songs[currentSongIndex]);
});
