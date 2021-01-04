// THE GLASS VARIABLES
//Glass outlines
var glassXPos = 0;
var glassYPos = 470;
var glassWidth = 170;
var glassHeight = 250;

// THE PILL VARIABLES
//Glass borders (Pill restrictions)
//Left
var xLstartLeft;
var yLstartLeft;
var xLendLeft;
var yLendLeft;
//Right
var xLstartRight;
var yLstartRight;
var xLendRight;
var yLendRight;

// InBetween or isLeft/Right
var isInBetween = false;
var isLeft = false;
var isRight = false;

// Pill Sound variables
var aspirinC;
var aspirinC2;
var getRandom;
var vol = 1;
var levelsA;

// Window vars
var orgWidth = 1396;
var orgHeight = 741;

var relWidth;
var relHeight;

function getRandomFunc() {
  getRandom = random(-10, 10);
}

var amp;

function preload() {
  aspirinC = loadSound("ASPIRINCforWeb.mp3");
  treo = loadSound("TREOforWeb.mp3");
  bamyl = loadSound("BAMYLforWeb.mp3");
  alvedon = loadSound("ALVEDONforWeb.mp3");
  panadol = loadSound("PANADOLforWeb.mp3");
}

// PillA vars

var holdingPill = false;

var xPosPillA;
var yPosPillA;
var tabletRadiusA = 60;
var xSpeed = 3;
var ySpeed = 5;
var distance;
var distanceFromWater;
var distanceFromGlass;
var isMousePressed = false;
var isPlaying = false;
var isUnderWater = false;
var isOutsideGlass = true;
var pillAAlfa = 300;

//Pill A dissolve vars
var trackLenghtA;
var currentTimeA;
var timeLeftA;
var timeLeftAmapped;

//Pill A Gravity
var accelerationA;

//Bubbles
var time;
var distFromGlassA = 200;



function setup() {
  createCanvas(windowWidth, windowHeight);

  //Gravity Pill A
  accelerationA = tabletRadiusA * 0.008;
  accelerationB = tabletRadiusB * 0.008;
  accelerationC = tabletRadiusC * 0.008;
  accelerationD = tabletRadiusD * 0.006;
  accelerationE = tabletRadiusE * 0.004;

  // Load Sound Object
  amp = new p5.Amplitude();

  //   Setting pill restriction variabls
  xLstartLeft = windowWidth / 2 - 85;
  yLstartLeft = windowHeight / 2 - 30;
  xLendLeft = windowWidth / 2 - 85;
  yLendLeft = windowHeight - 155;

  xLstartRight = windowWidth / 2 + 85;
  yLstartRight = windowHeight / 2 - 30;
  xLendRight = windowWidth / 2 + 85;
  yLendRight = windowHeight - 155;

  // Set pill ALL start pos

  xPosPillA = xLendLeft - 200 * (windowWidth / orgWidth);
  yPosPillA = yLendLeft - 10;
  xPosPillB = xLendLeft - 350 * (windowWidth / orgWidth);
  yPosPillB = yLendLeft - 10;
  xPosPillC = xLendLeft - 450 * (windowWidth / orgWidth);
  yPosPillC = yLendLeft - 10;
  xPosPillD = xLendLeft + 320 * (windowWidth / orgWidth);
  yPosPillD = yLendLeft - 10;
  xPosPillE = xLendLeft + 450 * (windowWidth / orgWidth);
  yPosPillE = yLendLeft - 10;
}

function draw() {
  holdingPill = false;



  setResizeVars();
  varResizeGlass();
  varResizePills();

  background(230);
  glassColor();
  dissolveA();
  dissolveB();
  dissolveC();
  dissolveD();
  dissolveE();
  theGlass();
  glassTopArc();
  glassBottomTopArc();
  pill();
  pillB();
  pillD();
  pillC();
  pillE();

  glassBottomArc();

  pillRestrictions();
  pillRestrictionsB();
  pillRestrictionsC();
  pillRestrictionsD();
  pillRestrictionsE();

  pillOutOfScopeA();
  water();
  glassBottomBottomArc();
  waterLine();

// device detection
  if (windowHeight < 500 || windowWidth < 550){
    background (230)
    fill(80)
    noStroke()
    text("please increase your window size ", windowWidth/2,windowHeight/2)
  }

  
  if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
      || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
        background (230)
    fill(80)
    noStroke()
        text("your phone or tablet is not good for this site ", 20,windowHeight/2-40)

        text("available on your computer, enjoy", 20, windowHeight/2-10)

  }



}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//Calculate re-size functions
function setResizeVars() {
  relWidth = windowWidth / orgWidth;
  relHeight = windowHeight / orgHeight;
}

