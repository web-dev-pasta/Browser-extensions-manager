let req = new XMLHttpRequest();
req.open("GET", "./data.json");
req.send();
let mainCont = document.querySelector(".extensions .container");
req.onreadystatechange = function () {
  if (req.status == 200 && req.readyState == 4) {
    let jsObject = JSON.parse(req.responseText);
    let active = [],
      inactive = [];
    let cloned = [];
    for (let i = 0; i < jsObject.length; i++) {
      let data = jsObject[i];

      let box = document.createElement("div");
      box.className = "box";

      let title = document.createElement("div");
      title.className = "title";

      let imageWrapper = document.createElement("div");
      imageWrapper.className = "image";

      let img = document.createElement("img");
      img.src = data.logo;
      img.alt = "";
      imageWrapper.appendChild(img);

      let text = document.createElement("div");
      text.className = "text";

      let pMedium = document.createElement("p");
      pMedium.className = "medium";
      pMedium.textContent = data.name;

      let pSmall = document.createElement("p");
      pSmall.className = "small";
      pSmall.textContent = data.description;

      text.appendChild(pMedium);
      text.appendChild(pSmall);

      title.appendChild(imageWrapper);
      title.appendChild(text);

      let toggle = document.createElement("div");
      toggle.className = "toggle";

      let removeBtn = document.createElement("p");
      removeBtn.className = "btn";
      removeBtn.textContent = "Remove";

      let isRemoving = false;
      removeBtn.addEventListener("click", () => {
        isRemoving = true;
        box.remove();
      });
      removeBtn.addEventListener("mouseenter", () => {
        removeBtn.classList.add("enter");
      });
      removeBtn.addEventListener("mouseleave", () => {
        if (!isRemoving) {
          removeBtn.classList.remove("enter");
        }
      });

      let enableDisable = document.createElement("div");
      enableDisable.className = "enable-disable";
      if (data.isActive) {
        enableDisable.classList.add("active");
      }

      toggle.appendChild(removeBtn);
      toggle.appendChild(enableDisable);
      box.appendChild(title);
      box.appendChild(toggle);
      if (data.isActive) {
        active.push(box);
      } else {
        inactive.push(box);
      }
      mainCont.appendChild(box);
      cloned.push(box);
    }

    let list = document.querySelectorAll(".list .container .sections .section");
    list.forEach((e) => {
      e.addEventListener("click", () => {
        mainCont.innerHTML = "";
        document
          .querySelector(".list .container .sections .section.active")
          .classList.remove("active");
        e.classList.add("active");
        if (e.dataset.name == "active") {
          for (let i = 0; i < active.length; i++) {
            mainCont.appendChild(active[i]);
          }
        } else if (e.dataset.name == "inactive") {
          for (let i = 0; i < inactive.length; i++) {
            mainCont.appendChild(inactive[i]);
          }
        } else {
          for (let i = 0; i < cloned.length; i++) {
            mainCont.appendChild(cloned[i]);
          }
        }
      });
    });
    let removeBtn = document.querySelectorAll("p.btn");
    removeBtn.forEach((e) => {
      e.addEventListener("click", () => {
        e.parentElement.parentElement.remove();
        active = active.filter((el) => el != e.parentElement.parentElement);
        inactive = inactive.filter((el) => el != e.parentElement.parentElement);
        cloned = cloned.filter((el) => el != e.parentElement.parentElement);
        console.log(cloned);
      });
    });
    let toggleBtn = document.querySelectorAll(
      ".extensions .container .toggle .enable-disable"
    );
    toggleBtn.forEach((e) => {
      e.addEventListener("click", () => {
        e.classList.toggle("active");
        let target = e.parentElement.parentElement;
        if (!e.classList.contains("active")) {
          active = active.filter((el) => el != target);
          inactive.push(target);
        } else {
          inactive = inactive.filter((el) => el != target);
          active.push(target);
        }
      });
    });
  }
};
let themeToggle = document.querySelector(".header .dark-light");
let themeImage = document.querySelector(".header .dark-light img");
themeToggle.addEventListener("click", () => {
  themeToggle.classList.toggle("dark");
  themeToggle.classList.toggle("light");
  document.body.classList.toggle("light");
});
