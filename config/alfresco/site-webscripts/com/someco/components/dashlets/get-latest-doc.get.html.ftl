<#assign el=args.htmlid?js_string>
<#assign fileExtIndex = result.name?last_index_of(".")>
<#assign fileExt = (fileExtIndex > -1)?string(result.name?substring(fileExtIndex + 1)?lower_case, "generic")>

<script type="text/javascript">//<![CDATA[

(function() {

   new Alfresco.widget.DashletResizer("${el}", "${instance.object.id}");

   new Alfresco.widget.DashletTitleBarActions("${args.htmlid?html}").setOptions(
   {
      actions:
      [
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
//]]></script>
<div class="dashlet getlatestdoc">
    <div class="title">
      ${title}
    </div>
    <div class="body scrollablePanel"<#if args.height??> style="height: ${args.height}px;"</#if> >
      <div id="getlatestdoc_item">
        <div id="getlatestdoc_item_afb">
          <a href="${url.context}/page/document-details?nodeRef=${result.nodeRef}">
            <img src="${url.context}/components/images/filetypes/${fileExt}-file-48.png"
    onerror="this.src='${url.context}/res/components/images/filetypes/generic-file-48.png'" title="${result.name}" class="node-thumbnail" width="48" />
          </a>
        </div>
        <div id="getlatestdoc_item_info">
          <a href="${url.context}/page/document-details?nodeRef=${result.nodeRef}">${result.name}</a><br />
          ${result.title} <br />
          ${result.created} <br />
          ${result.description} <br />
        </div>
      </div>
    </div></div>