
// Change Background Header In Scroll Wondow
let btnStart = document.querySelector(".title-main-header .btn")
let hadithSection = document.querySelector(".hadith")

let fixedHeader = document.querySelector(".header")
let btnscroll   = document.querySelector(".btnscroll")
window.addEventListener("scroll" , ()=>{

    window.scrollY > 100 ? fixedHeader.classList.add("active"): fixedHeader.classList.remove("active")
    window.scrollY > 400 ? btnscroll.classList.add('active'): btnscroll.classList.remove('active')
})

// Scroll Top
btnscroll.addEventListener('click' , () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
})

let hadithContainer = document.querySelector('.hadith-container'),
    next = document.querySelector(".next"),
    prev = document.querySelector(".prev"),
    number = document.querySelector(".number"),
    hadithIndex = 0;
    hadithViewChange();

   function hadithViewChange(){

    fetch("https://api.hadith.sutanlab.id/books/muslim?range=1-300")
    .then(response => response.json())
    .then(data =>{
        let allHadith = data.data.hadiths;
        // console.log( allHadith[hadithIndex]);

        hadithContainer.innerHTML = allHadith[hadithIndex].arab
        number.innerHTML = 300 + " - " + (hadithIndex + 1)
    });
 

    }


next.addEventListener("click" , ()=>{
   if(hadithIndex == 300){
    hadithIndex = 0
   }else{
    hadithIndex++;
    hadithViewChange();
   }
})

prev.addEventListener("click" , ()=>{
    if(hadithIndex == 0){
     hadithIndex = 300
    }else{
     hadithIndex--;
     hadithViewChange();
    }
 })


 btnStart.addEventListener("click" , ()=>{
    hadithSection.scrollIntoView({
        behavior: "smooth"
    })
 })

 // Links Section

 let sections   = document.querySelectorAll("section"),
    links       = document.querySelectorAll(".header .links-header li");

    links.forEach(link=>{
       
        link.addEventListener("click" , ()=>{
            document.querySelector(".header .links-header li.active").classList.remove("active")
           link.classList.add("active")
           let target = link.dataset.filter
           sections.forEach(section =>{
               if(section.classList.contains(target)){
                section.scrollIntoView({
                    behavior: "smooth"
                })
               }
           })
           
        })
    })

    // Surahs
    let surahsContainer = document.querySelector(".surahs-container")
    getSurahs();
    function getSurahs() {

        let temp = '';
        fetch("http://api.alquran.cloud/v1/meta")
        .then(response => response.json())
        .then(data =>{
            let surahs = data.data.surahs.references
            let numberSurah = 114;
            for (let i = 0; i < numberSurah; i++) {
                temp+=`
            <div class="surah">
                <p>${surahs[i].name}</p>
                <p>${surahs[i].englishName}</p>
            </div>`
            surahsContainer.innerHTML = temp
            }

            let nameSurah       = document.querySelectorAll('.surah')
            let popupContainer  = document.querySelector(".surah-popup")
            let ayatQuran       = document.querySelector('.ayat')
            let closePopup      = document.querySelector('.close-popup i')
            closePopup.addEventListener('click' , ()=>{
                popupContainer.classList.remove("active")
            })
            nameSurah.forEach((title,index)=>{
               
                title.addEventListener("click" , ()=>{

                    fetch(`http://api.alquran.cloud/v1/surah/${index+1}/ar`)
                    .then(response => response.json())
                    .then(data => {
                        // console.log(data.data.ayahs);
                        ayatQuran.innerHTML = ""
                        let ayat = data.data.ayahs;
                        ayat.forEach(aya =>{
                            popupContainer.classList.add("active")
                            ayatQuran.innerHTML += `<p>(${aya.numberInSurah}) - ${aya.text}</p>`
                        })
                    })
                })
            })
        })
      }


      // Get Pray Time
let cards = document.querySelector(".cards")
    function getPrayTime() { 

        fetch("https://api.aladhan.com/v1/timingsByCity?city=Cairo&country=Egypt&method=8")
        .then(response => response.json())
        .then(data => {
            let allPrayTime = data.data.timings;
            cards.innerHTML = ""
            for (let time in allPrayTime) {


                cards.innerHTML += `
                    <div class="card">
                        <div class="circle">
                            <svg>
                                <Circle cx="100" cy="100" r="100"></Circle>
                            </svg>
                            <div class="praytime">${allPrayTime[time]}</div>
                        </div>
                        <p>${time}</p>
                        
                    </div>
                    
                `
            }
        })
     }

     getPrayTime()


     let bars = document.querySelector('.bars')
     let ulHeaderMob = document.querySelector(".header .links-header")
    bars.addEventListener('click', ()=>{
        ulHeaderMob.classList.toggle("active")
    })

    sections.forEach(sec => {
        sec.addEventListener('click' , ()=>{
        
            if(ulHeaderMob.classList.contains("active")){
                ulHeaderMob.classList.remove('active')
            }
        })
    })