const downloadLink = document.getElementById('download');
downloadLink.onclick = function(e) {
  e.preventDefault();

  fetch('https://api.github.com/repos/lionsharecapital/lionshare-desktop/releases/latest')
  .then(res => res.json())
  .then(json => {
    const downloadUrl = json.assets[0]['browser_download_url'];
    window.location = downloadUrl;
  })
  .catch((e) => {
    console.error(e);
    alert('Failed to download, please try again');
  });
}
