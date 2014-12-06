
var attackStrings = ["-d+allow_url_include=on+-d+safe_mode=off+-d+suhosin.simulation=on+-d+disable_functions",
                     "WebAttack",
                     "option=com_jce&task=plugin&plugin=imgmanager&file=imgmanager", "Joomla attack",
                     "/skin_shop/standard/3_plugin_twindow/twindow_notice.php?shop_this_skin_path", "Technote 7 RFI",
                     "/wp-content/themes/striking/includes/timthumb.php?src=", "WP RFI",
                     "option=com_jce&task=plugin&plugin=imgmanager&file=imgmanager&method=form&cid=", "Joomla attack",  // Januar 2012
                     "/admin_area/charts/tmp-upload-images/lobex21.php?rf", "Openflash File upload attack",             // May 2014
                     "/administrator/components/com_joomleague/assets/classes/php-ofc-library/ofc_upload_image.php?name=", "Openflash upload attack",
                     "/wp-content/plugins/seo-watcher/ofc/php-ofc-library/ofc_upload_image.php?name=lobex21.php", "Openflash upload attack",
                     "/components/com_jnews/includes/openflashchart/php-ofc-library/ofc_upload_image.php?name=", "Openflash upload attack",
                     "CONFIG[MWCHAT_Libs]=http://", "MWChat RFI",
                     "/login.php?un=1&pw=-1'", "SQL Injection",
                     "un=-1'&pw=1", "SQL Injection",
                     "/index.php?option=com_jce&task=plugin&plugin=imgmanager&fil", "JCE attack"
                      ];                                                      // MWchat RFI 2006


var replaceStrings = ["user-agent", "User-Agent", "host", "Host", "content-type:", "Content-type:"
];

exports.attackStrings = attackStrings;
exports.replaceStrings = replaceStrings;