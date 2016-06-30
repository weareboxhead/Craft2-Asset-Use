$(function() {
	"use strict";

	var toggleChecks 	= $('.js-toggle-checks'),
		toggleChecksBox = $('.js-toggle-checks-box'),
		assetChecks 	= $('.js-asset-check'),
		optionsMenuLink	= $('.js-options'),
		optionsMenu		= $('.js-options-menu'),
		root 			= $('.js-root'),
		siteUrl 		= root.data('site-url')
	;

	function allAssetsChecked() {
		return checkedAssetsLength() === assetChecks.length;
	}

	function checkedAssetsLength() {
		return assetChecks.filter('.checked').length;
	}

	function showOptionsMenuLinkIfNecessary(allAssetsCheckedBool) {
		// If we know that all assets are checked
		// or at least one is checked
		if (allAssetsCheckedBool || checkedAssetsLength()) {
			// Show the options button
			optionsMenuLink.addClass('show');
		} else {
			// Otherwise hide it
			optionsMenuLink.removeClass('show');
		}
	}

	function hideOptionsMenu() {
		// Hide the options menu
		optionsMenu.hide();
	}

	function toggleOptionsMenu() {
		// Hide or show the options menu
		optionsMenu.toggle();
	}

	function setToggleChecksState(allAssetsCheckedBool) {
		if (typeof allAssetsCheckedBool === 'undefined') {
			allAssetsCheckedBool = allAssetsChecked();
		}

		// Remove all check classes
		toggleChecksBox.removeClass('indeterminate  checked');

		// If all assets are checked
		if (allAssetsCheckedBool) {
			// Add the class
			toggleChecksBox.addClass('checked');
			// If there is at least one checked
		} else if (checkedAssetsLength()) {
			// Add the at least one checked class
			toggleChecksBox.addClass('indeterminate');
		}
	}

	function confirmDeletion() {
		// Just confirm quickly in case the user hit delete by accident..
		var decision = confirm('Are you sure you want to delete the selected assets?');

		return decision;
	}

	function deleteFiles(ids, els) {
		// Post directly to Craft's delete file script, with an array of the ids to delete
		$.post(siteUrl + 'actions/assets/deleteFile', { fileId: ids }, function(response) {
			// If this worked successfully
			if (response.success) {
				// Remove the relevant rows
				els.remove();

				// Update this now that it has changed
				assetChecks	= $('.js-asset-check');

				setToggleChecksState();

				alert('Assets deleted');

				// If we have deleted all unused assets
				if (!$('.js-unused-file').length) {
					// Show the message
					$('.js-no-unused-message').show();

					// Hide the toolbar and table
					$('.js-toolbar, .js-unused-assets').hide();
				}
			} else {
				alert('Sorry, something went wrong');
			}
		});
	}

	// On changing the state of any asset check, show the options if necessary
	assetChecks.on('click', function() {
		var $this = $(this);

		// Invert the checked class on this checkbox
		$this.toggleClass('checked');

		// Focus on the tr (in line with Craft's usage)
		$this.closest('tr').attr('tabindex', 0).focus();

		var allAssetsCheckedBool = allAssetsChecked();

		setToggleChecksState(allAssetsCheckedBool);

		showOptionsMenuLinkIfNecessary(allAssetsCheckedBool);
	});

	// On clicking the toggle checks button
	toggleChecks.on('click', function() {
		// We will be using the inverse of the current state
		var allAssetsCheckedBool = allAssetsChecked();

		// If all the assets are checked
		if (allAssetsCheckedBool) {
			// Uncheck them
			assetChecks.removeClass('checked');
		// Otherwise
		} else {
			// Check them
			assetChecks.addClass('checked');
		}

		// This now inverts as it has switched
		allAssetsCheckedBool = !allAssetsCheckedBool;

		setToggleChecksState(allAssetsCheckedBool);

		showOptionsMenuLinkIfNecessary(allAssetsCheckedBool);
	});

	$('.js-toggle-options-menu').on('click', function(e) {
		// Don't allow this to go through to the body
		e.stopPropagation();

		toggleOptionsMenu();
	});

	// Close the options menu on clicking off it
	$('body').on('click', hideOptionsMenu);

	// On clicking the delete checked link
	$('.js-delete-checked').on('click', function(e) {
		// Get each container for the files to delete
		var filesToDelete = $('.js-asset-check').filter('.checked').closest('.js-unused-file'),
			ids = [];

		e.preventDefault();

		// If the user confirms deletion
		if (confirmDeletion()) {
			// Get the ids of each file
			filesToDelete.each(function() {
				ids.push($(this).data('file-id'));
			});

			deleteFiles(ids, filesToDelete);
		}

		hideOptionsMenu();
	});

	// On clicking the 'get used assets' link
	$('.js-get-used-assets').on('click', function(e) {
		var $this = $(this),
			postData = { usedAssetIds: $this.data('used-asset-ids') };

		e.preventDefault();

		$.post(siteUrl + 'admin/assetuse/_used-assets', postData, function(returnData) {
			// Hide this now redundant link
			$this.hide();

			// Paste the return data
			$('.js-used-assets-placeholder').html($(returnData));

			// Set up the modal box handler
			var modalBoxHandler = {
				shade: 			$('.js-ms'),
				box: 			$('.js-mb'),
				titleArea: 		$('.js-mb-title'),
				contentArea: 	$('.js-mb-content'),

				// Show the modal box
				show: function() {
					this.els.fadeIn(300);
				},

				// Hide the modal box
				hide: function() {
					this.els.fadeOut(300);
				},

				// Set the content of the modal box
				setContent: function(title, content) {
					this.titleArea.text(title);

					this.contentArea.html(content);
				},

				// Run when object is initialised
				constructor: function() {
					this.els = this.shade.add(this.box);

					// On clicking the 'close modal box' link (or on clicking the modal shade), 
					// close the box
					this.shade.add($('.js-close-mb')).on('click', function() {
						modalBoxHandler.hide();
					});
				}
			};

			modalBoxHandler.constructor();

			// On clicking the 'get entries' link
			root.on('click', '.js-get-entries', function(e) {
				var link 		= $(this),
					assetTitle 	= link.data('asset-title'),
					assetId 	= link.data('asset-id');

				// Get this asset's id
				var postData = { assetId: assetId };

				e.preventDefault();

				// Post to the entries template and show the data!
				$.post(siteUrl + 'admin/assetuse/_entries', postData, function(returnData) {
					modalBoxHandler.setContent(assetTitle, $(returnData));

					modalBoxHandler.show();
				});
			});
		});
	});
});
