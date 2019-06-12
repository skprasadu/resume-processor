$(document).ready(function () {
	$('#uploadResume').click(function () {
		var retVal = confirm("Do you want to upload MasterList Zip?");
		if (retVal == true) {
			$('input[type=file]').simpleUpload("/uploadResume", {

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
					$('.div_imagetranscrits').html('<img src="data:image/png;base64,' + data + '" />');

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