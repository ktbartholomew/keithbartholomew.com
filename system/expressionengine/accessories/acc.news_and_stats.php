<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * ExpressionEngine - by EllisLab
 *
 * @package		ExpressionEngine
 * @author		EllisLab Dev Team
 * @copyright	Copyright (c) 2003 - 2013, EllisLab, Inc.
 * @license		http://ellislab.com/expressionengine/user-guide/license.html
 * @link		http://ellislab.com
 * @since		Version 2.0
 * @filesource
 */
 
// ------------------------------------------------------------------------

/**
 * ExpressionEngine News and Stats Accessory
 *
 * @package		ExpressionEngine
 * @subpackage	Control Panel
 * @category	Accessories
 * @author		EllisLab Dev Team
 * @link		http://ellislab.com
 */
class News_and_stats_acc {
	
	var $name			= 'News and Stats';
	var $id				= 'newsAndStats';
	var $version		= '1.0';
	var $description	= 'ExpressionEngine News and Stats';
	var $sections		= array();

	/**
	 * Constructor
	 */
	function __construct()
	{
		$this->EE =& get_instance();
		ee()->lang->loadfile('homepage');
	}
	
	// --------------------------------------------------------------------
	
	/**
	 * Set Sections
	 *
	 * Set content for the accessory
	 *
	 * @access	public
	 * @return	void
	 */
	function set_sections()
	{
		$this->sections['News'] = $this->_fetch_news();
		$this->sections[lang('site_statistics')] = $this->_fetch_stats();
		
		ee()->javascript->output('
			$("#newsAndStats").find("a.entryLink").click(function() {
				$(this).siblings(".fullEntry").toggle();
				return false;
			});
		');
	}

	// --------------------------------------------------------------------
	
	/**
	 * Fetch News
	 *
	 * @access	public
	 * @return	string
	 */
	function _fetch_news()
	{
		$ret = ''; 
		
		if ( ! file_exists(PATH_PI.'pi.magpie.php'))
		{
			return '';
		}
		
		if ( ! defined('MAGPIE_CACHE_AGE'))
		{
			define('MAGPIE_CACHE_AGE', 60*60*24*3); // set cache to 3 days
		}
		
		if ( ! defined('MAGPIE_CACHE_DIR'))
		{
			define('MAGPIE_CACHE_DIR', APPPATH.'cache/magpie_cache/');
		}
		
		if ( ! defined('MAGPIE_DEBUG'))
		{
			define('MAGPIE_DEBUG', 0);
		}

		if ( ! class_exists('Magpie'))
		{
			require PATH_PI.'pi.magpie.php';
		}

		$feed = fetch_rss('http://ellislab.com/blog/rss-feed/cpnews/', 60*60*24*3); // set cache to 3 days

		$i = 0;

		if ( ! is_object($feed) OR count($feed->items) == 0)
		{
			return '';
		}
		else
		{
			// Load typography class
			ee()->load->library('typography');
			ee()->typography->initialize();

			$obj = new stdClass;

			$total = (count($feed->items) >= 3) ? 3 : count($feed->items);

			for ($i = 0; $i < $total; $i++)
			{
				$title = $feed->items[$i]['title'];

				$date = $feed->items[$i]['dc']['date'];
				$date = ee()->localize->human_time(strtotime(preg_replace(
					"/(20[10][0-9]\-[0-9]{2}\-[0-9]{2})T([0-9]{2}:[0-9]{2}:[0-9]{2})Z/", 
					'\\1 \\2 UTC',
					$date
				)));
				
				$content = $feed->items[$i]['description'];
				$link = ee()->cp->masked_url($feed->items[$i]['link']);

				$content = ee()->security->xss_clean(
					ee()->typography->parse_type(
						$content, 
						array(
							'text_format'   => 'xhtml',
							'html_format'   => 'all',
							'auto_links'    => 'y',
							'allow_img_url' => 'n' // Disable images for security
						)
					)
				);
				
				$ret .= "
					<div class='entry'>
						<a class='entryLink' href='{$link}'>{$title}</a>
						<div class='entryDate'>{$date}</div>
						<div class='fullEntry'>
							{$content}
						</div>
					</div>
				";
			}
			
			$ret .= '
				<div>
					<a onclick="window.open(this.href); return false;" href="'.
						ee()->cp->masked_url('http://ellislab.com/blog/').
					'">'.lang('more_news').'</a>
				</div>';
			
			return $ret;
		}
	}

	// --------------------------------------------------------------------
	
	/**
	 * Fetch Stats
	 *
	 * @access	public
	 * @return	string
	 */
	function _fetch_stats()
	{
		// default array for our "Values" data cells.  We'll just set the 'data' for each row
		// and save ourselves a bit of repeated code applying the class
		$values = array('data' => '', 'class' => 'values');
		
		ee()->load->library('table');
		ee()->load->helper(array('url', 'snippets'));
//		ee()->table->set_heading(lang('site_statistics'), array('data' => lang('value'), 'class' => 'values'));
		
		if (ee()->session->userdata['group_id'] == 1)
		{
			$values['data'] = (ee()->config->item('is_system_on') == 'y') ? '<strong>'.lang('online').'</strong>' : '<strong>'.lang('offline').'</strong>';
			ee()->table->add_row(lang('system_status'), $values);

			if (ee()->config->item('multiple_sites_enabled') == 'y')
			{
				$values['data'] = (ee()->config->item('is_site_on') == 'y' && ee()->config->item('is_system_on') == 'y') ? '<strong>'.lang('online').'</strong>' : '<strong>'.lang('offline').'</strong>';
				ee()->table->add_row(lang('site_status'), $values);
			}
			
			ee()->lang->loadfile('modules');
			$values['data'] = APP_VER;
			ee()->table->add_row(lang('module_version'), $values);
		}
		
		// total entries and comments
		ee()->db->where(array('site_id' => ee()->config->item('site_id')));
		$query = ee()->db->get('stats');
		
		$row = $query->row();
		
		$values['data'] = $row->total_entries;
		ee()->table->add_row(lang('total_entries'), $values);

		$values['data'] = $row->total_comments;
		ee()->table->add_row(lang('total_comments'), $values);
		
		// total template hits
		ee()->db->select_sum('templates.hits', 'total');
		ee()->db->from(array('templates'));
		$query = ee()->db->get();
		
		$row = $query->row();
		$values['data'] = $row->total;
		ee()->table->add_row(lang('total_hits'), $values);

		// member stats
		if (ee()->session->userdata('group_id') == 1)
		{
			// total members
			$values['data'] = ee()->db->count_all_results('members');
			ee()->table->add_row(lang('total_members'), $values);

			// total members waiting validation
			$values['data'] = 0;

			if (ee()->config->item('req_mbr_activation') == 'manual')
			{
				ee()->db->where('group_id', '4');
				$values['data'] = ee()->db->count_all_results('members');
			}
			
			ee()->load->helper(array('url', 'snippets'));
			
			$l = anchor(
				BASE.AMP.'C=members&M=member_validation',
				required(
					lang('total_validating_members')
				)
			);
			
			$link = ($values['data'] > 0) ? $l : lang('total_validating_members');

			ee()->table->add_row($link, $values);
		}

		// total comments waiting validation
		if (ee()->cp->allowed_group('can_moderate_comments'))
		{
			ee()->load->model('addons_model');

			// is the comment module installed?
			if (ee()->addons_model->module_installed('comments'))
			{
				$values['data'] = 0;
			
				ee()->db->where(array('status' => 'p', 'site_id' => ee()->config->item('site_id')));
				$values['data'] = ee()->db->count_all_results('comments');
				
				$l = anchor(
					BASE.AMP.'C=addons_modules'.AMP.'M=show_module_cp'.AMP.'module=comment'.AMP.'method=index'.AMP.'status=p',
					required(
						lang('total_validating_comments')
					)
				);

				$link = ($values['data'] > 0) ? $l : lang('total_validating_comments');
				ee()->table->add_row($link, $values);
			}
		}
		
		$tmpl = array(
			'table_open' => '<table border="0" cellpadding="0" cellspacing="0">',
		);
		
		ee()->table->set_template($tmpl);
		$ret = ee()->table->generate();
		ee()->table->clear();
		
		return $ret;
	}

	// --------------------------------------------------------------------
	
}
// END CLASS

/* End of file acc.news_and_stats.php */
/* Location: ./system/expressionengine/accessories/acc.news_and_stats.php */