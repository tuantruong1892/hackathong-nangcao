let index;

function render() {
  const data = JSON.parse(localStorage.getItem("listtodo")) || [];
  const list = document.getElementById("myUL");
  let listcontent = "";
  data.forEach((items, index) => {
    listcontent += `  <li class="checked">
      <input type="checkbox" />
      <p onclick=changestatus(${index})>${items.content}</p>
      <div>
        <button  class="btn" onclick=openmodal(${index})>Edit</button>
        <button class="btn" onclick=handleDel(${index})>Delete</button>
      </div>
    </li>`;
  });
  list.innerHTML = listcontent;
}
function handleAdd() {
  const input = document.getElementById("input");
  const inputValue = input.value;
  const data = JSON.parse(localStorage.getItem("listtodo")) || [];
  const newData = { content: inputValue, status: false };
  data.push(newData);
  localStorage.setItem("listtodo", JSON.stringify(data));
  input.value = "";
  render();
}

function handleDel(index) {
  const data = JSON.parse(localStorage.getItem("listtodo")) || [];
  confirm(`bạn muốn xác nhận sẽ xóa ${data[index].content}`);
  if (confirm) {
    {
      data.splice(index, 1);
      localStorage.setItem("listtodo", JSON.stringify(data));
      render();
    }
  }
  changestatus(index);
}
function handleEdit(i) {
  console.log(i);
  const data = JSON.parse(localStorage.getItem("listtodo")) || [];
  const input = document.getElementById("editcontent");
  const inputValue = input.value;
  console.log(index);
  document.getElementById("editcontent").value = data[i].content;
  const newData = data.map((item, i) => {
    if (i == index) {
      return { ...item, content: inputValue };
    }
    return item;
  });
  localStorage.setItem("listtodo", JSON.stringify(newData));
  editcontent.value = "";
  render();
  editcancel();
}

function openmodal(i) {
  index = i;
  let modal = document.getElementById("myModal");
  modal.style.display = "block";
  const data = JSON.parse(localStorage.getItem("listtodo")) || [];

  document.getElementById("editcontent").value = data[i].content;
}
function editcancel() {
  let modal = document.getElementById("myModal");
  modal.style.display = "none";
}
// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// };
function changestatus(index) {
  const data = JSON.parse(localStorage.getItem("listtodo")) || [];

  const check = document.getElementsByClassName("checked");
  check[index].style.textDecoration = "line-through";
  const newData = data.map((item, i) => {
    if (i == index) {
      return { ...item, status: true };
    }
    return item;
  });
  localStorage.setItem("listtodo", JSON.stringify(newData));
  let todolistdone = data.filter((item) => item.status);
  let count = todolistdone.length;
  const innerdone = document.getElementsByClassName("todolist-done")[0];
  innerdone.innerHTML = `<h4>Số công việc hoàn thành: ${count+1}/${data.length}</h4>`;
  //   render();
}
render();
