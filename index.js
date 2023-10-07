document.getElementById("get-colors-btn").addEventListener("click", getColors);
const seedColor = document.getElementById("seed-color");
const modeSelect = document.getElementById("color-scheme");
const colorSection = document.getElementById("color-display-section");

function getColors() {
  const selectedSeed = seedColor.value.substring(1);
  fetch(
    `https://www.thecolorapi.com/scheme?count=5&hex=${selectedSeed}&mode=${modeSelect.value}`,
    { headers: { "Content-Type": "application/json" } }
  )
    .then((res) => res.json())
    .then((data) => displayColors(data));
}

function displayColors(data) {
  colorSection.innerHTML = "";
  for (let color of data.colors) {
    colorSection.innerHTML += `
            <div class="color-recommendation">
              <img class="color-rec-img" src="${color.image.bare}">
              <h3 id="hex-value">${color.hex.value}</h3>
            </div>`;
  }
  copyToClipboard();
}

function copyToClipboard() {
  const hexValue = document.querySelectorAll("#hex-value");

  hexValue.forEach((hex) => {
    hex.addEventListener("click", (e) => {
      const originalText = e.target.textContent;

      navigator.clipboard.writeText(originalText);
      hex.textContent = "Copied!";
      setTimeout(() => (hex.textContent = originalText), 1000);
    });
  });
}