function varResizeGlass() {
  glassXPos = 0 * relWidth;
  glassYPos = 470 * relHeight;
  glassWidth = 170 * relWidth;
  glassHeight = 250 * relHeight;

  xLstartLeft = windowWidth / 2 - 85 * relWidth;
  yLstartLeft = windowHeight / 2 - 30 * relHeight;
  xLendLeft = windowWidth / 2 - 85 * relWidth;
  yLendLeft = windowHeight - 155 * relHeight;

  xLstartRight = windowWidth / 2 + 85 * relWidth;
  yLstartRight = windowHeight / 2 - 30 * relHeight;
  xLendRight = windowWidth / 2 + 85 * relWidth;
  yLendRight = windowHeight - 155 * relHeight;
}

function varResizePills() {
  tabletRadiusA = 85 * relWidth * relHeight;
  tabletRadiusB = 70 * relWidth * relHeight;
  tabletRadiusC = 60 * relWidth * relHeight;
  tabletRadiusD = 65 * relWidth * relHeight;
  tabletRadiusE = 55 * relWidth * relHeight;
}

// PILL FUNCTIONS
//Pill limit functions
function pillRestrictions() {
  //stroke(22, 26, 166);
  stroke(100);
  strokeWeight(2);
  line(xLstartLeft, yLstartLeft, xLendLeft, yLendLeft);
  line(xLstartRight, yLstartRight, xLendRight, yLendRight);

  // stay to the right
  if (
    xPosPillA + tabletRadiusA / 2 > xLstartLeft &&
    yPosPillA > yLstartLeft - tabletRadiusA / 2 &&
    isInBetween === false &&
    isLeft === true
  ) {
    xPosPillA = xLstartLeft - tabletRadiusA / 2;
    fill(255, 0, 0);
  }

  //Stay left
  if (
    xPosPillA - tabletRadiusA / 2 < xLstartRight &&
    yPosPillA > yLstartRight - tabletRadiusA / 2 &&
    isInBetween === false &&
    isRight === true
  ) {
    xPosPillA = xLstartRight + tabletRadiusA / 2;
    fill(0, 0, 255);
  }

  // set not go left if in between
  if (
    isInBetween === true &&
    yPosPillA > yLstartLeft &&
    xPosPillA + tabletRadiusA / 2 < xLstartLeft + tabletRadiusA
  ) {
    xPosPillA = xLstartLeft + tabletRadiusA / 2;
  }

  // set not go right if in between
  if (
    isInBetween === true &&
    yPosPillA > yLstartRight &&
    xPosPillA - tabletRadiusA / 2 > xLstartRight - tabletRadiusA
  ) {
    xPosPillA = xLstartRight - tabletRadiusA / 2;
  }

  // is in middle
  if (
    xPosPillA - tabletRadiusA / 2 > xLstartLeft &&
    xPosPillA + tabletRadiusA / 2 < xLstartRight
  ) {
    isInBetween = true;
    isLeft = false;
    isRight = false;
  }
  //is left
  if (xPosPillA + tabletRadiusA / 2 < xLstartLeft) {
    isLeft = true;
    isRight = false;
  }

  // is right
  if (xPosPillA - tabletRadiusA / 2 > xLstartRight) {
    isLeft = false;
    isRight = true;
  }

  // set no in between
  if (
    xPosPillA + tabletRadiusA / 2 < xLstartLeft ||
    xPosPillA - tabletRadiusA / 2 > xLstartRight
  ) {
    isInBetween = false;
  }
}

// Define lower limit for pills
function pillOutOfScopeA() {
  if (yPosPillA + tabletRadiusA / 2 > yLendLeft) {
    yPosPillA = yLendLeft - tabletRadiusA / 2 - 1 * relHeight;
  }
  if (yPosPillB + tabletRadiusB / 2 > yLendLeft) {
    yPosPillB = yLendLeft - tabletRadiusB / 2 - 1 * relHeight;
  }
  if (yPosPillC + tabletRadiusC / 2 > yLendLeft) {
    yPosPillC = yLendLeft - tabletRadiusC / 2 - 1 * relHeight;
  }
  if (yPosPillD + tabletRadiusD / 2 > yLendLeft) {
    yPosPillD = yLendLeft - tabletRadiusD / 2 - 1 * relHeight;
  }
  if (yPosPillE + tabletRadiusE / 2 > yLendLeft) {
    yPosPillE = yLendLeft - tabletRadiusE / 2 - 1 * relHeight;
  }
}

