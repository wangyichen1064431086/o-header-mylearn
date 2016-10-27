const ajax = {
	getData: function (url, callback) {
	  var xhr = new XMLHttpRequest();  

	  xhr.onreadystatechange = function() {
	    if (xhr.readyState === 4) {
	      if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
	        var type = xhr.getResponseHeader('Content-Type');
	        if (type.indexOf('xml') !== -1 && xhr.responseXML) {
	          callback(xhr.responseXML);
	        } else if (type === 'application/json') {
	          callback(JSON.parse(xhr.responseText));
	        } else {
	          callback(xhr.responseText);
	        }
	      } else {
	        console.log('Request was unsuccessful: ' + xhr.status);
	      }

	    } else {
	      console.log('readyState: ' + xhr.readyState);
	    }
	  }

	  xhr.onprogress = function(event) {
	    console.log('Request Progress: Received ' + event.loaded / 1000 + 'kb, Total' + event.total / 1000 + 'kb');
	  }
	  xhr.open('GET', url);
	  xhr.send(null);
	}
}

module.exports = ajax;