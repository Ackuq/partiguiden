export default url =>
  fetch(url)
    .then(res => res.json())
    .then(data => data);
