# Asset Use (Beta) - Plugin for Craft CMS

Asset Use is a plugin for Craft CMS which adds a Control Panel section to easily spot where assets are or aren't being used on your site.

* Check which assets Craft has indexed are not actually being used anywhere on your site.
* Check which entries are related to a used asset.
* Batch or individually delete unused assets right from the plugin page.

## Usage

* Download and extract the plugin files.
* Copy `assetuse/` to your site's `craft/plugins/` directory.
* Install the plugin.
* Click the 'Asset Use' link in the main CP nav to view the assets.

## Fair Warning

* Asset Use is currently in 'beta', which means it should be used with extreme caution, and is not recommended for production. Always back up your assets and database before use in case of any problems.
* Asset Use doesn't yet check for assets used in Globals.
* Asset Use doesn't yet check for assets of any kind other than 'image'.
* Asset Use has not yet been tested with custom Field Types.

## Roadmap

* Build in checking for assets used in Globals.
* Build in checking other types of assets than just images.
* Test with popular custom Field Types.
* Speed improvements.