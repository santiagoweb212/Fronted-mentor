const $email = document.getElementById("email");
const $form = document.getElementById("form");
const $successHideMessage = document.getElementById("sucess-hide__message");
const $successHide = document.querySelector(".sucess-hide");
const $container = document.querySelector(".container");
const $buttonSucces = document.getElementById("sucess-hide__button");
const $loader = document.getElementById("loader");
const $validText = document.getElementById("valid-text");
const $buttonSubmit = document.getElementById("button-submit");
$buttonSubmit.disabled = true;
const enviarEmail = (email) => {
  const enpoit = "https://formsubmit.co/ajax/";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: "Fronted mentor",
      message: "hola que tal",
    }),
  };

  fetch(`${enpoit}${email}`, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        console.log("esty aca");
        $successHideMessage.textContent = `A confirmation email has been sent to ${email}. Please open it and click the button inside to confirm your subscription.`;
        $successHide.classList.remove("sucess-hide");
        $container.classList.remove("container");
        $container.classList.add("container--hide");
        $successHide.classList.add("sucess-hide--visible");
      }
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      $loader.style.display = "none";
      $email.value = "";
    });
};
function validateEmail(email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

function handleEmailValidation(event) {
  const emailValue = $email.value;
  console.log(emailValue);

  if (!validateEmail(emailValue)) {
    $validText.textContent = "Valid email required";
    $email.style.backgroundColor = "hsl(4, 100%, 67%,0.5)";
    $email.style.border = "1px solid hsl(4, 100%, 67%,0.5)";
    $email.style.color = "hsl(4, 100%, 67%)";
  } else {
    $buttonSubmit.disabled = false;
  }
}

$email.addEventListener("input", handleEmailValidation);
$email.addEventListener("blur", handleEmailValidation);

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  $loader.style.display = "block";
  enviarEmail($email.value);
});
$buttonSucces.addEventListener("click", () => {
  const $successHideVisible = document.querySelector(".sucess-hide--visible");
  if ($successHideVisible) {
    $successHideVisible.classList.remove("sucess-hide--visible");
    $successHideVisible.classList.add("sucess-hide");
    $container.classList.remove("container--hide");
    $container.classList.add("container");
  }
  console.log($successHideVisible);
});
