$(document).ready(function () {
	$('#uploadResume').click(function () {
		var retVal = confirm("Do you want to upload Resume?");
		if (retVal == true) {
			$('input[type=file]').simpleUpload("/uploadResume", {

				cache:false,
				xhrFields:{
					responseType: 'blob'
				},

				start: function (file) {
					//upload started
					console.log("upload started");
					$('#filename').html(file.name);
					$('.loader').css({
						"display": "block"
					});
					toggleAllButtons(true);
				},

				progress: function (progress) {
					//received progress
					//console.log("upload progress: " + Math.round(progress) + "%");
					$('#progress').html("Progress: " + Math.round(progress) + "%");
					$('#progressBar').width(progress + "%");
				},

				success: function (data) {
					//upload successful
					console.log(typeof data);
					console.log("upload successful!");
					//console.log(data);
					$('.loader').css({
						"display": "none"
					});

					var img = document.getElementById('wordCloudBlob');
					var url = window.URL || window.webkitURL;
					img.src = url.createObjectURL(data);

					toggleAllButtons(false);

				},

				error: function (error) {
					//upload failed
					console.log("upload error: " + error.name + ": " + error.message);
					$('#progress').html("Failure!<br>" + error.name + ": " + error.message);
					toggleAllButtons(false);
				}

			});
		}
	});

	function toggleAllButtons(status) {
		document.getElementById("uploadResume").disabled = status;
	}
});