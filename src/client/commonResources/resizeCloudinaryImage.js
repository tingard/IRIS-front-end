function resizeCloudinaryImage(url, width) {
  const regExp = /res.cloudinary.com\/(.*?)\/image\/upload\/(.*?)$/i;
  const match = regExp.exec(url);
  console.log('here', url, match);
  return match ? (
    `https://res.cloudinary.com/${match[1]}/c_scale,w_${width}/${match[2]}`
  ) : url;
}

export default resizeCloudinaryImage;