// PILL FUNCTION
function pill() {
  fill(230, 255, 230, pillAAlfa);
  stroke(100, pillAAlfa);
  strokeWeight(1);
  ellipse(xPosPillA, yPosPillA, tabletRadiusA);

  strokeWeight(2);
  stroke(0);
  distanceFromMouse = dist(xPosPillA, yPosPillA, mouseX, mouseY);
  distanceFromGround = dist(0, yPosPillA, 0, glassYPos + glassHeight / 2);
  distanceFromWater = dist(
    xPosPillA,
    yPosPillA,
    windowWidth / 2,
    glassYPos + 35
  );
  // distanceFromGlass = dist(xPosPillA, 0, xLstartRight, 0);

  if (distanceFromWater < 70 && isPlaying == false) {
    aspirinC.play();
    ySpeed = 0.5;
    accelerationA = 0;
    isPlaying = true;
    isUnderWater = true;
  }

  if (distanceFromWater > 70 && isPlaying == true) {
    aspirinC.stop();
    isPlaying = false;
    isUnderWater = false;
    accelerationA = tabletRadiusA * 0.008;
  }

  if (distanceFromGround > tabletRadiusA / 2 + 1 && isMousePressed === false) {
    //yPosPillA = yPosPillA + ySpeed;
    ySpeed = ySpeed + accelerationA;
    yPosPillA = yPosPillA + ySpeed;
  } else if (distanceFromGround < tabletRadiusA) {
    ySpeed = 0.5;
  }

  if (
    distanceFromMouse < tabletRadiusA / 2 &&
    isMousePressed === true &&
    holdingPill === false
  ) {
    xPosPillA = mouseX;
    yPosPillA = mouseY;
    holdingPill = true;
    aspirinCText();
  }

  if (isUnderWater === true) {
    xPosPillA = xPosPillA + random(-1, 1);
    bubbles();
  }
}

// PILL grab and release functions
function mousePressed() {
  if (distanceFromMouse < tabletRadiusA) {
    isMousePressed = true;
  }

  if (distanceBFromMouse < tabletRadiusB) {
    isMousePressedB = true;
  }
  if (distanceCFromMouse < tabletRadiusC) {
    isMousePressedC = true;
  }

  if (distanceDFromMouse < tabletRadiusD) {
    isMousePressedD = true;
  }

  if (distanceEFromMouse < tabletRadiusE) {
    isMousePressedE = true;
  }
  playAudioAll()
}

function mouseReleased() {
  isMousePressed = false;
  isMousePressedB = false;
  isMousePressedC = false;
  isMousePressedD = false;
  isMousePressedE = false;

}

// WATER FUNCTION
function water() {
  //Water
  noStroke();
  //fill(214, 231, 255, 150);
  fill(218, 226, 237, 150);
  //rect(windowWidth / 2, glassYPos + 75, 169, 101);

  rect(
    xLstartLeft + 85 * relWidth,
    yLstartLeft + 180 * relHeight,
    169 * relWidth,
    141 * relHeight
  );
}

//GLASS FUNCTIONS
function theGlass() {
  //Bottom box
  strokeWeight(1.4);
  //stroke(24, 29, 150  );
  stroke(100);
  noFill();
  fill(210);
  rect(0, glassYPos + glassHeight / 2 + 50, windowWidth * 2, 220 * relHeight);

  stroke(0);
  strokeWeight(2);

  //glassbody
  rectMode(CENTER);

  stroke(0);
  strokeWeight(2);
  noStroke();
  noFill();
  rect(xLstartLeft, glassYPos, glassWidth, glassHeight);
}

// Glass color function
function glassColor() {
  rectMode(CORNER);
  noStroke();
  fill(240);
  rect(xLstartLeft, yLstartLeft, glassWidth, glassHeight);
  rectMode(CENTER);
}

