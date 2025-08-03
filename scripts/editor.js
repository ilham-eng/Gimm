// Fungsi tambah episode
function addEpisode() {
    const template = document.getElementById('episode-template');
    const clone = template.cloneNode(true);
    clone.classList.remove('d-none');
    
    // Generate ID unik untuk episode baru
    const episodeId = Date.now();
    clone.querySelector('input[name="episode-number"]').value = 
        document.getElementById('episodes-container').children.length + 1;
    
    document.getElementById('episodes-container').appendChild(clone);
}

// Fungsi hapus episode
function removeEpisode(button) {
    button.closest('.episode-card').remove();
    // Update nomor episode
    const episodes = document.querySelectorAll('input[name="episode-number"]');
    episodes.forEach((ep, index) => {
        ep.value = index + 1;
    });
}

// Fungsi simpan data
document.getElementById('anime-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Kumpulkan data anime
    const formData = new FormData(this);
    const animeData = {
        id: Date.now(), // ID unik
        title: formData.get('title'),
        type: formData.get('type'),
        year: formData.get('year') ? parseInt(formData.get('year')) : null,
        poster: formData.get('poster'),
        banner: formData.get('banner'),
        episodes: []
    };

    // Kumpulkan episode
    const episodeCards = document.querySelectorAll('.episode-card:not(.d-none)');
    episodeCards.forEach(card => {
        animeData.episodes.push({
            number: parseInt(card.querySelector('input[name="episode-number"]').value),
            title: card.querySelector('input[name="episode-title"]').value,
            url: card.querySelector('input[name="episode-url"]').value,
            thumbnail: card.querySelector('input[name="episode-thumbnail"]').value
        });
    });

    // Simpan ke GitHub (akan diimplementasikan di github.js)
    saveToGitHub(animeData);
});

// Contoh fungsi simpan ke GitHub
async function saveToGitHub(data) {
    try {
        // Di sini akan memanggil fungsi dari github.js
        alert('Data anime berhasil dibuat!\n\n' + JSON.stringify(data, null, 2));
        console.log('Data yang akan disimpan:', data);
        
        // Reset form setelah simpan
        document.getElementById('anime-form').reset();
        document.getElementById('episodes-container').innerHTML = '';
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Tambah episode pertama saat halaman dimuat
document.addEventListener('DOMContentLoaded', addEpisode);