const cardContainer = document.querySelector(".main");

async function getData() {
  // fetch podataka sa zadate adrese
  const response = await fetch(
    "https://services.brid.tv/services/get/latest/26456/0/1/25/0.json"
  );
  const data = await response.json();

  console.log(data);
  console.log(data.Video[0]);

  // prolazenje kroz podatke i pravljenje kartica za svaki element
  for (const item of data.Video) {
    // pravljenje elementa div koji ce predstavljati karticu
    const card = document.createElement("div");
    card.classList.add("Item");
    const title = document.createElement("h2");
    title.textContent = item.name;

    const link = document.createElement("a");
    link.href = item.source.hd;

    const image = document.createElement("img");
    image.src = item.snapshots.sd;

    link.append(image, title);

    card.append(link);

    function pretvori(time) {
      const h = Math.trunc(time / 3600);
      const m = Math.trunc((time % 3600) / 60);
      const s = time - (h * 3600 + m * 60);

      const mm = m < 10 ? `0${m}` : m;
      const ss = s < 10 ? `0${s}` : s;

      return `0${h}:${mm}:${ss}`;
    }

    // pravljenje paragrafa za prikaz trajanja videa

    const duration = document.createElement("p");
    duration.textContent = pretvori(Number(item.duration));

    card.append(duration);

    cardContainer.prepend(card);
  }
}

// pozivanje funkcije za kreiranje kartica i dobavljanje svih podataka
getData();
