<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

// ------------------------------------------------------------------------

/**
 * minimalist Extension
 *
 * @package		ExpressionEngine
 * @subpackage	Addons
 * @category	Extension
 * @author		Gridwork
 * @link
 */

class Minimalist_ext {

	var $settings 		= array();
	var $description	= 'Minimalist';
	var $docs_url		= 'http://gridworkdesign.com/minimalist/documentation';
	var $name			= 'Minimalist';
	var $settings_exist	= 'y';
	var $version		= '2.0.3';

	function Minimalist_ext($settings = '')
	{
		$this->EE =& get_instance();
		$this->settings = $settings;
		$this->EE->cp->set_breadcrumb('', 'Minimalist');
	}

	public function activate_extension()
	{
	    $this->settings = array();
	    $this->settings = array();
	    //$this->settings['auto_night_mode']      = array('r', array('y' => "On", 'n' => "Off"), 'y');
	    // $this->settings['exploding_nav']      = array('r', array('y' => "On", 'n' => "Off"), 'y');
	    $this->settings['keyboard']      = array('r', array('y' => "On", 'n' => "Off"), 'y');
	    //$this->settings['full_screen_templates']      = array('r', array('y' => "On", 'n' => "Off"), 'y');
  //  	    $this->settings['highlight_color']      = array('r', array('ye' => "Yellow", 'gr' => "Green", 'bl' => "Blue", 'gy' => "Grey"), 'ye');
	    $this->settings['fixed_nav']    = array('r', array('y' => "On", 'n' => "Off"), 'y');
	    $this->settings['fixed_foot']    = array('r', array('y' => "On", 'n' => "Off"), 'y');
	    $data = array(
	        'class'     => __CLASS__,
	        'method'    => 'minimalist',
	        'settings'  => serialize($this->settings),
	        'priority'  => 10,
	        'version'   => $this->version,
	        'enabled'   => 'y'
	    );

	    $this->EE->db->insert('extensions', $data);
	}

function settings()
{
    $settings = array();
    //$settings['auto_night_mode']      = array('r', array('y' => "On", 'n' => "Off"), 'y');
    // $settings['exploding_nav']      = array('r', array('y' => "On", 'n' => "Off"), 'y');
    $settings['keyboard']      = array('r', array('y' => "On", 'n' => "Off"), 'y');
    //$settings['full_screen_templates']      = array('r', array('y' => "On", 'n' => "Off"), 'y');
  //  $settings['highlight_color']      = array('r', array('ye' => "Yellow", 'gr' => "Green", 'bl' => "Blue", 'gy' => "Grey"), 'ye');
    $settings['fixed_nav']    = array('r', array('y' => "On", 'n' => "Off"), 'y');
    $settings['fixed_foot']    = array('r', array('y' => "On", 'n' => "Off"), 'y');
  //  $settings['font_size']    = array('s', array('big' => 'Big', 'medium' => 'Medium', 'small' => 'Small'), 'medium');

    return $settings;
}
// END

	function disable_extension()
	{
		$this->EE->db->where('class', __CLASS__);
		$this->EE->db->delete('extensions');
	}

	function update_extension($current = '')
	{
		if ($current == '' OR $current == $this->version)
		{
			return FALSE;
		}
	}

	// ----------------------------------------------------------------------
}

/* End of file ext.minimalist.php */
/* Location: /system/expressionengine/third_party/minimalist/ext.minimalist.php */
?>