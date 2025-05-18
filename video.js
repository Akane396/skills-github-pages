  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");

  fetch("struktura.json")  // Učitaj JSON podatke
    .then(res => res.json())
    .then(data => {
      const anime = data.find(a => a.id === id); // Pronađi anime po ID-u
      if (!anime) {
        document.getElementById("anime-detalji").innerHTML = "Anime nije pronađen.";
        return;
      }

      // Ispuni osnovne informacije o animeu
      document.getElementById("naslov").textContent = anime.naziv;
      document.getElementById("slika").src = anime.slika;
      document.getElementById("opis").textContent = anime.opis;
 
document.getElementById('sazona').innerHTML = `Sazona: <span style="color:#B81F1F">${anime.sazona}</span>`;
document.getElementById('tip').innerHTML = `Tip: <span style="color:#B81F1F">${anime.tip}</span>`;
document.getElementById('br_ep').innerHTML = `Br. epizoda: <span style="color:#B81F1F">${anime["broj.ep"]}</span>`;
document.getElementById('prevo').innerHTML = `Prevodioc: <span style="color:#B81F1F">${anime.prevodioc}</span>`;
document.getElementById('izvor').innerHTML = `Izvor: <span style="color:#B81F1F">${anime.izvor}</span>`;

document.getElementById('datum').innerHTML = `Datum: <span style="color:#B81F1F">${anime.datum}</span>`;
document.getElementById('status').innerHTML = `Status: <span style="color:#B81F1F">${anime.status}</span>`;
document.getElementById('studijo').innerHTML = `Studijo: <span style="color:#B81F1F">${anime.studijo}</span>`;
document.getElementById('st_prevod').innerHTML = `St.prevođenja: <span style="color:#B81F1F">${anime.stprevođenja}</span>`;

const zanroviHTML = anime.zanrovi.map(zanr => `<span class="zanr-tag">${zanr}</span>`).join(" ");
document.getElementById('zanrovi').innerHTML = zanroviHTML;


      const video = document.getElementById("video");
      const videoSrc = document.getElementById("video-src");
      const lista = document.getElementById("lista-epizoda");

      // Podesi početni video
      videoSrc.src = anime.epizode[0].video;
      video.load();

      // Ispisivanje epizoda
      anime.epizode.forEach(ep => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "#";
        a.textContent = ep.broj;
        a.addEventListener("click", () => {
          // Promena video URL-a kada se klikne na epizodu
          videoSrc.src = ep.video;
          video.load();
          video.play();
        });
        li.appendChild(a);
        lista.appendChild(li);
      });
    })
    .catch(error => console.error('Greška pri učitavanju JSON-a:', error));
    
const menuIcon = document.getElementById('menu-icon');
const menu = document.getElementById('menu');
const overlay = document.getElementById('overlay');
const vrati = document.getElementById('vrati')

vrati.addEventListener('click' , () => {
	menu.classList.remove('open');
	menuIcon.classList.remove('open');
	overlay.classList.remove('open');
})

menuIcon.addEventListener('click', () => {
	menuIcon.classList.toggle('open');
	menu.classList.toggle('open');
	overlay.classList.toggle('open');
});

overlay.addEventListener('click', () => {
	menu.classList.remove('open');
	menuIcon.classList.remove('open');
	overlay.classList.remove('open');
});

function toggleSearch() {
	const searchBox = document.getElementById("searchBox");
	if (searchBox.style.display === "none" || searchBox.style.display === "") {
		searchBox.style.display = "block";
		document.getElementById("searchInput").focus();
	} else {
		searchBox.style.display = "none";
	}
}

function search() {
	const value = document.getElementById("searchInput").value.toLowerCase();

	fetch("struktura.json")
		.then(res => res.json())
		.then(data => {
			const anime = data.find(a => a.naziv.toLowerCase() === value);

			if (anime) {
				// Preusmjeri na detaljnu stranicu
				window.location.href = `videi.html?id=${anime.id}`;
			} else {
				alert("H/Anime nije pronađen.");
			}
		})
		.catch(error => console.error("Greška pri učitavanju JSON-a:", error));
}

