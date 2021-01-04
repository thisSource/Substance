// PILL D ALVEDON
// Pill Sound variables

var alvedon;
var levelsD;

// B(treo) InBetween or isLeft/Right
var isInBetweenD = false;
var isLeftD= false;
var isRightD = false;



// PillB treo vars

var xPosPillD = 100;
var yPosPillD = 300;
var tabletRadiusD = 50;
var xSpeedD = 3;
var ySpeedD = 5;
var distanceD;
var distanceDFromWater;
var distanceDFromGlass;
var isMousePressedD = false;
var isPlayingD = false;
var isUnderWaterD = false;
var isOutsideGlassD = true;
var pillAAlfaD = 300;

//Pill D Alvedon dissolve vars
var trackLenghtD;
var currentTimeD;
var timeLeftD;
var timeLeftDmapped;

// Gravity pill D ALVEDON
var accelerationD;

//Bubbles D
var time;


// PILL D FUNCTIONS
function pillRestrictionsD() {
  

  // stay to the right
  if (
    xPosPillD + tabletRadiusD / 2 > xLstartLeft &&
    yPosPillD > yLstartLeft - tabletRadiusD / 2 &&
    isInBetweenD === false &&
    isLeftD=== true
  ) {
    xPosPillD = xLstartLeft - tabletRadiusD / 2;
    fill(255, 0, 0);
  }

  //Stay left
  if (
    xPosPillD - tabletRadiusD / 2 < xLstartRight &&
    yPosPillD > yLstartRight - tabletRadiusD / 2 &&
    isInBetweenD === false &&
    isRightD === true
  ) {
    xPosPillD = xLstartRight + tabletRadiusD / 2;
    fill(0, 0, 255);
  }

  // set not go left if in between
  if (
    isInBetweenD === true &&
    yPosPillD > yLstartLeft &&
    xPosPillD + tabletRadiusD / 2 < xLstartLeft + tabletRadiusD
  ) {
    xPosPillD = xLstartLeft + tabletRadiusD / 2;
  }

  // set not go right if in between
  if (
    isInBetweenD === true &&
    yPosPillD > yLstartRight &&
    xPosPillD - tabletRadiusD / 2 > xLstartRight - tabletRadiusD
  ) {
    xPosPillD = xLstartRight - tabletRadiusD / 2;
  }

  // is in middle
  if (
    xPosPillD - tabletRadiusD / 2 > xLstartLeft &&
    xPosPillD + tabletRadiusD / 2 < xLstartRight
  ) {
    isInBetweenD = true;
    isLeftD= false;
    isRightD = false;
  }
  //is left
  if (xPosPillD + tabletRadiusD / 2 < xLstartLeft) {
    isLeftD= true;
    isRightD = false;
  }

  // is right
  if (xPosPillD - tabletRadiusD / 2 > xLstartRight) {
    isLeftD= false;
    isRightD = true;
  }

  // set no in between
  if (
    xPosPillD + tabletRadiusD / 2 < xLstartLeft ||
    xPosPillD - tabletRadiusD / 2 > xLstartRight
  ) {
    isInBetweenD = false;
  }
}



// PILL B FUNCTION
function pillD() {
  fill(230, 242, 255, pillAAlfaD);
  stroke(100, pillAAlfaD);
  strokeWeight(1)
  ellipse(xPosPillD, yPosPillD, tabletRadiusD);

  strokeWeight(2);
  stroke(0);
  distanceDFromMouse = dist(xPosPillD, yPosPillD, mouseX, mouseY);
  distanceDFromGround = dist(0, yPosPillD, 0, glassYPos + glassHeight / 2);
  distanceDFromWater = dist(
    xPosPillD,
    yPosPillD,
    windowWidth / 2,
    glassYPos + 55
  );
  // // distanceDFromGlass = dist(xPosPillD, 0, xLstartRight, 0);

  if (distanceDFromWater < 70 && isPlayingD == false) {
    alvedon.play();
    ySpeedD = 0.5;
    accelerationD = 0;
    isPlayingD = true;
    isUnderWaterD = true;
  }

  if (distanceDFromWater > 70 && isPlayingD == true) {
    alvedon.stop();
    isPlayingD = false;
    isUnderWaterD = false;
    accelerationD = tabletRadiusD * 0.006
  }

  if (distanceDFromGround > tabletRadiusD / 2 +1 && isMousePressedD !== true ) {
    ySpeedD = ySpeedD + accelerationD
    yPosPillD = yPosPillD + ySpeedD
  } else if(distanceDFromGround < tabletRadiusD){
    ySpeedD = 0.5 } 

  if (distanceDFromMouse < tabletRadiusD / 2 && isMousePressedD === true && holdingPill === false) {
    xPosPillD = mouseX;
    yPosPillD = mouseY;
    holdingPill = true
    alvedonText ()
  } 

  if (isUnderWaterD === true) {
    xPosPillD = xPosPillD + random(-1, 1);
    bubblesD()
  }
}





// Pill B bubbels
function bubblesD() {
  for (let i = 0; i < 7; i++) {
    stroke(190, 200);
    strokeWeight(1);
    noFill();
    ellipse(
      xPosPillD + random(-25, 25),
      yPosPillD - 10 + random(-55, 15),
      random(1, 3)
    );
  }
}


//Dissolve B function
function dissolveD() {
  trackLenghtD = alvedon.duration();
  currentTimeD = alvedon.currentTime();
  timeLeftD = trackLenghtD - currentTimeD;
  timeLeftDmapped = map(timeLeftD, 0, trackLenghtD, 0, 300);
  pillAAlfaD = timeLeftDmapped;
  if (timeLeftDmapped < 1) {
    isInBetweenD = false;

    xPosPillD = 30000;
    yPosPillD = 400;
  }
}

//TEXT B FUNCTIONS
// Treo
function alvedonText (){
    fill(100)
    noStroke()
    textSize(15)
    text("Alvedon", 200,100)
    textSize(10)
    text("Paracetamol 500 mg", 200,120)
}