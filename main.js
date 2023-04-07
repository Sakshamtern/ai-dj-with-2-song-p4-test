Un_Poco_Loco = "";
Whopper = "";

scoreLeftWrist = 0;

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

function preload()
{
    Un_Poco_Loco = loadSound("Un Poco Loco Coco.mp3");
    Whopper = loadSound("Whopper.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("model is initialized");
}

function draw()
{
    image(video, 0, 0, 600, 500);
    
    fill("#FF0000");
    stroke("#FF0000");

    song1 = Un_Poco_Loco.isPlaying();

    if(scoreLeftWrist > 0.2)
    {
    circle(leftWristX, leftWristY, 20);

    Whopper.stop();
    }

    if(song1 = false)
    {
        Un_Poco_Loco.play();

        document.getElementById("song_name").innerHTML = "Song name = " + Un_Poco_Loco;
    }

}

function gotPoses(results)
{
    if(results.length > 0)
    {

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}
