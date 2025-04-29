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
