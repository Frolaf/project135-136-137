status1="";
objects=[];
name1="";

function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function draw(){
    image(video,0,0,480,380);
    if(status1 != ""){
        objectDetector.detect(video, gotResult);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "status: objects detected";
            fill("#FF0000");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == name1){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_status").innerHTML = name1 + " found";
                synth= window.speechSynthesis;
                utterThis=new SpeechSynthesisUtterance(name1 + "found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("object_status").innerHTML = name1 + " not found";
            }
        }
    }
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function start(){
    objectDetector= ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    name1=document.getElementById("object_name").value;
}

function modelLoaded(){
    console.log(" Model Loaded ");
    status1 = true;
}