switch(urlParamLang) {
	case 'id':
		var spinLeftTxt1 = '1 putaran tersisa!';
		var spinLeftTxt2 = '2 putaran tersisa!';
		var noMoreSpinLeftTxt = 'Tidak ada putaran yang tersisa';
		break;
  case 'cn':
    var spinLeftTxt1 = '尚余1次旋转机会!';
    var spinLeftTxt2 = '尚余2次旋转机会!';
    var noMoreSpinLeftTxt = '尚余0次旋转机会!';
    break;
  case 'my-cn':
    var spinLeftTxt1 = '尚余1次旋转机会!';
    var spinLeftTxt2 = '尚余2次旋转机会!';
    var noMoreSpinLeftTxt = '尚余0次旋转机会!';
    break;
	case 'vn':
		var spinLeftTxt1 = 'Còn 1 vòng quay!';
		var spinLeftTxt2 = 'Còn 2 vòng quay!';
		var noMoreSpinLeftTxt = 'KHÔNG CÒN LƯỢT QUAY NÀO';
		break;
	case 'th':
		var spinLeftTxt1 = 'เหลือ 1 สปิน!';
		var spinLeftTxt2 = 'เหลือ 2 สปิน!';
		var noMoreSpinLeftTxt = 'ไม่มีสปินคงเหลือ';
		break;
	default:
		var spinLeftTxt1 = '1 Spins left!';
		var spinLeftTxt2 = '2 Spins left!';
		var noMoreSpinLeftTxt = 'No more spins left';
}

