let myForm= document.querySelector('#my-form');
let siteNameInput = document.querySelector('#siteName');
let siteUrlInput = document.querySelector('#siteUrl');
const searchForm = document.querySelector('#search');

myForm.addEventListener('submit', saveBookMark);
searchForm.addEventListener('keyup', searchBooks);

function saveBookMark(e){
   e.preventDefault();

   let siteName = document.querySelector('#siteName').value;
   let siteUrl = document.querySelector('#siteUrl').value;

   if(!validateForm(siteName, siteUrl)){
      return false;
   }

   let bookMark = {
      siteName: siteName,
      siteUrl: siteUrl
   }

   //save to local Storage
   if(localStorage.getItem('bookMarks') === null){
      let bookMarks = [];
      bookMarks.push(bookMark);
      //You have to use stringify to convert the data into JSON strings when pushing to local storage
      //You have to use parse to convert the data into JSON format when getting data from local storage
      //set item is used to reset any changes in the local storage
      localStorage.setItem('bookMarks', JSON.stringify(bookMarks));
   }else{
      //else, if there's a data from the local storage,
      let bookMarks = JSON.parse(localStorage.getItem('bookMarks'));
      //Take the bookMarks list from local storage that has been parsed and push the current data
      bookMarks.push(bookMark);

      localStorage.setItem('bookMarks', JSON.stringify(bookMarks));
   }

   fetchBookMarks();
}

function deleteBookMark(url){
   let bookMarks = JSON.parse(localStorage.getItem('bookMarks'));

   for(let i=0; i < bookMarks.length; i++){
      if(bookMarks[i].siteUrl == url){
         bookMarks.splice(i , 1);
      }
   }

   localStorage.setItem('bookMarks', JSON.stringify(bookMarks));

   fetchBookMarks();
}

function validateForm(siteName, siteUrl){

   if(!siteName || !siteUrl){
      alert('Please fill in all required fields');
      return false;
   }

   //regex syntax to validate a url
   var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
   var regex = new RegExp(expression);

   if (siteUrl.match(regex)) {

   } else {
      alert("Invalid Url");
      return false;
   }

   return true;
}

//takes care of the UI
function fetchBookMarks(){
   let bookMarks = JSON.parse(localStorage.getItem('bookMarks'));
   let ul = document.querySelector('.item-list ul');
   
   ul.innerHTML = ``;
   for(let i =0; i<bookMarks.length; i++){

      let siteName = bookMarks[i].siteName;
      let siteUrl = bookMarks[i].siteUrl;

      ul.innerHTML += `
         <li>
            <span class="siteName">${siteName}</span>
            <div class="actions">
               <span>
                  <a href="${siteUrl}" class="btn btn-site" target="_blank">Visit Site</a>
               </span>
               <span onclick="deleteBookMark(\'${siteUrl}\')" class="btn btn-delete">Remove</span>
            </div>
         </li>
            `
      siteNameInput.value = '';
      siteUrlInput.value = '';

   }
}

function searchBooks(){
   const input = document.querySelector('#search input').value.toLowerCase();
   let ul = document.querySelector('.item-list ul');
   let bookLists = ul.querySelectorAll('li');

   bookLists.forEach(bookList=> {
      const title = bookList.firstElementChild.textContent;
      
      //if the input value has an index inside the title
      //-1 returns false so !== -1 returns true
      if (title.toLowerCase().indexOf(input) !== -1){
         bookList.style.display = "flex";
      }else{
         bookList.style.display = "none";
      }
   });

}