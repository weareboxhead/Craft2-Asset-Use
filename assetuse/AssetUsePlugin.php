<?php

namespace Craft;

class AssetUsePlugin extends BasePlugin
{
	function getName()
	{
		return Craft::t('Asset Use');
	}

	function getVersion()
	{
		return '0.1';
	}

	function getDeveloper()
	{
		return 'Boxhead';
	}

	function getDeveloperUrl()
	{
		return 'http://boxhead.io';
	}

	function hasCpSection()
	{
		return true;
	}

	public function getSourceLanguage()
	{
		return 'en_gb';
	}
}