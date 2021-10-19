const screenshare = document.querySelector("#screenshare");
const record = document.querySelector("#record");
const video = document.querySelector("video");
const stop = document.querySelector("#stop");
const recordedVideo = document.querySelector("#recorded");
let mediaRecorder;
let chunks = [];

function gotMediaStream(stream) {
  window.stream = stream;
  video.srcObject = stream;
}

function handleError(err) {
  console.log(err);
}

function getDisplayMedia(constraints) {
  navigator.mediaDevices
    .getDisplayMedia(constraints)
    .then(gotMediaStream)
    .catch(handleError);
}

function startRecording() {
  chunks = [];
  mediaRecorder = new MediaRecorder(window.stream);
  mediaRecorder.start();
  console.log(mediaRecorder);
  mediaRecorder.ondataavailable = (e) => {
    console.log(e);
    chunks.push(e.data);
    const url = URL.createObjectURL(new Blob(chunks, { type: e.data.type }));
    recordedVideo.src = url;
    recordedVideo.controls = true;
  };
}

function stopRecording() {
  mediaRecorder.stop();
  chunks = [];
}

const constraints = { video: { width: 1280, height: 720 } };

screenshare.addEventListener("click", () => getDisplayMedia(constraints));
record.addEventListener("click", startRecording);
stop.addEventListener("click", stopRecording);
