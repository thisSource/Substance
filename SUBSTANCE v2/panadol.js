
//PILL E PANADOL

// Pill Sound variables

var panadol;
var levelsE;

// D(Panadol) InBetween or isLeft/Right
var isInBetweenE = false;
var isLeftE= false;
var isRightE = false;



// PillE Panadol vars

var xPosPillE = 100;
var yPosPillE = 300;
var tabletRadiusE = 157;
var xSpeedE = 3;
var ySpeedE = 5;
var distanceE;
var distanceEFromWater;
var distanceEFromGlass;
var isMousePressedE = false;
var isPlayingE = false;
var isUnderWaterE = false;
var isOutsideGlassE = true;
var pillAAlfaE = 300;

//Pill D Panadol dissolve vars
var trackLenghtE;
var currentTimeE;
var timeLeftE;
var timeLeftEmapped;

// Gravity pill D Panadol
var accelerationD;

//Bubbles D
var time;


// PILLD FUNCTIONS
function pillRestrictionsE() {
  

  // stay to the right
  if (
    xPosPillE + tabletRadiusE / 2 > xLstartLeft &&
    yPosPillE > yLstartLeft - tabletRadiusE / 2 &&
    isInBetweenE === false &&
    isLeftE=== true
  ) {
    xPosPillE = xLstartLeft - tabletRadiusE / 2;
    fill(255, 0, 0);
  }

  //Stay left
  if (
    xPosPillE - tabletRadiusE / 2 < xLstartRight &&
    yPosPillE > yLstartRight - tabletRadiusE / 2 &&
    isInBetweenE === false &&
    isRightE === true
  ) {
    xPosPillE = xLstartRight + tabletRadiusE / 2;
    fill(0, 0, 255);
  }

  // set not go left if in between
  if (
    isInBetweenE === true &&
    yPosPillE > yLstartLeft &&
    xPosPillE + tabletRadiusE / 2 < xLstartLeft + tabletRadiusE
  ) {
    xPosPillE = xLstartLeft + tabletRadiusE / 2;
  }

  // set not go right if in between
  if (
    isInBetweenE === true &&
    yPosPillE > yLstartRight &&
    xPosPillE - tabletRadiusE / 2 > xLstartRight - tabletRadiusE
  ) {
    xPosPillE = xLstartRight - tabletRadiusE / 2;
  }

  // is in middle
  if (
    xPosPillE - tabletRadiusE / 2 > xLstartLeft &&
    xPosPillE + tabletRadiusE / 2 < xLstartRight
  ) {
    isInBetweenE = true;
    isLeftE= false;
    isRightE = false;
  }
  //is left
  if (xPosPillE + tabletRadiusE / 2 < xLstartLeft) {
    isLeftE= true;
    isRightE = false;
  }

  // is right
  if (xPosPillE - tabletRadiusE / 2 > xLstartRight) {
    isLeftE= false;
    isRightE = true;
  }

  // set no in between
  if (
    xPosPillE + tabletRadiusE / 2 < xLstartLeft ||
    xPosPillE - tabletRadiusE / 2 > xLstartRight
  ) {
    isInBetweenE = false;
  }
}




// PILL E FUNCTION
function pillE() {
  ySpeedE = ySpeedE * 0.9999
  fill(255, 242, 230, pillAAlfaE);
  stroke(100, pillAAlfaE);
  strokeWeight(1)
  ellipse(xPosPillE, yPosPillE, tabletRadiusE);

  strokeWeight(2);
  stroke(0);
  distanceEFromMouse = dist(xPosPillE, yPosPillE, mouseX, mouseY);
  distanceEFromGround = dist(0, yPosPillE, 0, glassYPos + glassHeight / 2);
  distanceEFromWater = dist(
    xPosPillE,
    yPosPillE,
    windowWidth / 2,
    glassYPos + 55
  );
  // // distanceEFromGlass = dist(xPosPillE, 0, xLstartRight, 0);

  if (distanceEFromWater < 70 && isPlayingE == false) {
    panadol.play();
    ySpeedE = 0.5;
    accelerationE = 0;
    isPlayingE = true;
    isUnderWaterE = true;
  }

  if (distanceEFromWater > 70 && isPlayingE == true) {
    panadol.stop();
    isPlayingE = false;
    isUnderWaterE = false;
    accelerationE = tabletRadiusE * 0.004
  }

  if (distanceEFromGround > tabletRadiusE / 2 +1 && isMousePressedE !== true) {
    ySpeedE = ySpeedE + accelerationE
    yPosPillE = yPosPillE + ySpeedE
  } else if(distanceEFromGround < tabletRadiusE ){
    ySpeedE = 0.5 } 

  if (distanceEFromMouse < tabletRadiusE / 2 && isMousePressedE === true &&  holdingPill === false) {
    xPosPillE = mouseX;
    yPosPillE = mouseY;
    holdingPill = true
    panadolText ()
  } 

  if (isUnderWaterE === true) {
    xPosPillE = xPosPillE + random(-1, 1);
    bubblesE()
  }
}





// Pill E bubbels
function bubblesE() {
  for (let i = 0; i < 7; i++) {
    stroke(190, 200);
    strokeWeight(1);
    noFill();
    ellipse(
      xPosPillE + random(-25, 25),
      yPosPillE + random(-55, 15),
      random(1, 3)
    );
  }
}


//Dissolve E function
function dissolveE() {
  trackLenghtE = panadol.duration();
  currentTimeE = panadol.currentTime();
  timeLeftE = trackLenghtE - currentTimeE;
  timeLeftEmapped = map(timeLeftE, 0, trackLenghtE, 0, 300);
  pillAAlfaE = timeLeftEmapped;
  if (timeLeftEmapped < 1) {
    isInBetweenE = false;

    xPosPillE = 30000;
    yPosPillE = 400;
  }
}

//TEXT B FUNCTIONS
// Treo
function panadolText (){
    fill(100)
    noStroke()
    textSize(15)
    text("Panadol", 200,100)
    textSize(10)
    text("Paracetamol 500 mg", 200,120)
}