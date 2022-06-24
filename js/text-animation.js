var blockLetters = new TimelineMax({paused:true}),
      albumLetters = new TimelineMax({paused:false}),
      fullText = $("#fullText"),
      splitHeadline = new SplitText(fullText, {type:"words,chars"}), 
      chars = splitHeadline.chars,
      bgController = $("#backgroundController"),
      letter = $(".letter"),
      letterTiming = 0.2,
      spaceTiming = 0.3,
      stringsArray = ["That's the spirit", "The brand new album"],
      currentString = 0;


  function revertSplit(targetSplit, newString){

    if(newString !== undefined){
      // go to the nxt string
      currentString++;
      // reset the text timeline
      albumLetters.pause(0).clear();
      // revert the tet split
      targetSplit.revert();

      // set the container's opacity to 0 and change the text
      TweenLite.set(fullText, {autoAlpha:0, text:{value:newString}});

      // reset the split text
      splitHeadline = new SplitText(fullText, {type:"words,chars"});
      chars = splitHeadline.chars;

      // container's opacity back to 1
      TweenLite.set(fullText, {autoAlpha:1});

      albumLetters
        .staggerFrom(chars,0.6, {opacity:0, y: -20}, 0.1)
        .staggerTo(chars,0.6, {opacity:0, y: 20}, 0.05,'+=0', revertSplit, [splitHeadline,stringsArray[currentString]])
        .play();

    } else {
      currentString = 0;
      revertSplit(splitHeadline, stringsArray[currentString]);
    }

  }
  currentString++;

  albumLetters
    .staggerFrom(chars,0.6, {opacity:0, y: -20}, 0.1)
    .staggerTo(chars,0.6, {opacity:0, y: 20}, 0.05,'+=0', revertSplit, [splitHeadline,stringsArray[currentString]]);