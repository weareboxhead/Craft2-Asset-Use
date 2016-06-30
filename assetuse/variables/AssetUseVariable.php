<?php

namespace Craft;

class AssetUseVariable
{
    public function getImageThumb($image)
    {
        return craft()->assetUse_main->getImageThumb($image);
    }

    public function getFormattedFilesize($asset)
    {
        return craft()->assetUse_main->getFormattedFilesize($asset);
    }

    public function getAllMatrixFieldsHandles()
    {
        return craft()->assetUse_main->getAllMatrixFieldsHandles();
    }
}