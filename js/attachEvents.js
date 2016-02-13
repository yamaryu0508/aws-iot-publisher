// main method
function attachEvents() {

  // select event of CA File
  $('#ca-file-select-btn').on('click', function() {
    var focusedWindow = browserWindow.getFocusedWindow();

    dialog.showOpenDialog(focusedWindow, {
      properties: ['openFile']
    }, function(files) {
      files.forEach(function(file) {
        console.log(file);
        $('#ca-file-select').val(file);
      });
    });
  });

  // select event of Certificate File
  $('#client-certificate-file-select-btn').on('click', function() {
    var focusedWindow = browserWindow.getFocusedWindow();

    dialog.showOpenDialog(focusedWindow, {
      properties: ['openFile']
    }, function(files) {
      files.forEach(function(file) {
        console.log(file);
        $('#client-certificate-file-select').val(file);
      });
    });
  });

  // select event of Client Key File
  $('#client-key-file-select-btn').on('click', function() {
    var focusedWindow = browserWindow.getFocusedWindow();

    dialog.showOpenDialog(focusedWindow, {
      properties: ['openFile']
    }, function(files) {
      files.forEach(function(file) {
        console.log(file);
        $('#client-key-file-select').val(file);
      });
    });
  });

  // publish event
  $('#mqtt-publish').on('click', function() {
    // check if required parameter entered
    if (isRequiredEmpty()) {
      swal({
        title: 'Required forms are empty',
        text: '',
        type: "error"
      }, function() {
        return;
      });
    } else {
      try {
        showSpinner();
        var mqtt_json = retrieveTable();
        mqtt_json['time'] = moment().format();

        // set AWS IoT Thing parameters
        var device = awsIot.device({
          keyPath: $('#client-key-file-select').val(),
          certPath: $('#client-certificate-file-select').val(),
          caPath: $('#ca-file-select').val(),
          clientId: $('#client-id').val(),
          region: $('#aws-region').val()
        });

        // connect event
        device
          .on('connect', function() {
            console.log('connect');
            device.publish($('#mqtt-topic').val(), JSON.stringify(mqtt_json));
            console.log(JSON.stringify(mqtt_json));
            hideSpinner();
            swal({
              title: 'Connect',
              text: 'Message: ' + JSON.stringify(mqtt_json),
              type: 'success'
            }, function() {

            });
          });
      } catch (e) {
        hideSpinner();
        swal({
          title: 'Error occurred while publishing process',
          text: '',
          type: "error"
        }, function() {
          return;
        });
      }
    }
  });
}

// retrieve entered values of table
function retrieveTable() {
  var mqtt_json = {};
  var tr = $("table tr"); //テーブルの全行を取得
  for (var i = 1, l = tr.length; i < l; i++) {
    var cells = tr.eq(i).find('input'); //1行目から順番に列を取得(th、td)
    if (cells.eq(0).val() !== '' && cells.eq(1).val() !== '') {
      mqtt_json[cells.eq(0).val()] = cells.eq(1).val();
    }
  }
  return mqtt_json;
}

// check if required parameter entered
function isRequiredEmpty() {
  var flag = false;
  $('.required-form').each(function() {
    console.log($(this).val());
    if ($(this).val() === '') {
      flag = true;
    }
  });
  return flag;
}
