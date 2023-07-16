export default function FetchApi() {
  const urlInput = document.querySelector("#inputUrl");
  const convert = document.querySelector("#convert");
  const downloadBtn = document.querySelector("#downloadBtn");
  const qrCodeImg = document.querySelector("#preview");
  const formatInput = document.querySelector(".format")

  qrCodeImg.classList.add("invisible");

  function downloadImage(image) {
    const format = formatInput.value

    downloadBtn.href = image;
    downloadBtn.download = `qr-code.${format}`;
  }

  function convertUrlToQrCode(event) {
    urlInput.disabled = true;
    convert.disabled = true;
    event.preventDefault();

    const url = urlInput.value;
    const format = formatInput.value

    fetch(`https://power-tan-sherbet.glitch.me/qr?url=${url}&format=${format}`)
      .then((response) => response.blob())
      .then((blob) => {
        let urlImage = URL.createObjectURL(blob);
        qrCodeImg.src = urlImage;

        qrCodeImg.onload = () => {
          urlInput.disabled = false
          downloadImage(urlImage);
          downloadBtn.classList.remove("invisible");
        };
      })
      .then(
        qrCodeImg.classList.remove("invisible"),
        qrCodeImg.classList.add("qrCode"),
      )
      .catch((err) => console.error("Failed to convert url on QrCode:", err))
      .finally(
        urlInput.disabled = false,
        convert.disabled = false
      )
  }

  convert.addEventListener("click", convertUrlToQrCode);
}
