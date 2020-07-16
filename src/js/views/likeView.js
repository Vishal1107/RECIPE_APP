import { elements } from "./base";
import { limitRecipeResult } from "./searchView";

// ----------------------------->> CHECKING RECIPE LIKED OR NOT

export const toggleLikeBtn = (isLiked) => {
  if (isLiked) {
    document.querySelector(".likeBtn").classList.add("fa-heart");
    document.querySelector(".likeBtn").classList.remove("fa-heart-o");
  } else {
    document.querySelector(".likeBtn").classList.add("fa-heart-o");
    document.querySelector(".likeBtn").classList.remove("fa-heart");
  }
};

// ----------------------------->> SHOW LIKE BUTTON DEPENDS ON LIKE

export const toggleLikeMenue = (numLikes) => {
  elements.likesMenue.style.visibility = numLikes > 0 ? "visible" : "hidden";
};

// ----------------------------->> RENDER LIKE VIEW

export const renderLike = (like) => {
  const markup = `<span> 
  <a class="likesLink" href="#${like.id}">
      <figure>
     <img src = "${like.img}" class="img-fluid" style="height:50px; width:75px">
      </figure>
      <div id= "itemTitle">
      <h6 class="text-uppercase text-danger">${like.title}</h6>
      <p>${like.author}</p>
      </div>
     </a>
     </span>
     <hr/>`;

  elements.likesList.insertAdjacentHTML("beforeend", markup);
};

// ----------------------------->> REMOVE LIKE

export const deleteLike = (id) => {
  const el = document.querySelector(`.likesLink[href*="${id}"`).parentElement;

  if (el) el.parentElement.removeChild(el);
};
