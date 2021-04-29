(function() {
    const URL = "http://localhost:8081/getGames";
  
    window.addEventListener("load", initialize);
  
    //getData to read comments from file and place on page, the event listener 
    function initialize() {
        getData();
    }
  
    /**
     * Get comments from server and call showData
     */
    function getData() {
      let url = URL;
      
      //alert('This is the resource: ' + url);
      console.log('URL: ' + url);

      let headers = new Headers();

      headers.append('Accept', 'text/html; charset=UTF-8');
      
      fetch(url, 
        {mode: 'cors',//Cross-Origin Resource Sharing
        //credentials: 'include',
        method: 'GET',
        })
        .then(checkStatus) // Note that our web service returns plain text, not JSON!
        .then(showData)
        .catch(console.log);
    }
  
    /**
     * From data received, create comment objects
     */
    function showData(responseFromServer) {
        //split response on linebreaks
        let games = responseFromServer.split("\n");
        
        shuffleArray(games);

        first = true;

        //for each response split
        games.forEach(responseLine => {
            //split line, into array on ","
            let game = responseLine.split(",");
                
            if (first) {
                $("featured").insertAdjacentHTML( "afterbegin",
                    `<div class="presenterBox">
                    <img src="${game[0]}">
                    <div>
                    <h3>${game[1]}</h3>
                    <p>${game[2]}</p>
                    <p>${game[3]}</p>
                    </div>
                    </div>`
                )
                first = false;
                return;
            }
            
            //at begininng of comment box, add new comment obj, first part of array is username, second is comment
            $("games").insertAdjacentHTML( "afterbegin",
            `<div class="gameBox">
                <img src="${game[0]}">
                <div>
                    <h3>${game[1]}</h3>
                    <p>${game[2]}</p>
                    <p>${game[3]}</p>
                </div>
            </div>`
            );
            $("connectError").style.display = "none";
      });
    }
  
    /* ------------------------------ Helper Functions  ------------------------------ */
    /* Randomize array in-place using Durstenfeld shuffle algorithm */
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
  
    /**
     * Returns the element that has the ID attribute with the specified value.
     * @param {string} id - element ID
     * @returns {object} DOM object associated with id.
     */
    function $(id) {
      return document.getElementById(id);
    }
  
    /*
     * Helper function to return the response's result text if successful, otherwise
     * returns the rejected Promise result with an error status and corresponding text
     * @param {object} response - response to check for success/error
     * @return {object} - valid result text if response was successful, otherwise rejected
     *                    Promise result
     */
    function checkStatus(response) { 
      console.log(response);
      if (response.status >= 200 && response.status < 300 || response.status == 0) {  
        return response.text();
      } else {  
        return Promise.reject(new Error(response.status + ": " + response.statusText)); 
      }
    }
  })();
