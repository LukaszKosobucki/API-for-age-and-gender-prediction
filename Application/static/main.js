let submit =  document.getElementById("submit");
const webcamElement = document.getElementById('webcam');
const canvasElement = document.getElementById('canvas');
const snapSoundElement = document.getElementById('snapSound');
const webcam = new Webcam(webcamElement, 'user', canvasElement, snapSoundElement);


submit.addEventListener("click", () =>{
    let age = document.getElementById("age").value;
    let gender = document.getElementById("gender");
    let picture = webcam.snap();
    let data={
        'picture':picture,
    };
    let prepared_data = JSON.stringify(data);
    webcam.stop();
    document.getElementById("webcam").remove()
    document.getElementById("canvas").remove()
    const Http = new XMLHttpRequest();
    const url='http://127.0.0.1:5000/api/';
    Http.open("POST", url);
    Http.setRequestHeader("Access-Control-Allow-Origin", "*");
    Http.send(prepared_data);
    Http.onreadystatechange = (e) => {
        console.log(Http.responseText)
    }
})

webcam.start()
   .then(result =>{
      console.log("webcam started");
   })
   .catch(err => {
       console.log(err);
   });
