$(document).ready(function () {
  let data2;
  let res1;
  let res2;

  $("#snackbar").removeClass("show");
  $(".fileInput").change(function (e) {
    data2 = $(".fileInput").prop("files");
    myFunction(data2)
  }),

    $(".DropBoxParent").on("drop", function (e) {
      e.preventDefault();
      let files = e.originalEvent.dataTransfer.files;
      $(".DropBoxParent").removeClass("addDrag");
      if (files.length) {
        $(".fileInput").prop({ files: e.originalEvent.dataTransfer.files });
        data2 = $(".fileInput").prop("files");
      }
      myFunction(data2)
    });


  // Click On copy & adding Link to copy Inside input Field
  $(".copyImage").click(function () {
    navigator.clipboard.writeText($(".myInput").val());
    $(".myInput").select();
    $("#snackbar").text("Link Copied");
    $("#snackbar").addClass("show");
    setTimeout(function () {
      $("#snackbar").removeClass("show");
    }, 2000);
  }),


    // Performing Action to send user data   
    $(".sendBtn").click(function () {
      let x = $(".formData").children();
      let arr = [];
      x.each(function () {
        if ($(this).val()) {
          arr.push($(this).val());
        }
      });
      let data = {
        emailFrom: arr[0],
        emailTo: arr[1]
      }
      if (arr.length == 3) {
        data.message = arr[2];
      } else if (arr.length < 2) {
        $("#snackbar").text("All Fields Are Required");
        $("#snackbar").addClass("show");
        setTimeout(function () {
          $("#snackbar").removeClass("show");
        }, 2000);
      }
      sendEmail(data)
    });

  // $(".downloadBtn").click(function(){
  //   let url = $(location).attr('href').split("/"); 
  //   console.log(url[url.length-1].split("'"))
  // })
  //Call to Upload File
  let myFunction = function (data) {
    const formdata = new FormData();
    formdata.append("myfile", data[0]);
    //Tracking Upload Process 
    $.ajax({
      xhr: function () {
        var xhr = new window.XMLHttpRequest();
        xhr.upload.addEventListener(
          "progress",
          function (evt) {
            if (evt.lengthComputable) {
              var percentComplete = (evt.loaded / evt.total) * 100;
              $(".progressBarCount").width(percentComplete + "%");
              $(".progressBarCount").text(percentComplete + "%");
            }
          },
          false
        );
        return xhr;
      },
      // Api call to Upload
      url: "/api/single", // Url of backend (can be python, php, etc..)
      method: "POST", // data type (can be get, post, put, delete)
      data: formdata,
      processData: false,
      contentType: false,
      success: function (response) {
        console.log(response);
        res1 = response.file;
        let uuid = response.file2.split("/");
        sessionStorage.setItem("uuid", uuid[uuid.length - 1]);
        if (response) {
          $(".progressBarCount").hide();
          $(".colmn2").addClass("fade-in");
          $(".colmn2").removeClass("hideCol");
          $(".progressBar").hide();
          $(".myInput").val(response.file2);
        } else {
          $(".colmn2").hide();
        }
      },
      error: function (err) {
        console.log(err);
      },
    });
  };


  // API call to send file to a email
  function sendEmail(userData) {
    let uuid = sessionStorage.getItem("uuid");
    $.ajax({
      url: "/api/send",
      method: "POST",
      data: {
        "from": userData.emailFrom,
        "to": userData.emailTo,
        "uuid": uuid
      },
      dataType: "JSON",
      success: function (response) {
        if (response) {
          $("#snackbar").text("Mail Sent");
          $("#snackbar").addClass("show");
          setTimeout(function () {
            $("#snackbar").removeClass("show");
          }, 2000);
        }
      },
      error: function (err) {
        console.log(err + " error");
      },
    });
  }
});


