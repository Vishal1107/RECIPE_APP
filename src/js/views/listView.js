import { elements } from "./base";

export const renderList = (item) => {
  const markup = `<li class="shoppingItem" data-itemid = ${item.id}>
 
 <span class="shoppingCount">
<input type = "number" value = "${item.count}" step = "${item.count}" id= "shoppingCountValue">
<p>${item.unit}</p>
 </span>

 <span>
 <p>${item.ingredients}</p>
 </span>

<span>
<i class="fa fa-window-close" aria-hidden="true"></i>
</span>

 </li>`;

  elements.shopping.insertAdjacentHTML("beforeend", markup);
};

export const deleteItem = (id) => {
  const item = document.querySelector(`[data-itemid = "${id}"]`);
  item.parentElement.removeChild(item);
};
