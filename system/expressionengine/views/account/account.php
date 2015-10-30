<?php extend_view('account/_wrapper') ?>

<div id="member_stats">
	<h3><?=lang('member_stats').NBS.$username?></h3>

	<?php foreach($fields as $key=>$value):?>
	<p>
		<span><?=lang($key)?>:</span>
		<?=$value?>
	</p>
	<?php endforeach;?>
</div>