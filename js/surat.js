function getURL(e){
    const pageURL= window.location.search.substring(1);
    const urlVariable = pageURL.split('&');

    for(let i = 0; i < urlVariable.length; i++){
        const parameterName = urlVariable[i].split('=');
        if(parameterName[0] == e ){
            return parameterName[1];
        }
    }
}
const nomorsurat = getURL('nomorsurat');
// console.log(nomorsurat);

function getSurat(){
    fetch(`https://equran.id/api/surat/${nomorsurat}`)
    .then(Response => Response.json())
    .then(Response => {
        // title surat
        const titleSurat = document.querySelector('#title-surat')
        titleSurat.textContent = `
        Surat ${Response.nama_latin}
        `

        // judul surat start
        const judulSurat = document.querySelector('.judul-surat');
        const cardJudulSurat = `
        <strong>${Response.nama_latin} <br>${Response.nama}</strong>
                      <p>Jumlah Ayat : ${Response.jumlah_ayat} <br>Arti : ${Response.arti}</p>
                      <button class="btn btn-success audio-button-play">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                    </svg>
                        Play
                    </button>
                    <button class="btn btn-danger audio-button-pause hidden-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stop-fill" viewBox="0 0 16 16">
                    <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"/>
                  </svg>
                        Stop
                    </button>
                    <audio id="audio-tag" src="${Response.audio}"></audio>                    
                    `;
                    judulSurat.innerHTML=cardJudulSurat
                    // judul surat end

                    // isi surat
                    const surat = Response.ayat;
                    let isiSurat = '';
                    surat.forEach(s => {
                        isiSurat+=`
                        <div class="card mb-3">
                    <div class="card-body">
                      <p>${s.nomor}.</p>
                      <h3 class="text-end">${s.ar}</h3>
                      <p><br>'${s.tr}'</p>
                      <p>"${s.idn}"</p>
                    </div>
                  </div>                       
                        `;
                    });

                    const cardIsiSurat = document.querySelector('.card-isi-surat')
                    cardIsiSurat.innerHTML=isiSurat;
                    // play and pause
                    const buttonPlay = document.querySelector('.audio-button-play');
                    const buttonPause = document.querySelector('.audio-button-pause');
                    const audioSurat = document.querySelector('#audio-tag');

                    // play
                    buttonPlay.addEventListener('click', function(){
                        audioSurat.play();
                    });

                    //pause
                    buttonPause.addEventListener('click', function(){
                        audioSurat.pause();
                    });
    });
}
getSurat();