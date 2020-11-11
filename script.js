/************************************************************/
/* The following is based on W3.CSS's method for slideshows, combining the automatic and manual slideshows */
let index = 1;
slideDivs(index);

function slideDivs(input) {
  /* set variable to slide image */
  let mySlide = document.getElementsByClassName("slide");

  /* go through slides automatically */
  for (let i = 0; i < mySlide.length; i++) {
    mySlide[i].style.display = "none";
  }
  index++; // next slide
  if(index > mySlide.length) {
    index = 1; // reset if out of bounds
  }
  mySlide[index - 1].style.display = "block";
  setTimeout(slideDivs, 3000) // Change slide every 5 seconds
}


/* maual movement activated when button clicked */
function plusDivs(input) {
    showSlides(index += input);
}

function showSlides(input) {
  let slides = document.getElementsByClassName("slide");
  
  /* check for out of bounds */
  if (input > slides.length) {
    index = 1
  }

  if (input < 1) {
    index = slides.length
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[index - 1].style.display = "block";
}

/************************************************************/