function Spin2WinWheel() {

  var xmlns = "http://www.w3.org/2000/svg",
    xlinkns = "http://www.w3.org/1999/xlink",
    select = function(s) {
      return document.querySelector(s);
    },
    selectAll = function(s) {
      return document.querySelectorAll(s);
    },
    thisWheel = this,
    wheelSVG = select('.wheelSVG'),
    wheel = select('.wheel'),
    wheelOutline = select('.wheelOutline'),
    wheelContainer = select('.wheelContainer'),
    peg = select('.peg'),
    pegContainer = select('.pegContainer'),
    mainContainer = select('.mainContainer'),
    valueContainer = select('.valueContainer'),
    centerCircle = select('.centerCircle'),
    toast = select('.toast'),
    toastText = select('.toast p'),
    centerCircleImageContainer = select('.centerCircleImageContainer'),
    dataObj,
    svgWidth,
    svgHeight,
    wheelStrokeColor,
    wheelStrokeWidth,
    wheelFillColor = 'transparent',
    wheelSize,
    wheelRadius,
    wheelTextOffsetY,
    wheelImageOffsetY,
    wheelTextSize,
    wheelImageSize,
    wheelDragger,
    currentWheelRotation,
    centerCircleStrokeColor,
    centerCircleStrokeWidth,
    centerCircleFillColor,
    centerCircleSize,
    centerCircleImageUrl,
    centerCircleImageWidth,
    centerCircleImageHeight,    
    centerCircleRadius,
    segmentStrokeColor,
    segmentStrokeWidth,
    segmentValuesArray,
    numSegments,
    numSpins,
    rotationStep,
    segmentStep,
    oldWheelPos,
    currentWheelPos = 0,
    centerX,
    centerY,
    colorArray,
    spinCount = 0,
    spinMultiplier = 2,
    colorCount = 0,
    startAngle = 0,
    endAngle = startAngle,
    segmentArray = [],
    minSpinDuration,
    gameOverText,
    invalidSpinText,
    introText,
    gameId,
    hasSound,
    hasShadows,
    clickToSpin,
    spinButton = null,
    onResult,
    onGameEnd,
    onError,
    spinVelocityTracker,
    gameResultsArray = [],
    pegSnd = new Audio('media/wheel_tick.mp3'),
    spinDestinationArray,
    randomSpins = true,
    spinDirection,// = -1,
    numRevsPerDestination,
    invalidSpinThreshold,
    probabilityArray = null,
    hasProbability = false,
    requiredProb,
    restrictPlayDuration,
    initError1 = "Invalid destination set - please ensure the destination in spinDestinationArray is greater than 0 and less than or equal to the number of segments",
    initError2 = "Not enough segments. Please add more entries to segmentValuesArray",
    probabilityErrorStr = "If you have set JSON probability values they must add up to 100",
    setInitData = function() {

      wheelStrokeColor = dataObj.wheelStrokeColor;
      wheelSize = dataObj.wheelSize;
      wheelRadius = wheelSize / 2;
      wheelTextColor = dataObj.wheelTextColor;
      wheelStrokeColor = dataObj.wheelStrokeColor;
      wheelStrokeWidth = dataObj.wheelStrokeWidth;
      wheelTextOffsetY = dataObj.wheelTextOffsetY;
      wheelImageOffsetY = dataObj.wheelImageOffsetY;
      wheelImageSize = dataObj.wheelImageSize;
      wheelTextSize = dataObj.wheelTextSize;
      centerCircleStrokeColor = dataObj.centerCircleStrokeColor;
      centerCircleStrokeWidth = dataObj.centerCircleStrokeWidth;
      centerCircleFillColor = dataObj.centerCircleFillColor;
      centerCircleSize = dataObj.centerCircleSize;
      centerCircleRadius = centerCircleSize / 2;
      centerCircleImageUrl = dataObj.centerCircleImageUrl;
      centerCircleImageWidth = dataObj.centerCircleImageWidth;
      centerCircleImageHeight = dataObj.centerCircleImageHeight;        
      segmentStrokeColor = dataObj.segmentStrokeColor;
      segmentStrokeWidth = dataObj.segmentStrokeWidth;
      segmentValuesArray = dataObj.segmentValuesArray;      
      numSegments = segmentValuesArray.length;
      segmentValuesArraySecondSpin = dataObj.segmentValuesArraySecondSpin;  // added - chrisab 3-11-2021
        segmentValuesArrayTryAgain = dataObj.segmentValuesArrayTryAgain;    // added - chrisab 3-14-2021
      numSpins = (dataObj.numSpins == -1) ? 9999999999999999 : parseInt(dataObj.numSpins);
      minSpinDuration = dataObj.minSpinDuration;
      gameOverText = dataObj.gameOverText;
      invalidSpinText = dataObj.invalidSpinText;
      introText = dataObj.introText;
      hasSound = dataObj.hasSound;
      gameId = dataObj.gameId;
      rotationStep = 360 / numSegments;
      segmentStep = rotationStep / 2;
      centerX = dataObj.centerX;
      centerY = dataObj.centerY;
      colorArray = dataObj.colorArray;
      hasShadows = dataObj.hasShadows;
      spinDestinationArray = dataObj.spinDestinationArray;
      spinDirection = (dataObj.spinDirection === 'cw') ? -1 : 1;
      clickToSpin = dataObj.clickToSpin;
      //spinDirection = (clickToSpin) ? 1 : spinDirection;
      numRevsPerDestination = spinDirection * (3 * 360);
      invalidSpinThreshold =  0.5;
      restrictPlayDuration = dataObj.restrictPlayDuration;
      if (hasShadows) {
        wheelOutline.setAttributeNS(null, 'filter', 'url(#shadow)');
        valueContainer.setAttributeNS(null, 'filter', 'url(#shadow)');
        centerCircle.setAttributeNS(null, 'filter', 'url(#shadow)');
        pegContainer.setAttributeNS(null, 'filter', 'url(#shadow)');
        toast.style.boxShadow = "0px 0px 20px rgba(21,21,21,0.5)";
      }
    },
    setInitPos = function() {

      TweenMax.set('svg', {
        visibility: 'visible'
      })
      TweenMax.set(wheel, {
        svgOrigin: centerX + ' ' + centerY,
        x: 0,
        y: 0
      })
      TweenMax.set(peg, {
        x: centerX - (peg.getBBox().width / 2),
        y: centerY - wheelRadius - (peg.getBBox().height / 2),
        transformOrigin: '50% 25%',
        visibility: 'visible'
      })
      TweenMax.set(pegContainer, {
        transformOrigin: '50% 100%',
        scale: wheelSize / 600
      })

      TweenMax.set(mainContainer, {
        svgOrigin: centerX + ' ' + centerY,
        rotation: -90,
        x: 0,
        y: 0
      })


    },
    setCenterCircleImage = function(){

      //centerCircleImageContainer
      var centerCircleImage = document.createElementNS(xmlns, "image");
      centerCircleImage.setAttributeNS(xlinkns, "xlink:href", centerCircleImageUrl);
      centerCircleImage.setAttribute("width", centerCircleImageWidth);
      centerCircleImage.setAttribute("height", centerCircleImageHeight);
      centerCircleImage.setAttribute("x", centerX - (centerCircleImageWidth/2));
      centerCircleImage.setAttribute("y", centerY - (centerCircleImageHeight/2));
      centerCircleImageContainer.appendChild(centerCircleImage);
      
    },    
    setSpinDestinations = function() {

      //console.log(dataObj.numSpins)
      if(numSpins == 0){

        showInitError('numSpins MUST BE GREATER THAN 0')
        return;
      }

      if(hasProbability){

        return;
      }


      if (spinDestinationArray.length > 0) {

        randomSpins = false;
        numSpins = spinDestinationArray.length;
        for (var i = 0; i < spinDestinationArray.length; i++) {
          //check to see if the destination is available (if you set the destination to be more than the number of segments this will catch that)
          if (spinDestinationArray[i] > numSegments || spinDestinationArray[i] === 0) {
            showInitError(initError1);

            
            return;
          }
          //make it zero based - this allows the author to set destinations using 1 as the first one (UX FTW!)
          spinDestinationArray[i] = spinDestinationArray[i] - 1;
          //ensure there is at least 2 spin revolutions (360 2 = 720) between destination spins
          spinDestinationArray[i] = ((spinDestinationArray[i] * -1) * rotationStep) - (numRevsPerDestination * spinMultiplier);
          //this multiplier increments to ensure the destination segment is indeed further around
          spinMultiplier += 2;
        }

      } else {

        //no else
      }

      //console.log(spinDestinationArray)

      if(clickToSpin){
        createClickToSpin();
      } else{
        createDraggable();
      }
      
      // showIntroText();
    },
    randomBetween = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    drawSegments = function() {
      var x1, x2, y1, y2, d, p, g, t, tn, destFill;
      for (var i = 0; i < numSegments; i++) {
        //startAngle = endAngle;
        startAngle = -segmentStep;
        endAngle = startAngle + rotationStep;

        x1 = (centerX + wheelRadius * Math.cos(Math.PI * startAngle / 180));
        y1 = (centerY + wheelRadius * Math.sin(Math.PI * startAngle / 180));
        x2 = (centerX + wheelRadius * Math.cos(Math.PI * endAngle / 180));
        y2 = (centerY + wheelRadius * Math.sin(Math.PI * endAngle / 180));

        d = "M" + centerX + "," + centerY + "  L" + x1 + "," + y1 + "  A" + wheelRadius + "," + wheelRadius + " 0 0,1 " + x2 + "," + y2 + "z";

        g = document.createElementNS(xmlns, 'g');
        p = document.createElementNS(xmlns, 'path');
        g.appendChild(p);
        //g.appendChild(t);
        wheel.appendChild(g);
        TweenMax.set(p, {
          rotation: (i * rotationStep),
          svgOrigin: centerX + ' ' + centerY
        })
        p.setAttributeNS(null, 'd', d);

        //check if there are enough colors in the array to support the numer of segments
        if (colorArray[i]) {
          destFill = colorArray[i];
        } else {
          destFill = colorArray[colorCount];
          colorCount++;
          //if the extra color cycle count gets bigger than the number of listed colors set it back to 0 and start using them from the start (repeat the colors)
          if (colorCount == colorArray.length) {
            colorCount = 0;
          }
        }

        p.setAttributeNS(null, "fill", destFill);
        p.setAttributeNS(null, "stroke", 0);
        segmentArray.push({
          path: p,
          x1: x1,
          x2: x2,
          y1: y1,
          y2: y2
        });

      } //end for

      if (segmentStrokeWidth > 0) {
        drawSegmentStrokes()
      }

      addValues()

    },
    drawSegmentStrokes = function() {

      for (var i = 0; i < numSegments; i++) {

        var l = document.createElementNS(xmlns, 'line');  
        l.setAttributeNS(null, 'x1', centerX);
        l.setAttributeNS(null, 'x2', segmentArray[i].x2);
        l.setAttributeNS(null, 'y1', centerY);
        l.setAttributeNS(null, 'y2', segmentArray[i].y2);
        l.setAttributeNS(null, 'stroke', segmentStrokeColor);
        l.setAttributeNS(null, 'stroke-width', segmentStrokeWidth);
        wheel.appendChild(l);

        TweenMax.set(l, {
          svgOrigin: centerX + ' ' + centerY,
          rotation: (i * rotationStep)
        })
      }

    },
    addValues = function() {

      for (var i = 0; i < numSegments; i++) {

        var g = document.createElementNS(xmlns, 'g');
        //var c = document.createElementNS(xmlns, 'circle');
        if (segmentValuesArray[i].type == "image") {

          var ig = document.createElementNS(xmlns, 'image');
          g.appendChild(ig);
          g.setAttribute('class', 'gwheelImage '+((segmentValuesArray[i].trotate) ? 'trotate ' : '')+((segmentValuesArray[i].cclass) ? segmentValuesArray[i].cclass : ''));
          ig.setAttribute('class', 'wheelImage');
          ig.setAttributeNS(null, 'x', centerX - (wheelImageSize / 2));
          ig.setAttributeNS(null, 'y', centerY - wheelRadius + wheelImageOffsetY);
          ig.setAttributeNS(null, 'width', wheelImageSize);
          ig.setAttributeNS(null, 'height', wheelImageSize);
          ig.setAttributeNS(xlinkns, 'xlink:href', segmentValuesArray[i].value);
        } else if (segmentValuesArray[i].type == "string") {
		  var ginner1 = document.createElementNS(xmlns, 'g');
		  var t1 = document.createElementNS(xmlns, 'text');

          var lines1 = segmentValuesArray[i].ftxt.split('^'), tn1, ts1;
		  
		  lines1.forEach(function (value,index) {
              tn1 = document.createTextNode(value);
              ts1 = document.createElementNS(xmlns, "tspan");

              ts1.setAttributeNS(null,'dy',  (index) ? "1.2em" : 0);

              ts1.setAttributeNS(null,'x',centerX);

              ts1.setAttributeNS(null,'text-anchor','middle');

              ts1.appendChild(tn1);
              t1.appendChild(ts1);
          });
		  
		  ginner1.appendChild(t1);
		  g.appendChild(ginner1);
          ginner1.setAttribute('class',  'gwheelText '+((segmentValuesArray[i].cclass) ? segmentValuesArray[i].cclass : ''));
          t1.setAttribute('class', 'wheelText');
          t1.setAttributeNS(null, 'fill', wheelTextColor);
          t1.setAttributeNS(null, 'x', centerX);
          t1.setAttributeNS(null, 'y', (centerY - wheelRadius + wheelTextOffsetY) + 20);
          t1.style.fontSize = wheelTextSize;
			
			
		  var ginner = document.createElementNS(xmlns, 'g');
          var t = document.createElementNS(xmlns, 'text');

          var lines = segmentValuesArray[i].value.split('^'), tn, ts;
          var txt1X = segmentValuesArray[i].txt1X;
          var txt2X = segmentValuesArray[i].txt2X;
		  
		  lines.forEach(function (value,index) {
			var res = value.split(" ");
			var txt = '';
			var counter = 0;
			for(var i=0;i<res.length;i++) {
				txt += res[i];
				if(counter == 0 && i != res.length - 1) {
					txt += ' ';
				}
				if(counter == 1 || i == res.length - 1) {
					tn = document.createTextNode(txt);
					ts = document.createElementNS(xmlns, "tspan");
					
					if(res.length > 2) {
						if(i <= 1) {
							// ts.setAttributeNS(null,'dy',  (index) ? "1.2em" : (16 * -1));
							ts.setAttributeNS(null,'x', centerX + ((txt1X) ? txt1X : 0));
							ts.setAttributeNS(null,'text-anchor','start');
						} else {
							// ts.setAttributeNS(null,'dy',  (index) ? "1.2em" : 32);
							ts.setAttributeNS(null,'x', centerX + ((txt2X) ? txt2X : 0));
							ts.setAttributeNS(null,'text-anchor','start');
						}
					} else {
						// ts.setAttributeNS(null,'dy',  (index) ? "1.2em" : 0);
						ts.setAttributeNS(null,'x', centerX + ((txt1X) ? txt1X : 0));
						ts.setAttributeNS(null,'text-anchor','start');
					}

					ts.appendChild(tn);
					t.appendChild(ts);
				}
				counter + 2;
				if(counter >= 2) {
					txt = '';
					counter = 0;
				}
			}
          });
		  
		  ginner.appendChild(t);
		  g.appendChild(ginner);
          ginner.setAttribute('class', 'gwheelText '+((segmentValuesArray[i].trotate) ? 'trotate ' : '')+((segmentValuesArray[i].cclass) ? segmentValuesArray[i].cclass : ''));
          t.setAttribute('class', 'wheelText');
          t.setAttributeNS(null, 'fill', wheelTextColor);
          t.setAttributeNS(null, 'x', centerX);
          t.setAttributeNS(null, 'y', centerY - wheelRadius + wheelTextOffsetY);
          t.style.fontSize = wheelTextSize;
        }
		
        valueContainer.appendChild(g)

        TweenMax.set(g, {
          svgOrigin: centerX + ' ' + centerY,
          rotation: i * rotationStep
        })

      }

      TweenMax.set(valueContainer, {
        svgOrigin: centerX + ' ' + centerY
      })

    },
    getWheel = function() {

      var g = document.createElementNS(xmlns, 'g');
      var c = document.createElementNS(xmlns, 'circle');
      wheelOutline.appendChild(g);

      //wheel's outline
      c.setAttributeNS(null, 'fill', wheelFillColor);
      c.setAttributeNS(null, 'stroke', wheelStrokeColor);
      c.setAttributeNS(null, 'stroke-width', wheelStrokeWidth);
      c.setAttributeNS(null, 'cx', centerX);
      c.setAttributeNS(null, 'cy', centerY);
      c.setAttributeNS(null, 'r', wheelRadius);
      g.appendChild(c);

      return g;
    },
    getCenterCircle = function() {

      var c = document.createElementNS(xmlns, 'circle');

      //circle's outline
      c.setAttributeNS(null, 'fill', centerCircleFillColor);
      c.setAttributeNS(null, 'stroke', centerCircleStrokeColor);
      c.setAttributeNS(null, 'stroke-width', centerCircleStrokeWidth);
      c.setAttributeNS(null, 'cx', centerX);
      c.setAttributeNS(null, 'cy', centerY);
      c.setAttributeNS(null, 'r', centerCircleRadius);

      return c;
    },
    onPegTweenStart = function() {
      pegSnd.play();
    },
    onWheelPress = function() {
      // popup.style.visibility = 'hidden';
      toast.style.visibility = 'hidden';

    },    
    onButtonPress = function() {
      
      toast.style.visibility = 'hidden';
      spinButton.onclick = null;
      spinMultiplier +=2;

    },
    onWheelDragEnd = function() {
      disableWheel();
      //prevent players dragging and dropping the wheel onto a segment
      if (randomSpins) {
        spinVelocityTracker = VelocityTracker.track(wheel, "rotation");
      }
    },
    throwUpdate = function(e) {
      //this deals with the peg ticker (at the top) and decides which direction it should flick
      //personally I think this is a nice touch - hope you do too!
      oldWheelPos = currentWheelPos;

      currentWheelPos = Math.round(wheel._gsTransform.rotation / rotationStep);
      //peg code only
      if (currentWheelPos != oldWheelPos) {

        var rotation = (currentWheelPos > oldWheelPos) ? -35 : 35;

        TweenMax.fromTo(peg, 0.2, {

          rotation: rotation
        }, {
          onStart: (hasSound) ? onPegTweenStart : null,
          rotation: 0,
          ease: Back.easeOut
        })
      }
      //keep the values (images. text) sync'd with the wheel spinning
      TweenMax.set(valueContainer, {
        rotation: wheel._gsTransform.rotation
      })
    },
    throwComplete = function() {

      //work out where the wheel lands
      currentWheelRotation = wheel._gsTransform.rotation;
      var normalizedRotation = Math.round(currentWheelRotation % 360);
      normalizedRotation = (normalizedRotation > 0) ? 360 - normalizedRotation : normalizedRotation;

      normalizedRotation = (normalizedRotation < 0) ? normalizedRotation *= -1 : normalizedRotation;     
            
      //check to see if spinVelocityTracker exists (only when randomSpins = true)
      //console.log(spinVelocityTracker, Math.abs(spinVelocityTracker.getVelocity('rotation')))
      if (spinVelocityTracker && Math.abs(spinVelocityTracker.getVelocity('rotation')) <= invalidSpinThreshold) {

        enableWheel();        
        showResult('invalidSpin');        
        return;
        
      }

      var segId = Math.round(normalizedRotation / rotationStep);
      var winningSegment = segmentArray[segId].path;

      showResult(Math.abs(segId));

      //randomSpins is true if no destinations have been set
      if (randomSpins) {
        //this means no destinations have been set        
        if (numSpins > -1) {
          //this means no destinations have been set AND numSpins has been set to a positive number          
          spinCount++;
        } else {
          //this means no destinations have been set AND numSpins is -1 meaning you can spin randomly forever
          //so stop executing anything else
          return;
        }
      } else {
        //this means destinations have been set
        spinCount++;
        wheelDragger[0].vars.snap = [spinDestinationArray[spinCount]];
      }

      VelocityTracker.untrack(wheel);

      if (spinCount >= numSpins) {
        endGame();
        return;
      }

      enableWheel();

    },
    updateWheelBounds = function(){
      
      if(clickToSpin)return;
      
      wheelDragger[0].applyBounds({
        minRotation: spinDirection * -9999999999999999,
        maxRotation: currentWheelRotation
      });      
    },  
    getRandomSpinFunction = function(multiplier) {
      var f = function(endValue) {
        //console.log(endValue)
        return (Math.round((endValue / rotationStep)) * rotationStep) - multiplier
      }
      return f;
    },
    getRandomClickSpin = function() {
      var val = - (rotationStep * randomBetween(0, numSegments)) - numRevsPerDestination * spinMultiplier
      return val
    },
    getProbabilityClickSpin = function(){
      var probId = Math.floor(Math.random() * probabilityArray.length);
      var probSeg = probabilityArray[probId];
      var val = - (rotationStep * probSeg) - numRevsPerDestination * spinMultiplier
      
      return val

    },
    createDraggable = function() {
      wheelDragger = Draggable.create(wheel, {
        type: 'rotation',
        bounds: {
          minRotation: spinDirection * -9999999999999999,
          maxRotation: 0
        },
        throwProps: true,
        ease: Back.easeOut.config(0.2),
        snap: (randomSpins) ?  getRandomSpinFunction(0) : [spinDestinationArray[spinCount]],
        throwResistance: 0,
        minDuration: minSpinDuration,
        maxDuration: minSpinDuration,        
        onThrowComplete: throwComplete,
        onPress: onWheelPress,
        onDrag: throwUpdate,
        onThrowUpdate: throwUpdate,
        overshootTolerance: 1,
        onDragEnd: onWheelDragEnd

      })
    },

    checkHasProbability = function(spinCount){
        // added chrisab - 3-11-2021
        if (spinCount == 1) {
            if (localStorage.getItem("resultCode") == 0) {
                segmentValuesArray = segmentValuesArraySecondSpin;                
            }
            else {
                segmentValuesArray = segmentValuesArrayTryAgain;
            }
        }

      hasProbability = true;
      segmentValuesArray.forEach( function(el, val){
        //console.log(!isNaN(el.probability))
        //if(!el.probability){
        if(isNaN(el.probability)){

          hasProbability = false;
          //return false;

        } 
      })

      if(hasProbability){

        spinDestinationArray = [];//, numSpins)
        numSpins = (dataObj.numSpins == -1) ? 9999999999999999 : parseInt(dataObj.numSpins);
        checkProbabilityValues();
        
      }

    },

    checkProbabilityValues = function(){


      var totalProb = 0;//, requiredProb = 100;


      segmentValuesArray.forEach( function(el, val){
        totalProb += el.probability;
      })

      requiredProb = totalProb;


      if(Math.ceil(totalProb) == requiredProb || Math.floor(totalProb) == requiredProb){

        createProbabilityArray();

      } else {

        var r = confirm("Total probability: " + totalProb + ' - ' +probabilityErrorStr);
        if (r == true) {
        TweenMax.set(wheelContainer, {
          autoAlpha:0
        })
        TweenMax.set(wheelContainer, {
          autoAlpha:0
        })
           
        }       
       
        
      }



    }

    createProbabilityArray = function(){

      
      probabilityArray = [];

      segmentValuesArray.forEach( function(el, val){
        
        for(var i = 0; i < el.probability; i++){

          probabilityArray.push(val);
        }
      })



    },

    showProbabilityError = function (){


    },
    createClickToSpin = function(){

      if(checkHasProbability(0)){

        createProbabilityArray();
      }
      //check to see if the author called setSpinTrigger before init();
      //if spinTrigger is defined then they set it before
      //if it's not then we set wheel to be the button. Later the author may
      //overwrite this with their own button
      if(spinButton){
        spinButton.onclick = getTrigger();
      } else {
        spinButton = wheel;
        wheel.onclick = getTrigger();        
      } 

    
      },
    getTrigger = function(){
         return function(){
		  $('.spinBtn').addClass('active');
		  $('.winning-indicator').removeClass('active');
          if(hasProbability){

          ThrowPropsPlugin.to(wheel, {
            throwProps:{
            	duration:30,
              rotation:{
                velocity:spinDirection * randomBetween(-700, -500), 
                //if it's random spins then get a random spin but pass in the multiplier to ensure a long spin (plus the right slot id)
                //if it has destinations set then use those
                end:getProbabilityClickSpin()
                //end:dest
              }
            },
            onStart:onButtonPress,
            onUpdate:throwUpdate,
            ease: Back.easeOut.config(0.2),
            overshootTolerance:0,
            onComplete:spinComplete
          });  
            
          } else {

          var dest = -rotationStep * 2;
         
          ThrowPropsPlugin.to(wheel, {
            throwProps:{
            	duration:30,
              rotation:{
                velocity:spinDirection * randomBetween(-700, -500), 
                //if it's random spins then get a random spin but pass in the multiplier to ensure a long spin (plus the right slot id)
                //if it has destinations set then use those
                end:(randomSpins) ? getRandomClickSpin(): [spinDestinationArray[spinCount]]
                //end:dest
              }
            },
            onStart:onButtonPress,
            onUpdate:throwUpdate,
            ease: Back.easeOut.config(0.2),
            overshootTolerance:0,
            onComplete:spinComplete
          }); 

          }         
        }      
    },
   spinComplete = function () {

	  $('.spinBtn').removeClass('active');
	  $('.winning-indicator').addClass('active');
      //work out where the wheel lands
      currentWheelRotation = wheel._gsTransform.rotation;
      var normalizedRotation = Math.round(currentWheelRotation % 360);
      normalizedRotation = (normalizedRotation > 0) ? 360 - normalizedRotation : normalizedRotation;

      normalizedRotation = (normalizedRotation < 0) ? normalizedRotation *= -1 : normalizedRotation;        
      
      var segId = Math.round(normalizedRotation / rotationStep);
      var winningSegment = segmentArray[segId].path;

      showResult(Math.abs(segId));
      
      //randomSpins is true if no destinations have been set
      if (randomSpins) {
        //this means no destinations have been set        
        if (numSpins > -1) {
          //this means no destinations have been set AND numSpins has been set to a positive number          
          spinCount++;
          
        } else {
          //this means no destinations have been set AND numSpins is -1 meaning you can spin randomly forever
          //so stop executing anything else
          return;
        }
      } else {
        //this means destinations have been set
        spinCount++;

      }        

        checkHasProbability(spinCount); // added chrisab - 3-11-2021
        createProbabilityArray();       // added chrisab - 3-11-2021

        if (spinCount >= numSpins) {
          endGame();          
          return;
      }
        
      spinButton.onclick = getTrigger();
    },      
    endGame = function() {

      //prevent the wheel being dragged once the game has finished
      openCongratsPopup()

      disableWheel();

      TweenMax.set(wheelSVG, {
        alpha: 0.3
      })

      //show the gameOver text after 4 seconds
      TweenMax.to(toastText, 1, {
        text: gameOverText,
        ease: Linear.easeNone,
        delay: 2
      })

      onGameEnd({gameId:gameId, target:thisWheel, results:gameResultsArray});

    },
    disableWheel = function() {
      if(clickToSpin)return;
      wheelDragger[0].disable();
    },
    enableWheel = function() {
      if(clickToSpin)return;
      wheelDragger[0].enable();
    },
    showResult = function(e) {
      
      updateWheelBounds();
      
      var resultObj;
      //if it's an error 
      if (e == "invalidSpin") {

        TweenMax.set(wheel, {
            rotation: spinDestinationArray[spinCount]
          })
        showToast(invalidSpinText);
        //create a result object 
        resultObj = {target:thisWheel, type:'error', spinCount:spinCount, win:null, msg:invalidSpinText, gameId:gameId};

        //fire the error event
        onError(resultObj);
        
        //add result to gameResultsArray
        gameResultsArray.push(resultObj);
                   
        return;
      }
      //if it's a number then it's a segment
      if (!isNaN(e)) {
        //the JSON contains a property that defines whether the segment is a winner or loser. Useful for backend decisions.
        //var resultStr1 = (segmentValuesArray[e].win) ? 'WIN:' : 'LOSE:';
        var resultStr2 = segmentValuesArray[e].resultText;

        showToast(resultStr2);
        //create a result object 
        resultObj = {target:thisWheel, type:'result', spinCount:spinCount, win:segmentValuesArray[e].win, msg:segmentValuesArray[e].resultText, gameId:gameId, userData:segmentValuesArray[e].userData};
        
        //fire the result event
        onResult(resultObj);
        
        //add result to gameResultsArray
        gameResultsArray.push(resultObj);
      }
    },
    showIntroText = function(str) {
      // showToast(introText);
    },
  showInitError = function(str) {
      TweenMax.set([wheelContainer, spinButton], {
        autoAlpha: 0
      }) 
      TweenMax.delayedCall(0.1, function(){
        alert(str)
      });     
    },
    showToast = function(str) {
      toast.style.visibility = 'visible';      
      toastText.innerHTML = str;
      TweenMax.fromTo(toast, 0.6, {
        y: 20,
        alpha: 0
      }, {
        y: 0,
        alpha: 1,
        delay: 0.2,
        //onStart:onresize,
        ease: Elastic.easeOut.config(0.7, 0.7)
      })
      $('.toast').addClass('active');
    },
    checkNumSegments = function() {

      if (numSegments <= 1) {
        showInitError(initError2)
        TweenMax.set(wheelSVG, {
          visibility: 'hidden'
        })
        
      }
      

    },
    setSpinTrigger = function(){  
      
      if(spinButton){
        clickToSpin = true;
      }
      if(clickToSpin){
        
        if(spinButton){
          spinButton.onclick = getTrigger(); 
        } else {
          
          wheel.onclick = getTrigger(); 
        }               
      } else {
        
      }
  },
  checkRestriction = function(){
    
      //if (restrictPlayDuration > 0) {
        onRestrict(restrictPlayDuration);
        
      //}    
  },  
    onResult = function(e){
        thisWheel.onResult(e)
      },
   onError = function(e){
        thisWheel.onError(e)
      },
   onGameEnd = function(e){
        thisWheel.onGameEnd(e)
      },
    onRestrict = function(e){
        thisWheel.onRestrict(e)
      } 
 
  this.onResult = onResult;
  this.onError = onError;
  this.onGameEnd = onGameEnd;

  this.onRestrict = onRestrict;  
 
 
  this.getGameProgress = function(){  return gameResultsArray; };
  this.init = function(e) {
  //if(String.fromCharCode(57,66,51).toLowerCase() !=  _s){_uu();}       
  console.log(e)
    if(!e){
      setInitPos();
      showInitError('PLEASE INCLUDE THE INIT OBJECT');
      return;
    }
    svgWidth = e.data.svgWidth;
    svgHeight =  e.data.svgHeight;
    wheelSVG.setAttribute('viewBox', '0 0 ' + svgWidth + ' ' + e.data.svgHeight);
    dataObj = e.data;
    onGameEnd = (e.onGameEnd) ? e.onGameEnd : function(){};
    onResult =  (e.onResult) ? e.onResult : function(){};
    onError = (e.onError) ? e.onError : function(){};
    onRestrict = (e.onRestrict) ? e.onRestrict : function(){};
    spinButton = (e.spinTrigger) ? e.spinTrigger : null;
    setSpinTrigger();
    setInitData();

    onRestrict(restrictPlayDuration);
    
    setInitPos();
    drawSegments();
    // setCenterCircleImage();
    wheelOutline.appendChild(getWheel())
    // centerCircle.appendChild(getCenterCircle());
    setSpinDestinations();
    checkNumSegments();
    //checkRestriction();

    

    
    
    
  } 

  this.restart = function() {
    if(!clickToSpin){
        wheelDragger[0].kill();
        currentWheelPos = oldWheelPos = null;
        TweenMax.to([wheel, valueContainer], 0.3, {
          rotation: '0_short',
          onComplete: createDraggable
        })      
    }
      
       TweenMax.set(wheelSVG, {
          alpha: 1
        })
        TweenMax.to([wheel, valueContainer], 0.3, {
          rotation: '0_short'
        })      

      toast.style.visibility = 'hidden';
      spinCount = 0;
      spinMultiplier = 2;
      gameResultsArray = [];


      // showIntroText();
  }

    
}

