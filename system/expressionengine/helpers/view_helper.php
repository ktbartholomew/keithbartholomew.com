<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * ExpressionEngine - by EllisLab
 *
 * @package		ExpressionEngine
 * @author		EllisLab Dev Team
 * @copyright	Copyright (c) 2003 - 2013, EllisLab, Inc.
 * @license		http://ellislab.com/expressionengine/user-guide/license.html
 * @link		http://ellislab.com
 * @since		Version 2.6
 * @filesource
 */
 
// ------------------------------------------------------------------------

/**
 * ExpressionEngine View Helper
 *
 * @package		ExpressionEngine
 * @subpackage	Helpers
 * @category	Helpers
 * @author		EllisLab Dev Team
 * @link		http://ellislab.com
 */

// ------------------------------------------------------------------------

/**
 * Extend a view in the _template directory
 */
function extend_template($which, $disable = array())
{
	ee()->view->extend('_templates/'.$which, $disable);
}

// ------------------------------------------------------------------------

/**
 * Extend a view. Contents of the current view
 * are passed in as $EE_Rendered_view
 */
function extend_view($which, $disable = array())
{
	ee()->view->extend($which, $disable);
}

// ------------------------------------------------------------------------

/**
 * Check if a view block is disabled
 */
function disabled($which)
{
	return ee()->view->disabled($which);
}

// ------------------------------------------------------------------------

/**
 * Check if a view block is enabled
 */
function enabled($which)
{
	return ! ee()->view->disabled($which);
}

/* End of file */
/* Location: system/expressionengine/helpers/view_helper.php */