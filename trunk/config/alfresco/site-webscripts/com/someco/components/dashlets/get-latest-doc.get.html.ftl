<#assign el=args.htmlid?js_string> 
<#assign fileExtIndex = result.name?last_index_of(".")> 
<#assign fileExt = (fileExtIndex > -1)?string(result.name?substring(fileExtIndex + 1)?lower_case, "generic")> 
<script type="text/javascript">
//<![CDATA[ 

(function() {
  var getLatestDoc = new politie.dashlet.GetLatestDoc("${el}").setOptions(
  {
    "componentId": "${instance.object.id}",
    "siteId": "${page.url.templateArgs.site!""}",
    "title": "${title}",
    "filterPath": "${filterPath}",
    "filterPathView": "${filterPathView}"
  }).setMessages(${messages});
    
  new Alfresco.widget.DashletResizer("${el}", "${instance.object.id}");
   /**
    * Create a new custom YUI event and subscribe it to the GetLatestDoc onConfigGetLatestDocClick
    * function. This custom event is then passed into the DashletTitleBarActions widget as
    * an eventOnClick action so that it can be fired when the user clicks on the Edit icon
   */
   var editDashletEvent = new YAHOO.util.CustomEvent("onDashletConfigure");
   editDashletEvent.subscribe(getLatestDoc.onConfigGetLatestDocClick, getLatestDoc, true);
   new Alfresco.widget.DashletTitleBarActions("${args.htmlid?html}").setOptions(
   {
      actions:
      [ 
<#if userIsSiteManager>
         {
            cssClass: "edit",
            eventOnClick: editDashletEvent,
            tooltip: "${msg("dashlet.edit.tooltip")?js_string}"
         },
</#if>
         {
            cssClass: "help",
            bubbleOnClick:
            {
               message: "${msg("dashlet.help")?js_string}"
            },
            tooltip: "${msg("dashlet.help.tooltip")?js_string}"
         }
      ]
   });
})();
//]]> 

</script>
  <div class="dashlet getlatestdoc">
  <div id="getlatestdoc_title" class="title">
    ${title}
  </div>
 
<div class="body scrollablePanel"<#if args.height??> style="height: ${args.height}px;"</#if> >
		<div id="getlatestdoc_item">
			<div id="getlatestdoc_item_afb">
					<a href="${url.context}/page/document-details?nodeRef=${result.nodeRef}">
					<img src="${url.context}/components/images/filetypes/${fileExt}-file-48.png" onerror="this.src='${url.context}/res/components/images/filetypes/generic-file-48.png'" title="${result.name}" class="node-thumbnail" width="48" />
					</a>
			</div>
				
			<div id="getlatestdoc_item_info">
				<a href="${url.context}/page/document-details?nodeRef=${result.nodeRef}">${result.name}</a><br /> ${result.created} <br />
			</div>
		</div>
	</div>
</div>