Spin2WinWheel.reset = function(){

      document.querySelector('.wheel').innerHTML = "";
      document.querySelector('.wheelOutline').innerHTML = "";
      document.querySelector('.centerCircle').innerHTML = "";
      document.querySelector('.valueContainer').innerHTML = "";
      document.querySelector('.centerCircleImageContainer').innerHTML = "";
      TweenMax.set(['.wheel', '.valueContainer'], {
        rotation: 0
      })      
     TweenMax.staggerTo(['.wheelSVG', '.toast'], 0,{
        cycle:{
          alpha: [1, 0]
        }
      },0)


  }
  Spin2WinWheel.hide = function(){

      TweenMax.set(document.querySelector('.wheelContainer'), {
        autoAlpha:0
      })

  }  

  Spin2WinWheel.remove = function(){

      document.body.removeChild(document.querySelector('.wheelContainer'));

  }  

  Spin2WinWheel.checkCookie = function(callback){

    var xobj = new XMLHttpRequest();
    xobj.open('GET', 'settings.php?f=checkCookie', true); 
    xobj.onreadystatechange = function() {
      if (xobj.readyState == 4 && xobj.status == "200") {
        callback(xobj.responseText)
        //successfully called IP check
        //0 means they haven't been here before
        /*if(xobj.responseText == 0){

          callback();

        } else{
          alert("Please come back and play tomorrow!");
          Spin2WinWheel.remove();
          
          //hide your button here too
        }*/
      }
    };
    xobj.send(null);

  }

  Spin2WinWheel.setCookie = function(){

    var xobj = new XMLHttpRequest();
    xobj.open('GET', 'settings.php?f=setCookie', true); 
    xobj.onreadystatechange = function() {
      if (xobj.readyState == 4 && xobj.status == "200") {
        console.log(xobj.responseText)
        //successfully called IP check
        //0 means they haven't been here before
 
      }
    };    
    xobj.send(null);    
}