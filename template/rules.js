
var attackStrings = ["-d+allow_url_include=on+-d+safe_mode=off+-d+suhosin.simulation=on+-d+disable_functions",
                     "WebAttack",
                     "option=com_jce&task=plugin&plugin=imgmanager&file=imgmanager", "Joomla attack",
                     "/skin_shop/standard/3_plugin_twindow/twindow_notice.php?shop_this_skin_path", "Technote 7 RFI",
                     "/wp-content/themes/striking/includes/timthumb.php?src=", "WP RFI",
                     "CONFIG[MWCHAT_Libs]=http://", "MWChat RFI"];


exports.attackStrings = attackStrings;