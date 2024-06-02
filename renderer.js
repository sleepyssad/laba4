const videoElement = document.querySelector('video');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
let mediaRecorder;
let recordedChunks = [];
console.log('Помилка захоплення екрану:');
startBtn.addEventListener('click', async () => {
    try {
        const stream =await navigator.mediaDevices.getDisplayMedia({
            video: {
                width: { ideal: 9999 },
                height: { ideal: 9999 }
            },
            audio: false
        });
        videoElement.srcObject = stream;
        mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp8' });
        mediaRecorder.ondataavailable = handleDataAvailable;
        mediaRecorder.start();
    } catch (error) {
        console.error('Помилка захоплення екрану:', error);

    }
});

stopBtn.addEventListener('click', () => {
    alert(2);
    mediaRecorder.stop();
    videoElement.srcObject.getTracks().forEach(track => track.stop());
});

function handleDataAvailable(event) {
    alert(1);
    if (event.data.size > 0) {
        recordedChunks.push(event.data);
        saveVideo();
    }
}

function saveVideo() {
    alert(4);
    const blob = new Blob(recordedChunks, {
        type: 'video/webm'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recorded-video.webm';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        recordedChunks = [];
    }, 100);
}
