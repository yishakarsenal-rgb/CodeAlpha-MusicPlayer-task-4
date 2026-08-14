document.addEventListener("DOMContentLoaded", () => {
  const songs = [
    // Acoustic & Chill
    {
      title: "Acoustic Morning",
      artist: "SoundHelix",
      category: "Acoustic",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      cover:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800",
    },
    {
      title: "Sunset Strings",
      artist: "SoundHelix",
      category: "Acoustic",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      cover:
        "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800",
    },
    {
      title: "Gentle Breeze",
      artist: "SoundHelix",
      category: "Acoustic",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      cover:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    },

    // Electronic & Synthwave
    {
      title: "Cyber Pulse",
      artist: "SoundHelix",
      category: "Electronic",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      cover: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
    },
    {
      title: "Neon Drive",
      artist: "SoundHelix",
      category: "Electronic",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
      cover:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    },
    {
      title: "Digital Horizon",
      artist: "SoundHelix",
      category: "Electronic",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
      cover:
        "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800",
    },

    // Cinematic & Ambient
    {
      title: "Deep Ambient",
      artist: "SoundHelix",
      category: "Ambient",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
      cover:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
    },
    {
      title: "Space Drift",
      artist: "SoundHelix",
      category: "Ambient",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
      cover:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
    },
    {
      title: "Atmospheric Echoes",
      artist: "SoundHelix",
      category: "Ambient",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
      cover:
        "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=800",
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

  function loadSong(song) {
    trackTitle.textContent = song.title;
    trackArtist.textContent = song.artist;
    coverArt.src = song.cover;
    audio.src = song.src;
    updatePlaylistHighlight();
  }

  function playSong() {
    isPlaying = true;
    playBtn.innerHTML = "&#10074;&#10074;"; // Pause icon
    audio.play();
  }

  function pauseSong() {
    isPlaying = false;
    playBtn.innerHTML = "&#9654;"; // Play icon
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
    playSong();
  });

  nextBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
  });

  // Time & Progress Formatting
  function formatTime(seconds) {
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
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
  });

  volumeBar.addEventListener("input", (e) => {
    audio.volume = e.target.value / 100;
  });

  // Playlist Rendering
  function renderPlaylist() {
    playlistEl.innerHTML = "";
    songs.forEach((song, index) => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${song.title}</span><small>${song.artist}</small>`;
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

  // Initial Setup
  renderPlaylist();
  loadSong(songs[currentSongIndex]);
});
