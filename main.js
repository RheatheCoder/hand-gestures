Webcam.set({
    width: 350,
    height:300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("live_view");
Webcam.attach("#live_view");

function takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("captured_image").innerHTML = '<img id ="image" src = "'+data_uri+'">';

    })
}

console.log("ml5.version", ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/mLWtmrwa6/model.json', modelLoaded);

function modelLoaded(){
    console.log("model loaded");
}

function check(){
    img = document.getElementById("image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("emoji_results_name").innerHTML = results[0].label;
        gesture = results[0].label;
        to_speak = "";
        if (gesture == "amazing"){
            to_speak = "this is looking amazing";
            document.getElementById ("emoji_results").innerHTMl = "&#128076;";
        }
        else if (gesture == "best"){
            to_speak = "this is the BEST of all!";
            document.getElementById ("emoji_results").innerHTMl = "&#128077;";
        }
        else if (gesture == "victory"){
            to_speak = "this emoji seems very victorious";
            document.getElementById ("emoji_results").innerHTMl = "&#9996;";
        }
        speak();

    }
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data = to_speak;
    var utterThis = new SpeechSynthesisUtterance (speak_data);
    synth.speak(utterThis);
}