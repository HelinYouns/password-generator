const copyBtn = document.getElementById("copybtn");
const passwordFild = document.getElementById("password");
const strongPass = document.querySelector(".strong-pass");
const memorablePass = document.querySelector(".memorable-pass");
const generatPasswBtn = document.getElementById("generate-passw");
const pinCode=document.querySelector(".pin-code");

// fetch("https://api.wordnik.com/v4/words.json/randomWord?api_key=YOUR_API_KEY")
//   .then(response => response.json())
//   .then(data => console.log(data.word))
//   .catch(error => console.error("Error:", error));

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

//Generate Memorable Passwrod
memorablePass.addEventListener("click", function () {
  passwordFild.textContent = generateMemorablePassword();
});

//Generate Memorable Passwrod
pinCode.addEventListener("click", function () {
  passwordFild.textContent = generatePinCode(6);
});

//Generate Strong PassWord
function generateStrongPassword(length) {
  let password = "";
  let notAllowedCharacter = [
    34, 39, 44, 46, 59, 61, 63, 91, 92, 93, 95, 96, 125, 123,
  ];
  let preDefinedPass;
  let controlLoop = true;
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).+$/;

  while (controlLoop) {
    for (let i = 1; i <= length; i++) {
      preDefinedPass = Math.floor(Math.random() * (125 - 33 + 1)) + 33;
      if (!notAllowedCharacter.includes(preDefinedPass)) {
        password += String.fromCharCode(preDefinedPass);
      } else {
        i--;
      }
    }
    if (regex.test(password)) {
      controlLoop = false;
    } else {
      password = "";
    }
  }

  return password;
}

// Generate Memorable Password

function generateMemorablePassword() {
  const words = [
    "apple",
    "banana",
    "cherry",
    "date",
    "elderberry",
    "fig",
    "grape",
    "honeydew",
    "kiwi",
    "lemon",
    "mango",
    "nectarine",
    "orange",
    "papaya",
    "quince",
    "raspberry",
    "strawberry",
    "tangerine",
    "ugli",
    "vanilla",
    "watermelon",
    "xigua",
    "yam",
    "zucchini",
    "almond",
    "broccoli",
    "carrot",
    "dill",
    "eggplant",
    "fennel",
    "garlic",
    "hazelnut",
    "iceberg",
    "jalapeno",
    "kale",
    "lettuce",
    "mushroom",
    "nutmeg",
    "onion",
    "parsley",
    "quinoa",
    "radish",
    "spinach",
    "tomato",
    "upland",
    "vinegar",
    "walnut",
    "xanthan",
    "yeast",
    "zebra",
    "anchor",
    "bridge",
    "castle",
    "dolphin",
    "eclipse",
    "firefly",
    "gondola",
    "harvest",
    "island",
    "jungle",
    "kangaroo",
    "lantern",
    "mountain",
    "nebula",
    "ocean",
    "penguin",
    "quasar",
    "rainbow",
    "sunset",
    "tornado",
    "unicorn",
    "volcano",
    "whisper",
    "xylophone",
    "yellow",
    "zeppelin",
    "astronaut",
    "butterfly",
    "cloud",
    "dragon",
    "emerald",
    "feather",
    "glacier",
    "horizon",
    "illusion",
    "jigsaw",
    "kite",
    "lighthouse",
    "meadow",
    "nightfall",
    "oasis",
    "puzzle",
    "quest",
    "river",
    "spectrum",
    "twilight",
    "umbrella",
    "voyage",
    "wonder",
    "zenith",
  ];
  let password = "";
let controlLoop=true;
while(controlLoop){
  let word1 = words[Math.floor(Math.random() * (words.length - 1))];
  let word2 = words[Math.floor(Math.random() * (words.length - 1))];
  let num = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
  if(word1!==word2){
    password = word1 + word2 + num;
    controlLoop=false;
  }
}

  return password;
}

function generatePinCode(pinLength){
  let pinCode="";
  for(let i=0; i<pinLength; i++){
    pinCode+=Math.floor(Math.random()*10);
  }
  
  return pinCode;
}