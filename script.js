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
      }
    };
    catchdata();
  });
}

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

const token = localStorage.getItem("token");

const getAllStories = async () => {
  try {
    const response = await fetch("https://story-api.dicoding.dev/v1/stories", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const request = await response.json();
    console.log(request);
    displayStories(request.listStory);
  } catch (error) {
    console.log(error);
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

getAllStories();