var aaaa = xLstartLeft + 85;
//TopArc functions
function glassTopArc() {
  noFill();
  fill(240);
  stroke(100);
  strokeWeight(1.2);
  arc(
    xLstartLeft + 85 * relWidth,
    yLstartLeft,
    170 * relWidth,
    20 * relHeight,
    PI,
    PI + QUARTER_PI * 4
  );
}
function glassBottomArc() {
  noFill();
  stroke(100);
  strokeWeight(2);
  arc(
    xLstartLeft + 85 * relWidth,
    yLstartLeft,
    170 * relWidth,
    -20 * relHeight,
    0,
    PI * 2 + QUARTER_PI * 4
  );
}

//BottomArc functions
function glassBottomTopArc() {
  noFill();
  stroke(100);
  strokeWeight(1.2);
  arc(
    xLstartLeft + 85 * relWidth,
    yLendLeft,
    170 * relWidth,
    20 * relHeight,
    PI,
    PI + QUARTER_PI * 4
  );
}
function glassBottomBottomArc() {
  fill(218, 226, 237, 150);
  stroke(100);
  strokeWeight(2);
  arc(
    xLstartLeft + 85 * relWidth,
    yLendLeft,
    170 * relWidth,
    -20 * relHeight,
    0,
    PI * 2 + QUARTER_PI * 4
  );
}

// Pill A bubbels
function bubbles() {
  for (let i = 0; i < 7; i++) {
    stroke(180, 200);
    strokeWeight(1);
    noFill();
    ellipse(
      xPosPillA + random(-25, 25),
      yPosPillA - 10 + random(-55, 15),
      random(1, 3)
    );
  }
}
xLstartLeft + 85, yLstartLeft + 200;

// WATER LINE function
function waterLine() {
  levelsA = amp.getLevel() * 200;
  levelsB = amp.getLevel() * 200;
  levelsC = amp.getLevel() * 200;
  levelsD = amp.getLevel() * 200;
  levelsE = amp.getLevel() * 200;
  let strokeForwaterLine = 1.3;
  stroke(100);
  if (
    isUnderWater === true ||
    isUnderWaterB === true ||
    isUnderWaterC === true ||
    isUnderWaterD === true ||
    isUnderWaterE === true
  ) {
    // xLstartLeft + 85 * relWidth,
    // yLstartLeft + 180 * relHeight,
    // 169 * relWidth,
    // 141 * relHeight

    strokeWeight(strokeForwaterLine);
    for (let i = xLstartLeft; i < xLendRight; i = i + 1) {
      point(
        0 + i,
        yLstartLeft + 111 * relHeight + random(-0.7 * levelsA * levelsB, 1.2)
      );
    }
    strokeWeight(strokeForwaterLine);
    for (let i = xLstartLeft; i < xLendRight; i = i + 3) {
      point(
        0 + i,
        yLstartLeft + 111 * relHeight + random(-1.2 * levelsA * levelsB, 0.7)
      );
    }
  } else {
    strokeWeight(strokeForwaterLine);
    for (let i = xLstartLeft; i < xLendRight; i = i + 2) {
      point(0 + i, yLstartLeft + 111 * relHeight);
    }
    strokeWeight(strokeForwaterLine);
    for (let i = xLstartLeft; i < xLendRight; i = i + 3) {
      point(0 + i, yLstartLeft + 110 * relHeight);
    }
  }
}

//Dissolve A function
function dissolveA() {
  trackLenghtA = aspirinC.duration();
  currentTimeA = aspirinC.currentTime();
  timeLeftA = trackLenghtA - currentTimeA;
  timeLeftAmapped = map(timeLeftA, 0, trackLenghtA, 0, 300);
  pillAAlfa = timeLeftAmapped;
  if (timeLeftAmapped < 1) {
    isInBetween = false;

    xPosPillA = 30000;
    yPosPillA = 400;
  }
}

//TEXT FUNCTIONS
// Aspirin C
function aspirinCText() {
  fill(100);
  noStroke();
  textSize(15);
  text("Aspirin C", 200, 100);
  textSize(10);
  text("acetylsalicylic acid 500 mg", 200, 120);
}


//END
var audioPlayCound = 0

function playAudioAll(){
  if(audioPlayCound < 2){
    aspirinC.play()
    aspirinC.stop()
    treo.play()
    treo.stop()
    bamyl.play()
    bamyl.stop()
    alvedon.play()
    alvedon.stop()
    panadol.play()
    panadol.stop()
    audioPlayCound = audioPlayCound +2
  }
 

}