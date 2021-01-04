// PILL C BAMYL


// Pill C  Sound variables

var bamyl;
var levelsC;

// C(bamyl) InBetween or isLeft/Right
var isInBetweenC = false;
var isLeftC= false;
var isRightC = false;



// PillC treo vars

var xPosPillC = 200;
var yPosPillC = 300;
var tabletRadiusC = 45;
var xSpeedC = 3;
var ySpeedC = 5;
var distanceC;
var distanceCFromWater;
var distanceCFromGlass;
var isMousePressedC = false;
var isPlayingC = false;
var isUnderWaterC = false;
var isOutsideGlassC = true;
var pillAAlfaC = 300;

//Pill C treo dissolve vars
var trackLenghtC;
var currentTimeC;
var timeLeftC;
var timeLeftCmapped;

// Gravity pill C Bamyl
var accelerationC;

//Bubbles C
var time;


// PILL C FUNCTIONS
function pillRestrictionsC() {

  // stay to the right
  if (
    xPosPillC + tabletRadiusC / 2 > xLstartLeft &&
    yPosPillC > yLstartLeft - tabletRadiusC / 2 &&
    isInBetweenC === false &&
    isLeftC=== true
  ) {
    xPosPillC = xLstartLeft - tabletRadiusC / 2;
    fill(255, 0, 0);
  }

  //Stay left
  if (
    xPosPillC - tabletRadiusC / 2 < xLstartRight &&
    yPosPillC > yLstartRight - tabletRadiusC / 2 &&
    isInBetweenC === false &&
    isRightC === true
  ) {
    xPosPillC = xLstartRight + tabletRadiusC / 2;
    fill(0, 0, 255);
  }

  // set not go left if in between
  if (
    isInBetweenC === true &&
    yPosPillC > yLstartLeft &&
    xPosPillC + tabletRadiusC / 2 < xLstartLeft + tabletRadiusC
  ) {
    xPosPillC = xLstartLeft + tabletRadiusC / 2;
  }

  // set not go right if in between
  if (
    isInBetweenC === true &&
    yPosPillC > yLstartRight &&
    xPosPillC - tabletRadiusC / 2 > xLstartRight - tabletRadiusC
  ) {
    xPosPillC = xLstartRight - tabletRadiusC / 2;
  }

  // is in middle
  if (
    xPosPillC - tabletRadiusC / 2 > xLstartLeft &&
    xPosPillC + tabletRadiusC / 2 < xLstartRight
  ) {
    isInBetweenC = true;
    isLeftC= false;
    isRightC = false;
  }
  //is left
  if (xPosPillC + tabletRadiusC / 2 < xLstartLeft) {
    isLeftC= true;
    isRightC = false;
  }

  // is right
  if (xPosPillC - tabletRadiusC / 2 > xLstartRight) {
    isLeftC= false;
    isRightC = true;
  }

  // set no in between
  if (
    xPosPillC + tabletRadiusC / 2 < xLstartLeft ||
    xPosPillC - tabletRadiusC / 2 > xLstartRight
  ) {
    isInBetweenC = false;
  }
}

// PILL C FUNCTION
function pillC() {
  fill(255, 230, 255, pillAAlfaC);
  stroke(100, pillAAlfaC);
  strokeWeight(1)
  ellipse(xPosPillC, yPosPillC, tabletRadiusC);

  strokeWeight(2);
  stroke(0);
  distanceCFromMouse = dist(xPosPillC, yPosPillC, mouseX, mouseY);
  distanceCFromGround = dist(0, yPosPillC, 0, glassYPos + glassHeight / 2);
  distanceCFromWater = dist(
    xPosPillC,
    yPosPillC,
    windowWidth / 2,
    glassYPos + 55
  );
  // // distanceCFromGlass = dist(xPosPillC, 0, xLstartRight, 0);

  if (distanceCFromWater < 70 && isPlayingC == false) {
    bamyl.play();
    ySpeedC = 0.5;
    accelerationC = 0;
    isPlayingC = true;
    isUnderWaterC = true;
  }

  if (distanceCFromWater > 70 && isPlayingC == true) {
    bamyl.stop();
    isPlayingC = false;
    isUnderWaterC = false;
    accelerationC = tabletRadiusC * 0.008
  }

  if (distanceCFromGround > tabletRadiusC / 2 +1 && isMousePressedC !== true ) {
    ySpeedC = ySpeedC + accelerationC
    yPosPillC = yPosPillC + ySpeedC
  } else if(distanceCFromGround < tabletRadiusC){
    ySpeedC = 0.5 } 

  if (distanceCFromMouse < tabletRadiusC / 2 && isMousePressedC === true && holdingPill === false) {
    xPosPillC = mouseX;
    yPosPillC = mouseY;
    holdingPill = true
    bamylText ()
  } 

  if (isUnderWaterC === true) {
    xPosPillC = xPosPillC + random(-1, 1);
    bubblesC()
  }
}





// Pill B bubbels
function bubblesC() {
  for (let i = 0; i < 7; i++) {
    stroke(190, 200);
    strokeWeight(1);
    noFill();
    ellipse(
      xPosPillC + random(-25, 25),
      yPosPillC + random(-55, 15),
      random(1, 3)
    );
  }
}


//Dissolve B function
function dissolveC() {
  trackLenghtC = bamyl.duration();
  currentTimeC = bamyl.currentTime();
  timeLeftC = trackLenghtC - currentTimeC;
  timeLeftCmapped = map(timeLeftC, 0, trackLenghtC, 0, 300);
  pillAAlfaC = timeLeftCmapped;
  if (timeLeftCmapped < 1) {
    isInBetweenC = false;

    xPosPillC = 30000;
    yPosPillC = 400;
  }
}

//TEXT B FUNCTIONS
// Treo
function bamylText (){
    fill(100)
    noStroke()
    textSize(15)
    text("Bamyl koffein", 200,100)
    textSize(10)
    text("acetylsalicylic acid 500 mg", 200,120)
}2