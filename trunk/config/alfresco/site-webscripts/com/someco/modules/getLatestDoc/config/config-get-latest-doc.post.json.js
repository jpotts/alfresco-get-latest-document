/*
*       Get Latest Document configuration component POST method
*/

function main()
{

	var c = sitedata.getComponent(url.templateArgs.componentId);

	var saveValue = function(name, value)
	{
        c.properties[name] = value;
        model[name] = value;
	}

	saveValue("title", String(json.get("title")));
	saveValue("filterPath", String(json.get("filterPath")));
	saveValue("filterPathView", String(json.get("filterPath")).split("|")[1]);

	c.save();

}

main();

