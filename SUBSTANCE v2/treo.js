
// Pill Sound variables

var treo;
var levelsB;

// B(treo) InBetween or isLeft/Right
var isInBetweenB = false;
var isLeftB= false;
var isRightB = false;



// PillB treo vars

var xPosPillB = 100;
var yPosPillB = 300;
var tabletRadiusB = 50;
var xSpeedB = 3;
var ySpeedB = 5;
var distanceB;
var distanceBFromWater;
var distanceBFromGlass;
var isMousePressedB = false;
var isPlayingB = false;
var isUnderWaterB = false;
var isOutsideGlassB = true;
var pillAAlfaB = 300;

//Pill B treo dissolve vars
var trackLenghtB;
var currentTimeB;
var timeLeftB;
var timeLeftBmapped;

// Gravity pill B TREO
var accelerationB;


//Bubbles B
var time;


// PILL B FUNCTIONS
function pillRestrictionsB() {
  

  // stay to the right
  if (
    xPosPillB + tabletRadiusB / 2 > xLstartLeft &&
    yPosPillB > yLstartLeft - tabletRadiusB / 2 &&
    isInBetweenB === false &&
    isLeftB=== true
  ) {
    xPosPillB = xLstartLeft - tabletRadiusB / 2;
    fill(255, 0, 0);
  }

  //Stay left
  if (
    xPosPillB - tabletRadiusB / 2 < xLstartRight &&
    yPosPillB > yLstartRight - tabletRadiusB / 2 &&
    isInBetweenB === false &&
    isRightB === true
  ) {
    xPosPillB = xLstartRight + tabletRadiusB / 2;
    fill(0, 0, 255);
  }

  // set not go left if in between
  if (
    isInBetweenB === true &&
    yPosPillB > yLstartLeft &&
    xPosPillB + tabletRadiusB / 2 < xLstartLeft + tabletRadiusB
  ) {
    xPosPillB = xLstartLeft + tabletRadiusB / 2;
  }

  // set not go right if in between
  if (
    isInBetweenB === true &&
    yPosPillB > yLstartRight &&
    xPosPillB - tabletRadiusB / 2 > xLstartRight - tabletRadiusB
  ) {
    xPosPillB = xLstartRight - tabletRadiusB / 2;
  }

  // is in middle
  if (
    xPosPillB - tabletRadiusB / 2 > xLstartLeft &&
    xPosPillB + tabletRadiusB / 2 < xLstartRight
  ) {
    isInBetweenB = true;
    isLeftB= false;
    isRightB = false;
  }
  //is left
  if (xPosPillB + tabletRadiusB / 2 < xLstartLeft) {
    isLeftB= true;
    isRightB = false;
  }

  // is right
  if (xPosPillB - tabletRadiusB / 2 > xLstartRight) {
    isLeftB= false;
    isRightB = true;
  }

  // set no in between
  if (
    xPosPillB + tabletRadiusB / 2 < xLstartLeft ||
    xPosPillB - tabletRadiusB / 2 > xLstartRight
  ) {
    isInBetweenB = false;
  }
}

// PILL B FUNCTION
function pillB() {

  fill(255, 255, 204, pillAAlfaB);
  stroke(100, pillAAlfaB);
  strokeWeight(1)
  ellipse(xPosPillB, yPosPillB, tabletRadiusB);
  

  strokeWeight(2);
  stroke(0);
  distanceBFromMouse = dist(xPosPillB, yPosPillB, mouseX, mouseY);
  distanceBFromGround = dist(0, yPosPillB, 0, glassYPos + glassHeight / 2);
  distanceBFromWater = dist(
    xPosPillB,
    yPosPillB,
    windowWidth / 2,
    glassYPos + 35
  );
  // // distanceBFromGlass = dist(xPosPillB, 0, xLstartRight, 0);

  if (distanceBFromWater < 70 && isPlayingB == false) {
    treo.play();
    ySpeedB = 0.5;
    accelerationB = 0;
    isPlayingB = true;
    isUnderWaterB = true;
  }

  if (distanceBFromWater > 70 && isPlayingB == true) {
    treo.stop();
    isPlayingB = false;
    isUnderWaterB = false;
    accelerationB = tabletRadiusB * 0.008
  }

  if (distanceBFromGround > tabletRadiusB / 2 +1 && isMousePressedB !== true ) {
    ySpeedB = ySpeedB + accelerationB
    yPosPillB = yPosPillB + ySpeedB
  } else if(distanceBFromGround < tabletRadiusB){
    ySpeedB = 0.5 } 

  if (distanceBFromMouse < tabletRadiusB / 2 && isMousePressedB === true && holdingPill === false) {
    xPosPillB = mouseX;
    yPosPillB = mouseY;
    treoText ()
    holdingPill = true;
  } 

  if (isUnderWaterB === true) {
    xPosPillB = xPosPillB + random(-1, 1);
    bubblesB()
  }
}





// Pill B bubbels
function bubblesB() {
  for (let i = 0; i < 7; i++) {
    stroke(190, 200);
    strokeWeight(1);
    noFill();
    ellipse(
      xPosPillB + random(-25, 25),
      yPosPillB - 10 + random(-55, 15),
      random(1, 3)
    );
  }
}


//Dissolve B function
function dissolveB() {
  trackLenghtB = treo.duration();
  currentTimeB = treo.currentTime();
  timeLeftB = trackLenghtB - currentTimeB;
  timeLeftBmapped = map(timeLeftB, 0, trackLenghtB, 0, 300);
  pillAAlfaB = timeLeftBmapped;
  if (timeLeftBmapped < 1) {
    isInBetweenB = false;

    xPosPillB = 30000;
    yPosPillB = 400;
  }
}

//TEXT B FUNCTIONS
// Treo
function treoText (){
    fill(100)
    noStroke()
    textSize(15)
    text("Treo", 200,100)
    textSize(10)
    text("acetylsalicylic acid 500 mg", 200,120)
}