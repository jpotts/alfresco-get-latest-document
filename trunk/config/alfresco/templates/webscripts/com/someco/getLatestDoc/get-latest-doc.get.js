function main()
{
	if (args.filterPathView == null)
	{
		status.code = 500;
		status.message = "Missing path parameter";
		status.redirect = true;
		return;
	}
		
	var files = null;	

	var folder = companyhome.childByNamePath(args.filterPathView);
	if (folder == null)
	{
		status.code = 404;
		status.message = "No folder found at " + args.filterPathView;
		status.redirect = true;
		return;
	}

	//childFileFolders(files, folders, ignoreTypes, maxItems, requestTotalCountMax, sortProp, sortAsc, queryExecutionId)
	var results = folder.childFileFolders(true, false, 'cm:folder', 0, 1, 0, 'cm:modified', false, null);

	if (results == null || results == "" || results == undefined)
	{
		status.code=404;
	    status.message = "Folder " + url.extension + " not found." + args.filterPathView;
	    status.redirect = true;
	}
	else
	{
	    files = results.getPage();
	    model.latestDoc = files[0];	    
	}	
}

main();