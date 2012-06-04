if (typeof politie == "undefined" || !politie)
{
   var politie = {};
   politie.dashlet = {};   
}

/**
 * politie.dashlet.GetLatestDoc
 */
(function()
{
   /**
    * YUI Library aliases
    */
   var Dom = YAHOO.util.Dom,
      Event = YAHOO.util.Event;

   /**
    * GetLatestDoc constructor.
    * 
    * @param {String} htmlId The HTML id of the parent element
    * @return {politie.dashlet.GetLatestDoc} The new GetLatestDoc instance
    * @constructor
    */
   politie.dashlet.GetLatestDoc = function GetLatestDoc_constructor(htmlId)
   {
	    politie.dashlet.GetLatestDoc.superclass.constructor.call(this, "politie.dashlet.GetLatestDoc", htmlId);

        /**
         * Register this component
         */
        Alfresco.util.ComponentManager.register(this);

        /**
         * Load YUI Components
         */
        Alfresco.util.YUILoaderHelper.require(["button", "container", "datasource", "datatable", "paginator", "json", "history", "tabview"], this.onComponentsLoaded, this);
		
        return this;
    };

    YAHOO.extend(politie.dashlet.GetLatestDoc, Alfresco.component.Base,
    {
 		/**
         * Object container for initialization options
         *
         * @property options
         * @type object
         */
        options:
        {
            componentId: "",
            siteId: "",
            title: "Get Latest Document Dashlet",
            filterPath: "",
            containerId: "documentLibrary",
        },

        widgets: {},

        /**
         *	Fired by YUI when parent element is available for scripting
         *
         * 	@method onReady
         */

        onReady: function getLatestDoc_onReady()
        {
            var me = this;
        },

        /**
         * Called when the user clicks the config getLatestDoc link.
         * Will open a getLatestDoc config dialog
         *
         * @method onConfigGetLatestDocClick
         * @param e The click event
         */
        onConfigGetLatestDocClick: function getLatestDoc_onConfigGetLatestDocClick(e)
        {

            var actionUrl = Alfresco.constants.URL_SERVICECONTEXT + "modules/politie/get-latest-doc/config/" + encodeURIComponent(this.options.componentId);

            if (!this.configDialog)
            {
                this.configDialog = new Alfresco.module.SimpleDialog(this.id + "-configDialog").setOptions(
                {
                    width: "30em",
                    templateUrl: Alfresco.constants.URL_SERVICECONTEXT + "modules/politie/get-latest-doc/config",
                    actionUrl: actionUrl,
                    onSuccess:
                    {
                        fn: function getLatestDoc_onConfig_callback(response)
                		{
                           var obj = response.json;

                            // Save values for new config dialog openings
                            this.options.title = (obj && obj.title) ? obj.title : this.options.title;
                            this.options.filterPath = (obj && obj.filterPath) ? obj.filterPath : this.options.filterPath;

			var scriptURL = Alfresco.constants.PROXY_URI + "/politie/get-latest-doc?filterPathView="+obj.filterPathView;

			YAHOO.util.Connect.asyncRequest("GET", scriptURL,{
				success: handleInfo,
				failure: handleErrorYahoo,
			}, null);
							
			// Update dashlet body with new values
			function handleInfo(obje){
				var dat = eval("(" + obje.responseText + ")");
		
				var fileExt = String(dat.name).lastIndexOf(".");
				fileExt = String(dat.name).substring(fileExt + 1).toLowerCase();
					Dom.get("getlatestdoc_item_afb").innerHTML = '<a href="' + Alfresco.constants.URL_CONTEXT + '/page/document-details?nodeRef=' + dat.nodeRef +'"><img src="' + Alfresco.constants.URL_CONTEXT + '/components/images/filetypes/' + fileExt + '-file-48.png" onerror="this.src=\'' + Alfresco.constants.URL_CONTEXT + '/res/components/images/filetypes/generic-file-48.png\'" title="'+dat.name+'" class="node-thumbnail" width="48" /> ';							
					Dom.get("getlatestdoc_item_info").innerHTML = '<a href="' + Alfresco.constants.URL_CONTEXT + '/page/document-details?nodeRef=' + dat.nodeRef +'">'+ dat.name + '</a><br /> ' + dat.created + '<br />';			
				}	
					
				Dom.get("getlatestdoc_title").innerHTML = obj ? obj.title : "";
			
				// function handleErrorYahoo(response){alert("failed..." + response.responseText);}
				function handleErrorYahoo(response){alert("Failed... No file found at this location");}

                            // Update dashlet config with new values
                            Dom.get(this.configDialog.id + "-title").value = obj ? obj.title : "";
                            Dom.get(this.configDialog.id + "-filterPath").value = obj ? obj.filterPath : "";
                            Dom.get(this.configDialog.id + "-filterPathView").innerHTML = obj ? obj.filterPathView : "";
                        },
                        scope: this
                    },

                    doSetupFormsValidation: 
					{
                        fn: function getlatestdoc_doSetupForm_callback(form) {
                            form.addValidation(this.configDialog.id + "-title", Alfresco.forms.validation.mandatory, null, "keyup");
                            form.setShowSubmitStateDynamically(true, false);

                            Dom.get(this.configDialog.id + "-title").value = this.options.title;
                            Dom.get(this.configDialog.id + "-filterPath").value = this.options.filterPath;
                            Dom.get(this.configDialog.id + "-filterPathView").innerHTML = this.options.filterPath.substr(this.options.filterPath.indexOf("|") + 1);

                            this.configDialog.widgets.filterPathView = Dom.get(this.configDialog.id + "-filterPathView"); // Path
                            this.configDialog.widgets.filterPathField = Dom.get(this.configDialog.id + "-filterPath"); // NodeRef|Path
                            this.configDialog.widgets.selectFilterPathButton = Alfresco.util.createYUIButton(this.configDialog, "selectFilterPath-button", this.onSelectFilterPath);
                            this.configDialog.widgets.clearFilterPathButton = Alfresco.util.createYUIButton(this.configDialog, "clearFilterPath-button", this.onClearFilterPath);
                        },
                        scope: this
                    }
                });
            }

            this.configDialog.setOptions(
            {
                actionUrl: actionUrl,
                siteId: this.options.siteId,
                containerId: this.options.containerId
            }).show();
        },

        onClearFilterPath: function getLatestDoc_onClearFilterPath(e)
        {
            this.widgets.filterPathView.innerHTML = "";
            this.widgets.filterPathField.value = "";
        },
		
        onSelectFilterPath: function getLatestDoc_onSelectFilterPath(e) {

            if (!this.widgets.filterPathDialog)
            {
                this.widgets.filterPathDialog = new Alfresco.module.DoclibGlobalFolder(this.id + "-selectFilterPath");
                var allowedViewModes =
                [
                 	Alfresco.module.DoclibGlobalFolder.VIEW_MODE_REPOSITORY
                ];

                this.widgets.filterPathDialog.setOptions(
                {
                    allowedViewModes: allowedViewModes,
                    siteId: this.options.siteId,
                    containerId: this.options.containerId,
                    title: "Configure",
                    nodeRef: "alfresco://company/home"
                });

                YAHOO.Bubbling.on("folderSelected", function (layer, args) {
                    var obj = args[1];
                    if (obj !== null) {
                        this.widgets.filterPathView.innerHTML = obj.selectedFolder.path;
                        this.widgets.filterPathField.value = obj.selectedFolder.nodeRef + "|" + obj.selectedFolder.path;
						this.widgets
                    }
                }, this);
            }

            var pathNodeRef = this.widgets.filterPathField.value.split("|")[0];

            this.widgets.filterPathDialog.setOptions({
                pathNodeRef: pathNodeRef ? new Alfresco.util.NodeRef(pathNodeRef) : null
            });

            // Show the dialog
            this.widgets.filterPathDialog.showDialog();
        }

    });
})();
