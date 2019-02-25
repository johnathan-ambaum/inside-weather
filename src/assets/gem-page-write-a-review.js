

        jQuery(function() {
            var $module = jQuery('#m-1524783870545').children('.module');

            var mode = jQuery('.gryffeditor').hasClass('editing') ? 'dev' : 'production';
            if(mode == 'production') { 
                var cbLink = $module.find('input[name="gemcallback"]').val() != undefined ? jQuery.trim($module.find('input[name="gemcallback"]').val()) : '';
                if(cbLink != '') {
                    window.location = cbLink;
                }
            } 
        });
    