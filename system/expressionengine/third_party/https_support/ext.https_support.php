<?php

class Https_support_ext {

	var $name			= 'HTTPS Support';
	var $version 		= '0.2';
	var $description	= 'Enables HTTPS support';
	var $settings_exist	= 'n';
	var $docs_url		= '';
	
	var $settings 		= array();
    
	function __construct($settings = '')
	{
		$this->EE =& get_instance();
		$this->settings = $settings;
	}
	
	function activate_extension()
	{
		$data = array(
			'class'		=> __CLASS__,
			'method'	=> 'apply_https_support',
			'hook'		=> 'sessions_start',
			'settings'	=> serialize($this->settings),
			'priority'	=> 1,
			'version'	=> $this->version,
			'enabled'	=> 'y'
		);
	
		$this->EE->db->insert('extensions', $data);
	}
	
	function update_extension($current = '')
	{
		if ($current == '' OR $current == $this->version)
		{
			return FALSE;
		}
		
		$this->EE->db->where('class', __CLASS__);
		$this->EE->db->update('extensions', array('version' => $this->version));
	}
	
	function disable_extension()
	{
		$this->EE->db->where('class', __CLASS__);
		$this->EE->db->delete('extensions');
	}
	
	function apply_https_support($obj)
	{
		if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on')
		{
			$target_config_keys = array (
				'site_url',
				'base_url',
				'avatar_url',
				'photo_url',
				'sig_img_url',
				'theme_folder_url',
				'captcha_url',
				'emoticon_path'
			);
			
			foreach ($target_config_keys as $key)
			{
			   $protocol = (isset($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] == "on");
          if($protocol)
          {
            $this->EE->config->config[$key] = str_ireplace('http://', 'https://', $this->EE->config->config[$key]);
          }
			}
		}
	}
}

?>