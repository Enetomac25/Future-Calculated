let toggleBtn = document.getElementById('toggle-btn');
let body = document.body;
let darkMode = localStorage.getItem('dark-mode');

const enableDarkMode = () =>{
   toggleBtn.classList.replace('fa-sun', 'fa-moon');
   body.classList.add('dark');
   localStorage.setItem('dark-mode', 'enabled');
}

const disableDarkMode = () =>{
   toggleBtn.classList.replace('fa-moon', 'fa-sun');
   body.classList.remove('dark');
   localStorage.setItem('dark-mode', 'disabled');
}

if(darkMode === 'enabled'){
   enableDarkMode();
}

toggleBtn.onclick = (e) =>{
   darkMode = localStorage.getItem('dark-mode');
   if(darkMode === 'disabled'){
      enableDarkMode();
   }else{
      disableDarkMode();
   }
}

let profile = document.querySelector('.header .flex .profile');

document.querySelector('#user-btn').onclick = () =>{
   profile.classList.toggle('active');
   search.classList.remove('active');
}

let search = document.querySelector('.header .flex .search-form');

document.querySelector('#search-btn').onclick = () =>{
   search.classList.toggle('active');
   profile.classList.remove('active');
}

let sideBar = document.querySelector('.side-bar');

document.querySelector('#menu-btn').onclick = () =>{
   sideBar.classList.toggle('active');
   body.classList.toggle('active');
}

document.querySelector('#close-btn').onclick = () =>{
   sideBar.classList.remove('active');
   body.classList.remove('active');
}

window.onscroll = () =>{
   profile.classList.remove('active');
   search.classList.remove('active');

   if(window.innerWidth < 1200){
      sideBar.classList.remove('active');
      body.classList.remove('active');
   }
}

// 

   /*Dropdwn Menu*/
   $(document).ready(function() {
         $('.dropdwn').click(function () {
            $(this).toggleClass('active');
            $(this).find('.dropdwn-menu').slideToggle(300);
         });
         
         $('.dropdwn-menu li').click(function () {
            var selectedOption = $(this).text();
            $(this).closest('.dropdwn').find('.select span').text(selectedOption);
            $(this).closest('.dropdwn').find('input').val(selectedOption);
            
         });
         $('.dropdwn-marks').click(function () {
            $(this).toggleClass('active');
            $(this).find('.dropdwn-menu-marks').slideToggle(300);
         });
         
         $('.dropdwn-menu-marks li').click(function () {
            var selectedOption = $(this).text();
            $(this).closest('.dropdwn-marks').find('.select span').text(selectedOption);
            $(this).closest('.dropdwn-marks').find('input').val(selectedOption);

            
         });
   });

   globalThis.level = [];
   document.addEventListener('DOMContentLoaded', function () {
         const dropdwnMarks = document.querySelectorAll('.dropdwn-menu-marks');
         
         // Define a mapping of mark ranges to level values
         const markToLevel = {
            "0% - 29%": 1,
            "30% - 39%": 2,
            "40% - 49%": 3,
            "50% - 59%": 4,
            "60% - 69%": 5,
            "70% - 79%": 6,
            "80% - 100%": 7
         };

         dropdwnMarks.forEach(function (dropdwnMenu, dropdwnIndex) {
            dropdwnMenu.addEventListener('click', function (event) {
               const selectedMark = event.target.innerText.trim();
               const parentDiv = event.target.closest('.select_wrap');
               const markInput = parentDiv.querySelector('input[type="hidden"]');
               const levelValue = parseInt(markToLevel[selectedMark]);

               // Assign the level value based on the selected mark at the specific index
               globalThis.level[dropdwnIndex] = levelValue;

            });
         });

   });
   document.addEventListener('DOMContentLoaded', function () {
         const dropdwnSubjects = document.querySelectorAll('.dropdwn-menu');
         let subjectArr = [];

         dropdwnSubjects.forEach(function (dropdwnMenu, dropdwnIndex) {
            dropdwnMenu.addEventListener('click', function (event) {
               const selectedSubj = event.target.innerText.trim();
               const parentDiv = event.target.closest('.dropdwn');
               const subjInput = parentDiv.querySelector('input[type="hidden"]').value;

               // Assign the subject value based on the selected subject at the specific index
               subjectArr[3] = "Life Orientation";
               subjectArr[dropdwnIndex] = subjInput;

            });
         });
         const calcApsButton = document.getElementById('calculate-aps');
         calcApsButton.addEventListener('click', function(){
            if (subjectArr.length != 7) {
               alert("Error! Please select all subjects taken.")
            }
            else if (globalThis.level.length != 7) {
               alert("Error! Please select marks% obtained for all subjects.")
            } else {
               let totalAPS = 0;
               for (let i = 0; i < globalThis.level.length; i++) {
                     totalAPS += globalThis.level[i];
               }
               //alert("Subjects Selected: " + subjectArr.join(', ') + totalAPS);
               document.getElementById('totalAPS').value = totalAPS;
               alert("Your Aps Score: " + totalAPS)
               
            }
         });
            
   });
   

   