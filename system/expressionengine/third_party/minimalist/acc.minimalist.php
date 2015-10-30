<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Minimalist Accessory
 *
 * @package		ExpressionEngine
 * @subpackage	Addons
 * @category	Accessory
 * @author		Gridwork Design
 * @link		http://gridworkdesign.com/minimalist
 */

class Minimalist_acc {

	public $name			= 'Minimalist';
	public $id				= 'minimalist';
	public $version			= '2.0.3';
	public $description		= 'Control Panel Theme';
	public $sections		= array();
	var $slug			= 'minimalist';
	var $extension		= 'Minimalist_ext';
	var $settings		= '';

	function Minimalist_acc()
	{
		$this->EE =& get_instance();
		$this->EE->lang->loadfile('minimalist');
	}
	/**
	 * Set Sections
	 */
	public function set_sections()
	{
		$settings_query = $this->EE->db->select('settings')->from('exp_extensions')->where('class', 'Minimalist_ext')->limit(1)->get();
		if ($settings_query->num_rows() > 0)
		{
			$settings = @unserialize($settings_query->row('settings'));
			if ($settings === FALSE) $settings = array();
		}
		$fixed_nav = $settings['fixed_nav'];
		$fixed_foot = $settings['fixed_foot'];
		if ($this->EE->config->item("url_third_themes")){
			$url_third_themes = $this->EE->config->item("url_third_themes");
		} else {
			$url_third_themes = $this->EE->config->item('theme_folder_url');
		}

		$theme_folder_url = $url_third_themes.'third_party/minimalist/';


		$this->EE->cp->add_to_head('<link rel="stylesheet" type="text/css" href="'.$theme_folder_url.'minimalist.css" media="screen" />');
		$this->EE->cp->add_to_head('<link rel="stylesheet" type="text/css" href="'.$theme_folder_url.'payloads/day.css" id="colors" media="screen" />');
		$this->sections[] = '<script type="text/javascript">
			$("#accessoryTabs a.minimalist").parent().remove();
			$("<div class=fancytooltip></div>").insertAfter(".userName");
		</script>';


		/* Setup menu tools, manual night/day switching */
		$this->sections[] = '<script type="text/javascript">
			$("a.logOutButton").hover(
				function() { $(".fancytooltip").fadeIn().text("Log out of system"); },
				function() { $(".fancytooltip").hide(); }
			);
		 	$(".file_manipulate").attr("src", "'.$theme_folder_url.'images/picture.png");
		 	$(".file_manipulate").attr("height", "16");
		 	$(".file_manipulate").attr("width", "16");
		 	$("input:text:visible:first").focus();
			$("input[name=update]").attr("accesskey", "s");
			$(".rightNav .button a:contains(Create)").first().attr("accesskey", "n");
			$(".formArea .formHeading .newTemplate a:contains(Create)").first().attr("accesskey", "n");
			$("#action_nav .button a:contains(Create)").first().attr("accesskey", "n");
			$("input[type=submit]:visible").first().attr("accesskey", "s");
		</script>';

		/* Show accesskey shortcut hints with variable instructions depending on which browser/os combo you have */
		if($settings['keyboard'] !="n")
		{
		$this->sections[] = '<script src="'.$theme_folder_url.'javascript/jquery.client.js"></script><script type="text/javascript">
	        $.ctrl = function(key, callback, args) {
	            $(document).keydown(function(e) {
	            if(!args) args=[];
	            if(e.keyCode == key.charCodeAt(0) && (e.ctrlKey || e.metaKey)) {
	                callback.apply(this, args);
	                return false;
	            }
	            });
	        };
	        $.ctrl("S", function(s) {
	            $("input[name=field_edit_submit], input[name=update], input[name=submit]").click();
	        });
			$("<a href=# class=keys></a>").insertAfter(".userName");
			var browser = $.client.browser;
			var os = $.client.os;
			var shortcut = "<em>Alt</em>";
			if ($.client.browser == "Safari" && $.client.os == "Mac") {
			  var shortcut = "<em>Ctrl</em><em>Alt</em>";
			} else if ($.client.browser == "Chrome" && $.client.os == "Mac") {
			  var shortcut = "<em>Ctrl</em><em>Opt</em>";
			} else if ($.client.browser == "Firefox" && $.client.os != "Mac") {
			  var shortcut = "<em>Alt</em><em>Shift</em>";
			} else if ($.client.browser == "Firefox" && $.client.os == "Mac") {
			  var shortcut = "<em>Ctrl</em>";
			} else {
			  var shortcut = "<em>Alt</em>";
			}
			$("a.keys").hover(
				function() { $(".fancytooltip").fadeIn().html("<b>Keyboard Shortcuts</b> <ol><li><span><u>N</u>ew / Create</span> <strong>"+ shortcut +"N</strong></li><li><span><u>S</u>ave / Submit</span> <strong>"+ shortcut +"S</strong></li><li><span><u>T</u>emplates</span> <strong>"+ shortcut +"T</strong></li><li><span><u>E</u>dit entries</span> <strong>"+ shortcut +"E</strong></li><li><span><u>C</u>hannels</span> <strong>"+ shortcut +"C</strong></li><li><span><u>F</u>ields</span> <strong>"+ shortcut +"F</strong></li><li><span>Cate<u>g</u>ories</span> <strong>"+ shortcut +"G</strong></li><li><span><u>M</u>odules</span> <strong>"+ shortcut +"M</strong></li></ol>"); },
				function() { $(".fancytooltip").hide(); }
			);
			$(".fancytooltip").mouseout(function() {
				$(".fancytooltip").hide();
			});
		</script>';
		}

		if($settings['fixed_nav'] !="n")
		{
		$this->sections[] = '<style type="text/css">
			#mainMenu { position: fixed !important; }
			#mainWrapper { padding-top: 80px; }
			#activeUser { position: fixed !important; }
		</style>';
		}
		if($settings['fixed_foot'] !="n")
		{
		$this->sections[] = '<style type="text/css">
			#accessoriesDiv { position:fixed; bottom:0; left:0; z-index:100; }
			#footer { height:35px; position:fixed; bottom:0; right:0; width:100%; padding:40px 20px 0 0; text-align:right; }
			#footer a:first-child { width: 98px; height: 14px; right:310px; bottom: 9px; position: absolute; display: block; opacity: 0.9; }
			#footer a:first-child:hover { opacity: 1; }
		</style>';
		}
		if($settings['fixed_foot'] =="n")
		{
		$this->sections[] = '<style type="text/css">
			#accessoriesDiv { padding-left: 46px; }
			#accessoriesDiv .accessory { margin-left: -46px; }
			body #footer a:first-child { background: none !important; }
		</style>';
		}

		$this->sections['Minimalist'] = $this->EE->load->view('accessory_minimalist', '', TRUE);
	}

	// ----------------------------------------------------------------

}

/* End of file acc.minimalist.php */
/* Location: /system/expressionengine/third_party/minimalist/acc.minimalist.php */
?>