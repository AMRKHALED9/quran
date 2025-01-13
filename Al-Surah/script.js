let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let num = parseInt(urlParams.get('num')); 
let surah = document.getElementById('surah');

fetch(`https://api.alquran.cloud/v1/surah/${num}`)
  .then(res => res.json())
  .then(res => {
    console.log(res);

    if (res.data) {
      let surahData = res.data;

      surah.innerHTML += `
        <h3 class="name">
          <i class="fa-solid fa-book-quran fa-beat icon"></i> ${surahData.englishName} (${surahData.name})
        </h3>
        <div class="surah-info container-fluid">
          <div class ="row">
            <h4 class="info">
            <i class="fa-solid fa-list-ul icon" style="color: #DC5F00;"></i> معلومات حول السورة
            </h4>
            <hr>
              <div class ="col-lg-4 col-md-6 col-sm-12">
                <p>نوع السورة: ${surahData.revelationType === "Meccan" ? "مكية" : "مدنية"}</p>
              </div>
              <div class ="col-lg-4 col-md-6 col-sm-12" >
                <p>رقم السورة: ${surahData.number}</p>
              </div>
              <div class ="col-lg-4 col-md-6 col-sm-12" >
                <p>عدد الآيات: ${surahData.numberOfAyahs}</p>
              </div>
            </div>
        </div>
        <div>
          <a href="../index.html" class ="index">الفهرس</a>
        </div>
      `;
      document.title = `${surahData.name}`

      if (surahData.ayahs && surahData.ayahs.length > 0) {
        let ayahs = surahData.ayahs;
        let ayahsText = ""; 

        if (ayahs[0].text.includes("بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ")) {
          ayahs[0].text = ayahs[0].text.replace("بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ", "").trim();
        }

        ayahs.forEach((ayah, i) => {
          if (ayah.text.trim() !== "") {
            if (res.data.number === 1){
              ayahsText += `${ayah.text} (${i}) `;
            }
            else{
              ayahsText += `${ayah.text} (${i + 1}) `;
            }
          }
        });

        if (res.data.number != 9){
          surah.innerHTML += `
          <img src="Assets/basmala.png" alt="" class="image">
          <div class="ayat">
            <span>${ayahsText}</span>
          </div>
          `;
        }
        else{
          surah.innerHTML += `
          <div class="ayat">
            <span>${ayahsText}</span>
          </div>
          `;
        }
        
      }


    
      let nextSurahNum = num + 1;  
      if (nextSurahNum <= 114) {  
        fetch(`https://api.alquran.cloud/v1/surah/${nextSurahNum}`)
          .then(response => response.json())
          .then(nextSurahRes => {
            if (nextSurahRes.data) {
              let nextSurahName = nextSurahRes.data.name;
              let nextSurahLink = `?num=${nextSurahNum}`;
              surah.innerHTML += `
                <div class="next-surah">
                  <a href="${nextSurahLink}" class="next-surah-link">
                    السورة التالية: ${nextSurahName}
                  </a>
                </div>
              `;
            }
          });
      }
    }
  })

