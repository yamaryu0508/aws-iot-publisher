// main method
function createDOMElements() {
  buildRegionSelector('#aws-region');
  buildTable('operation-fields');
}

// build select element of Region
function buildRegionSelector(select_id) {
  var options, $option, isSelected;
  var list = {
    'us-east-1': 'US East (N. Virginia)',
    'us-west-2': 'US West (Oregon)',
    'eu-west-1': 'EU (Ireland)',
    'ap-northeast-1': 'Asia Pacific (Tokyo)'
  };

  options = $.map(list, function(name, value) {
    // default: ap-northeast-1
    isSelected = (value === 'ap-northeast-1');
    $option = $('<option>', {
      value: value,
      text: name + ' [' + value + ']',
      selected: isSelected
    });
    return $option;
  });

  $(select_id).append(
    options
  );
}

// build table with variable rows
function buildTable(tbody_id) {
  // the first TR element defined in HTML is copied and hidden
  // the hidden element is copied each time
  $('#' + tbody_id + ' > tr').clone(true).insertAfter($('#' + tbody_id + ' > tr'));
  $('#' + tbody_id + ' > tr:first').hide();

  // hide delete button when the row is single
  $('.delete').hide();

  // click event of add button
  $('.add-active').on('click', function() {
    // hidden TR element is copied
    $('#' + tbody_id + ' > tr').eq(0).clone(true).show().insertAfter(
      $(this).parent().parent()
    );
    // delete button are shown when displayed rows are more than 3 rows.
    if ($('.add-active').length > 2) {
      $('.delete').show();
    }
  });

  // click event of delete button
  $('.delete').on('click', function() {
    // delete delete button
    $(this).parents('tr').remove();
    // 表示行が1行（hide()の先頭行を含めると2行）になったら、削除ボタンをhide()する
    // delete button are hidden when displayed rows equal 2 rows.
    if ($('.add-active').length === 2) {
      $('.delete').hide();
    }
  });
}
