let copyBtn = document.getElementById("copybtn");
let passwordFild = document.getElementById("password");
let strongPass = document.querySelector(".strong-pass");
let generatPasswBtn = document.getElementById("generate-passw");

fetch("https://api.wordnik.com/v4/words.json/randomWord?api_key=YOUR_API_KEY")
  .then(response => response.json())
  .then(data => console.log(data.word))
  .catch(error => console.error("Error:", error));

// Copy Password Button
copyBtn.addEventListener("click", () => {
  navigator.clipboard
    .writeText(passwordFild.textContent)
    .then(() => {
      let msg = document.getElementById("copyMessage");
      msg.style.display = "block";
      setTimeout(() => {
        msg.style.display = "none";
      }, 2000);
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
});

//Generate Strong PassWord
strongPass.addEventListener("click", function () {
  passwordFild.textContent = generateStrongPassword(16);
});
generatPasswBtn.addEventListener("click", function () {
  passwordFild.textContent = generateStrongPassword(16);
});


//Generate Strong PassWord
function generateStrongPassword(length) {
  let password = "";
  let notAllowedCharacter = [
    34, 39, 44, 46, 59, 61, 63, 91, 92, 93, 95, 96, 125, 123,
  ];
  let preDefinedPass;
  let controlLoop=true;
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).+$/;

  while(controlLoop){
    for (let i = 1; i <= length; i++) {
      preDefinedPass = Math.floor(Math.random() * (125 - 33 + 1)) + 33;
      if (!notAllowedCharacter.includes(preDefinedPass)) {
        password += String.fromCharCode(preDefinedPass);
      } else {
        i--;
      }
    }
    if(regex.test(password)){
      controlLoop=false;
    }else{
      password="";
    }
  }
 
  return password;
}
