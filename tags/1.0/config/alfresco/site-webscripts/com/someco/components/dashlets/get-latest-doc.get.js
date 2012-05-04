
function main()
{
	// Create XML object to pull values from
	// configuration file
	var conf = new XML(config.script);
	  
	// Use the defaults from the XML configuration file
	title = conf.title[0].toString();
	filterPathView = conf.filterPathView[0].toString();

	// call the repository to get the latest document
	
	var json = remote.call("/someco/get-latest-doc?filterPathView=" + escape(filterPathView));
	if (json.status == 200)
	{
		obj = eval("(" + json + ")");
		model.result = obj;
	}
	else
	{
		obj = eval("(" + json + ")");
		obj.name = "Error";
		title = "Error";
		model.result = obj;
	}
  
	model.title = title;
}

main();



