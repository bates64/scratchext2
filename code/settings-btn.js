// add a button to the account menu
$('.logout').before('<li><a id="scratchext-settings" href="javascript:void;">ScratchExt Settings</a></li>');

// when said button is clicked load some swag
$('#scratchext-settings').on('click', function() {
  scratchext.log('Settings swag');
});
