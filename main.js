const spinner = document.querySelector('.spinner p');
      const spinnerContainer = document.querySelector('.spinner');
      let rotateCount = 0;
      let startTime = null;
      let rAF;

      // Store references to the start button and the result paragraph
      const btn = document.querySelector('button');
      const result = document.querySelector('.result');

      // function to generate random number
      function random(min,max) {
        var num = Math.floor(Math.random()*(max-min)) + min;
        return num;
      }

      // Create a draw() function
      function draw(timestamp) {
        if(!startTime) {
         startTime = timestamp;
        }

        rotateCount = (timestamp - startTime) / 3;
        
        // If rotateCount gets over 359, set it to 'remainder of dividing by 360'
        if(rotateCount > 359) {
          rotateCount %= 360;
        }

        // Set the rotation of the div to be equal to rotateCount degrees
        spinner.style.transform = 'rotate(' + rotateCount + 'deg)';

        // Call the next frame in the animation
        rAF = requestAnimationFrame(draw);
      }

      // Initially hide the spinner and results
      result.style.display = 'none';
      spinnerContainer.style.display = 'none';

      // Reset the game to its initial state on restart
      function reset() {
        btn.style.display = 'block';
        result.textContent = '';
        result.style.display = 'none';
      }

      // Start the game when the button is pressed

      btn.addEventListener('click', start);

      function start() {
        // Start the spinner spinning
        draw();
        // Show the spinner and hide the button
        spinnerContainer.style.display = 'block';
        btn.style.display = 'none';
        // run the setEndgame() function after a random number of seconds between 5 and 10
        setTimeout(setEndgame, random(5000,10000));
      }

      // Function to allow players to take their turn when the time is right
      function setEndgame() {
        cancelAnimationFrame(rAF);
        spinnerContainer.style.display = 'none';
        result.style.display = 'block';
        result.textContent = 'PLAYERS GO!!';

        document.addEventListener('keydown', keyHandler);

        function keyHandler(e) {
          console.log(e.key);
          if(e.key === "a") {
            result.textContent = 'Player 1 won!!';
          } else if(e.key === "l") {
            result.textContent = 'Player 2 won!!';
          }

          document.removeEventListener('keydown', keyHandler);
          setTimeout(reset, 5000);
        };
      }