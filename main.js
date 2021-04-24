objects = [];
status = "";
input = "";
nn = 0;
function preload(){
  
}


function setup() {
  canvas = createCanvas(480, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380,380);
  video.hide();

}

function start()
{
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(video, 0, 0, 480, 380);
      if(status != "")
      {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Objects Detected";
          
          nn = objects[i].label;
          input = document.getElementById("input23").value;
          if (input == nn)
          {
              document.getElementById("foundornot").innerHTML = input + " found";
          } else
          {
            document.getElementById("foundornot").innerHTML = input + "not found";
          }
          fill("#FF0000");
          percent = floor(objects[i].confidence * 100);
          text(nn + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke("#FF0000");
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
      }
}
