<?php

namespace Craft;

class AssetUse_MainService extends BaseApplicationComponent
{
	private $thumbParams = array(
		'mode'  	=> 'crop',
		'width' 	=> 30,
		'height'	=> 30,
	);

	public function getImageThumb($image)
	{
		// Inline the width and height here for svgs which we can't manipulate
		?>

		<a href="<?php echo $image->getUrl(); ?>" target="_blank" title="View full image">
			<img class="thumb" src="<?php echo $image->getUrl($this->thumbParams); ?>" style="width: <?php echo $this->thumbParams['width']; ?>px; height: <?php echo $this->thumbParams['height']; ?>">
		</a>

		<?php
	}

	public function getFormattedFilesize($asset)
	{
		$size = $asset->size;

		return craft()->templates->render('assetuse/filters/_filesize', array('size' => $size));
	}

	public function getAllMatrixFieldsHandles()
	{
		$matrixFieldsHandles 	= array();
		$fieldsService 			= new FieldsService;

		foreach ($fieldsService->getAllFields() as $field) {
			if ($field->type === 'Matrix') {
				$matrixFieldsHandles[] = $field->handle;
			}
		}

		return $matrixFieldsHandles;
	}
}