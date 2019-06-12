$(document).ready(function () {
	$('#uploadMasterListZip').click(function () {
		var retVal = confirm("Do you want to upload MasterList Zip?");
		if (retVal == true) {
			$('input[type=file]').simpleUpload("/uploadMasterListZip", {

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
					console.log(data);
					$('.loader').css({
						"display": "none"
					});
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

	$('#uploadStl').click(function () {
		var retVal = confirm("Do you want to upload STL?");
		if (retVal == true) {
			$('input[type=file]').simpleUpload("/uploadStl", {

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
					console.log(data);
					$('.loader').css({
						"display": "none"
					});
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

	$('#computerdE').click(function () {
		var stlVal = $("#listOfStl option:selected").text();
		var retVal = confirm("Do you want to compute dE?");
		if (retVal == true) {
			$('.loader').css({
				"display": "block"
			});
			toggleAllButtons(true);
			$.get("/compute_dE?stlName=" + stlVal, function (data) {
				alert("Computed dE");
				$('.loader').css({
					"display": "none"
				});
				toggleAllButtons(false);
			});
		}
	});

	$('#uploadColorPdf').click(function () {
		alert("Coming soon");
	});

	$('#triggerComputerdEPopup').click(function () {
		$.get("/getStlList", function (data) {
			$('#listOfStl').empty()
			$.each(data, function (index, value) {
				$('#listOfStl').append($('<option/>', {
					value: value,
					text: value
				}));
			});
			$('#overlayComputerdE').fadeIn(300);
		});
	});

	$('#closeComputerdE').click(function () {
		$('#overlayComputerdE').fadeOut(300);
	});

	$('#triggerDeletePopup').click(function () {
		var data = ['Color_PDF_Extract', 'Master_BAC_Lab', 'Point_Cloud', 'Master_BAC_dE']
		$('#listOfTables').empty()
		$.each(data, function (index, value) {
			$('#listOfTables').append($('<option/>', {
				value: value,
				text: value
			}));
		});
		var objectVal = $("#listOfTables option:selected").text();

		$.get("/getReferenceList?objectName=" + objectVal, function (data) {
			$('#listOfReference').empty()
			$.each(data, function (index, value) {
				$('#listOfReference').append($('<option/>', {
					value: value,
					text: value
				}));
			});
			$('#overlayDelete').fadeIn(300);
		});
	});

	$('#closeDelete').click(function () {
		$('#overlayDelete').fadeOut(300);
	});

	$('#listOfTables').on('change', function () {
		refreshReferenceList();
	});

	function refreshReferenceList() {
		$.get("/getReferenceList?objectName=" + this.value, function (data) {
			$('#listOfReference').empty()
			$.each(data, function (index, value) {
				$('#listOfReference').append($('<option/>', {
					value: value,
					text: value
				}));
			});
		});
	}

	$('#delete').click(function () {
		var objectVal = $("#listOfTables option:selected").text();
		var referenceFilter = $("#listOfReference option:selected").text();
		$.get('/deleteObject?objectName=' + objectVal + '&referenceFilter=' + referenceFilter, function (data) {
			alert('Total Object Deleted (' + data + ')');
			refreshReferenceList();
		});
	});

	function toggleAllButtons(status) {
		document.getElementById("uploadMasterListZip").disabled = status;
		document.getElementById("uploadStl").disabled = status;
		document.getElementById("uploadColorPdf").disabled = status;
		document.getElementById('uploadFile').disabled = status
		document.getElementById("triggerComputerdEPopup").disabled = status;
		document.getElementById("triggerDeletePopup").disabled = status;
		document.getElementById("computerdE").disabled = status;
		document.getElementById("delete").disabled = status;
	}
});