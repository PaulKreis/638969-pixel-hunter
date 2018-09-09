const resize = (frame, given) => {
  let newSize = 0;
  if (frame.width === frame.height) {
    if (given.width > given.height) {
      const aspectRatio = given.width / given.height;
      const newHeight = frame.height / aspectRatio;
      newSize = {width: frame.width, height: newHeight};
    } else if (given.width < given.height) {
      const aspectRatio = given.height / given.width;
      const newWidth = frame.width / aspectRatio;
      newSize = {width: newWidth, height: frame.height};
    } else if (given.width === given.height) {
      newSize = frame;
    }
  } else if (frame.width > frame.height) {
    if (given.width > given.height) {
      const aspectRatio = given.width / given.height;
      const newHeight = frame.width / aspectRatio;
      newSize = {width: Math.round(frame.width), height: Math.round(newHeight)};
    } else if (given.width < given.height) {
      const aspectRatio = given.height / given.width;
      const newWidth = frame.height / aspectRatio;
      const newHeight = newWidth * aspectRatio;
      newSize = {width: Math.round(newWidth), height: Math.round(newHeight)};
    } else if (given.width === given.height) {
      if (given.width / given.height === frame.width / frame.height) {
        newSize = frame;
      } else {
        const givenAspectRatio = given.width / given.height;
        const frameAspectRatio = frame.width / frame.height;
        const newWidth = frame.width / frameAspectRatio;
        const newHeight = frame.height * givenAspectRatio;
        newSize = {width: newWidth, height: newHeight};
      }
    }
  } else if (frame.width < frame.height) {
    if (given.width > given.height) {
      const aspectRatio = given.width / given.height;
      const newHeight = frame.width / aspectRatio;
      newSize = {width: frame.width, height: Math.round(newHeight)};
    } else if (given.width < given.height) {
      const aspectRatio = given.height / given.width;
      const newWidth = frame.height / aspectRatio;
      newSize = {width: Math.round(newWidth), height: frame.height};
    } else if (given.width === given.height) {
      newSize = frame;
    }
  }
  return newSize;
};
export default resize;
