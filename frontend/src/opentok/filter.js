function invert(imgData) {
  const res = new Uint8ClampedArray(imgData.data.length);
  for (let i = 0; i < imgData.data.length; i += 4) {
    // Invert the colors red = 255 - inputRed etc.
    res[i] = 255 - imgData.data[i];
    res[i + 1] = 255 - imgData.data[i + 1];
    res[i + 2] = 255 - imgData.data[i + 2];
    res[i + 3] = imgData.data[i + 3]; // Leave alpha alone
  }
  return new ImageData(res, imgData.width, imgData.height);
}

export function getFilteredCanvas(mediaStream) {
  console.log("OK");
  var WIDTH = 640;
  var HEIGHT = 480;
  var videoEl = document.createElement("video");
  videoEl.srcObject = mediaStream;
  console.log("2");
  videoEl.setAttribute("playsinline", "");
  videoEl.muted = true;
  setTimeout(function timeout() {
    videoEl.play();
  });
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  var tmpCanvas = document.createElement("canvas");
  var tmpCtx = tmpCanvas.getContext("2d");
  tmpCanvas.width = WIDTH;
  tmpCanvas.height = HEIGHT;

  videoEl.addEventListener("resize", function resize() {
    canvas.width = tmpCanvas.width = videoEl.videoWidth;
    canvas.height = tmpCanvas.height = videoEl.videoHeight;
  });

  var reqId;

  // Draw each frame of the video
  var drawFrame = function drawFrame() {
    // Draw the video element onto the temporary canvas and pull out the image data
    tmpCtx.drawImage(videoEl, 0, 0, tmpCanvas.width, tmpCanvas.height);
    var imgData = tmpCtx.getImageData(0, 0, tmpCanvas.width, tmpCanvas.height);
    // Apply the currently selected filter and get the new image data
    imgData = invert(imgData);
    // Draw the filtered image data onto the main canvas
    ctx.putImageData(imgData, 0, 0);

    reqId = requestAnimationFrame(drawFrame);
  };

  reqId = requestAnimationFrame(drawFrame);

  return {
    canvas: canvas,
    stop: function stop() {
      // Stop the video element, the media stream and the animation frame loop
      videoEl.pause();
      if (mediaStream.stop) {
        mediaStream.stop();
      }
      if (MediaStreamTrack && MediaStreamTrack.prototype.stop) {
        // Newer spec
        mediaStream.getTracks().forEach(function each(track) {
          track.stop();
        });
      }
      cancelAnimationFrame(reqId);
    },
  };
}
