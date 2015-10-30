<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Production config overrides & db credentials
 * 
 * Our database credentials and any environment-specific overrides
 * 
 * @package    Focus Lab Master Config
 * @version    1.1.1
 * @author     Focus Lab, LLC <dev@focuslabllc.com>
 */

$env_db['hostname'] = $_ENV['MYSQL_HOST'];
$env_db['username'] = $_ENV['MYSQL_USER'];
$env_db['password'] = $_ENV['MYSQL_PASS'];
$env_db['database'] = $_ENV['MYSQL_DB'];

// Sample global variable for Production only
// Can be used in templates like "{global:google_analytics}"
$env_global['global:google_analytics'] = 'UA-21431284-1';

/* End of file config.prod.php */
/* Location: ./config/config.prod.php */
