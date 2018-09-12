const resize = (frame, image) => {
  const newSize = {
    width: 0,
    height: 0,
  };
  const aspectRatio = image.width / image.height;

  if (image.width >= frame.width || image.height >= frame.height) {
    if (frame.width / aspectRatio <= frame.height) {
      newSize.width = frame.width;
      newSize.height = frame.width / aspectRatio;
    } else {
      newSize.width = frame.height * aspectRatio;
      newSize.height = frame.height;
    }
  } else {
    newSize.width = image.width;
    newSize.height = image.height;
  }
  console.log(`frame: ` + frame.width, frame.height);

  console.log(`image: ` + image.width, image.height);

  console.log(`newSize: ` + newSize.width, newSize.height);
  return newSize;
};

export default resize;
