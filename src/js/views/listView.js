import { elements } from "./base";

export const renderList = (item) => {
  const markup = `<span class="shoppingItem" data-itemid = ${item.id}>
 
<span class="shoppingCount">
<input type = "number" value = "${item.count}" step = "${item.count}" id= "shoppingCountValue">
<span>${item.unit}</span>
 <p>${item.ingredients}<span class="float-right"><i class="fa fa-window-close text-danger"></i></span></p>
</span>
</span>
<hr/>`;

  elements.shopping.insertAdjacentHTML("beforeend", markup);
};

export const deleteItem = (id) => {
  const item = document.querySelector(`[data-itemid = "${id}"]`);
  item.parentElement.removeChild(item);
};
