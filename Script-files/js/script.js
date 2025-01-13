
fetch('https://api.alquran.cloud/v1/surah')
.then(res => res.json())
.then(res => {
console.log(res)
res.data.forEach(surah=>{
    quran.innerHTML +=` 
<div class="index col-sm-12 col-md-6 col-lg-3">
    <a href="./Al-Surah/surah.html?num=${surah.number}"
    class="shadow text-decoration-none">
    <h2 class="name">${surah.name}</h2>
  </a>
</div>
`;
document.title = "Quran"
})

})


