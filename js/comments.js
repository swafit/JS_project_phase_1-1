(function() {
    const URL = "http://localhost:8081/getComment";
    const URL2 = "http://localhost:8081/postComment";
  
    window.addEventListener("load", initialize);
  
    //getData to read comments from file and place on page, the event listener 
    function initialize() {
        getData();
        $("addComment").addEventListener("click", addComment );
    }

    //add new comment
    function addComment() {
        //get values
        let user = $("user").value;
        let comment = $("comment").value;

        //return if either field is empty
        if (user == "" || comment == "") {
            return;
        }

        //add new comment to page
        try {
        $("commentContainer").insertAdjacentHTML( "afterbegin",
        `<div class="presenterBox">
        <div>
            <h2>`+ user +`</h2>
            <hr>
            <p>
            `+ comment +`
            </p>
        </div>
        </div>`);
        }
        catch (err) {
            console.error(err);
        }

        let commentData = user + ", " + comment;
        let url = URL;
        
        //alert(commentData);
        
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(commentData),
            headers: { 'Content-Type': 'text/json' }
            }).then(res => res.json())
            .then(json => console.log(json));

            

        //reset fields
        $("user").value = "";
        $("comment").value = "";
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
        let comments = responseFromServer.split("\n");
                
        //for each response split
        comments.forEach(responseLine => {
            //split line, into array on ","
            let comment = responseLine.split(",");
                
            //at begininng of comment box, add new comment obj, first part of array is username, second is comment
            $("commentContainer").insertAdjacentHTML( "afterbegin",
            `<div class="presenterBox">
            <div>
                <h2>`+ comment[0] +`</h2>
                <hr>
                <p>
                `+ comment[1] +`
                </p>
            </div>
            </div>`
            );
            $("connectError").style.display = "none";
      });
    }
  
    /* ------------------------------ Helper Functions  ------------------------------ */
  
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
