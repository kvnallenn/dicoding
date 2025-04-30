const token = localStorage.getItem("token");

const loginForm = () => {
  const form = document.querySelector(".login-input-form");
  const textkonfirmasi = document.querySelector(".text-konfirmasi");
  const loginButton = document.querySelector(".login-button");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      loginButton.style.display = "none";
      textkonfirmasi.style.display = "block";
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;

      const catchdata = async () => {
        try {
          const response = await fetch(
            "https://story-api.dicoding.dev/v1/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email: email, password: password }),
            }
          );
          const request = await response.json();
          console.log(request);
          if (!request.error) {
            localStorage.setItem("token", request.loginResult.token);
          }
        } catch (error) {
          console.log(error);
        } finally {
          loginButton.style.display = "inline-block";
          textkonfirmasi.style.display = "none";
          location.replace("./index.html");
        }
      };
      catchdata();
    });
  }
};

const fRegister = () => {
  const formRegister = document.querySelector(".register-input-form");
  if (formRegister) {
    formRegister.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.querySelector("#name").value;
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;

      const catchdata = async () => {
        try {
          const response = await fetch(
            "https://story-api.dicoding.dev/v1/register",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: name,
                email: email,
                password: password,
              }),
            }
          );
          const request = await response.json();
          console.log(request);
        } catch (error) {
          console.log(error);
        }
      };
      catchdata();
    });
  }
};

const getAllStories = async () => {
  const textCerita = document.querySelector(".text-cerita");
  if (textCerita) {
    if (token == null) {
      textCerita.style.display = "block";
    } else {
      textCerita.style.display = "none";
      try {
        const response = await fetch(
          "https://story-api.dicoding.dev/v1/stories",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const request = await response.json();
        console.log(request);
        displayStories(request.listStory);
      } catch (error) {
        console.log(error);
      }
    }
  }
};

const displayStories = (stories) => {
  const container = document.getElementById("card-list");
  stories.forEach((story) => {
    const storyCard = document.createElement("div");
    storyCard.classList.add("card");

    storyCard.innerHTML = `
    <img src="${story.photoUrl}" alt="Foto Cerita" class="story-pict">
      <div>${story.name}</div>
      <div>${story.description}</div>
      <div><strong>Created At:</strong> ${new Date(
        story.createdAt
      ).toLocaleString()}</div>
    `;

    container.appendChild(storyCard);
  });
};

const subStory = () => {
  const addStory = document.querySelector(".add-form");
  if (addStory) {
    addStory.addEventListener("submit", function (event) {
      event.preventDefault();

      const description = document.querySelector("#isi-pesan").value;
      const photo = document.querySelector("#isi-foto").files[0];

      const formData = new FormData();
      formData.append("description", description);
      formData.append("photo", photo);

      const catchdata = async () => {
        try {
          const response = await fetch(
            "https://story-api.dicoding.dev/v1/stories",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            }
          );
          const request = await response.json();
          console.log(request);
        } catch (error) {
          console.log(error);
        }
      };
      catchdata();
    });
  }
};

const app = document.getElementById("app");

// Halaman-halaman yang tersedia
const routes = {
  "/": `
    <section class="article-text">
      <button type="submit" class="skip-button" onclick="window.location='index.html#/form';">Add Story</button>
    </section>
    <section class="list-story">
      <label>Story List</label>
    </section>
    <div class="text-cerita" style="display: none;">
      Harap Login Untuk Melihat List Cerita . . .
    </div>
    <div class="card-wrap">
      <section class="card-story">
        <div class="card-list" id="card-list"></div>
      </section>
    </div>
  `,
  "/login": `
  <section class="container-form">
        <div class="login-form">
          <div>
            <img
              src="img/dicoding.jpg"
              alt="Logo Dicoding"
              class="logo-dicoding"
            />
          </div>
          <form action="" class="login-input-form">
            <div class="input-form">
              <div>
                <label> Email </label>
                <div><input type="text" id="email" /></div>
              </div>
              <div>
                <label> Password </label>
                <div><input type="text" id="password" /></div>
              </div>
              <button type="submit" class="login-button">Login</button>
              <p class="text-konfirmasi" style="display: none">
                Harap bersabar ini ujian . . .
              </p>
            </div>
          </form>
        </div>
      </section>
  `,
  "/register": `
 <section class="container-form">
        <div class="login-form">
          <div>
            <img
              src="img/dicoding.jpg"
              alt="Logo Dicoding"
              class="logo-dicoding"
            />
          </div>
          <form action="" class="register-input-form">
            <div class="input-form">
              <div>
                <label> Name </label>
                <div><input type="text" id="name" /></div>
              </div>
              <div>
                <label> Email </label>
                <div><input type="text" id="email" /></div>
              </div>
              <div>
                <label> Password </label>
                <div><input type="text" id="password" /></div>
              </div>
              <button type="submit" class="login-button">Register</button>
            </div>
          </form>
        </div>
      </section>
  `,
  "/form": `
<div class="form-label">
        <img src="img/dicoding.jpg" alt="Logo Dicoding" class="logo-dicoding" />
      </div>
      <section class="form-label">Tulis Ceritamu</section>
      <section class="container-form">
        <div class="login-form">
          <form action="" class="add-form" enctype="multipart/form-data">
            <div class="input-form">
              <div>
                <label>Deskripsi Cerita</label>
                <div>
                  <textarea id="isi-pesan" cols="50" rows="10"></textarea>
                </div>
              </div>
              <div>
                <label>Photo</label>
                <div><input type="file" id="isi-foto" /></div>
              </div>
              <button type="submit" class="login-button">Submit</button>
              <p class="text-konfirmasi" style="display: none">
                Harap bersabar ini ujian . . .
              </p>
            </div>
          </form>
        </div>
      </section>
  `,
};

// Fungsi untuk mengganti tampilan berdasarkan hash
function router() {
  const hash = location.hash || "#/";
  const path = hash.slice(1); // hilangkan simbol #
  app.innerHTML = routes[path] || "<h1>404</h1><p>Halaman tidak ditemukan.</p>";

  if (path === "/") {
    getAllStories();
  } else if (path === "/login") {
    loginForm();
  } else if (path === "/register") {
    fRegister();
  } else if (path === "/form") {
    subStory();
  }
}

// Jalankan router saat pertama kali dibuka dan saat hash berubah
window.addEventListener("load", router);
window.addEventListener("hashchange", router);
