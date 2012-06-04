<#assign el=args.htmlid?html> <div id="${el}-configDialog" class="config-getlatestdoc">
   <div class="hd">${msg("label.dialogTitle")}</div>
   <div class="bd">
      <form id="${el}-form" action="" method="POST">
         <div class="yui-gd">
            <div class="yui-u first"><label for="${el}-title">${msg("label.title")}:</label></div>
            <div class="yui-u"><input id="${el}-title" type="text" name="title" value="" maxlength="30" />&nbsp;*</div>
         </div>
		 
		 <div class="yui-gd">
			<div class="yui-u first"><label for="${el}-filterPath">${msg("label.filterPath")}:</label></div>
			<div class="yui-u">
			
				<input id="${el}-filterPath" name="filterPath" value="" type="hidden" />
						<div id="${el}-filterPathView"></div>
				<button id="${el}-selectFilterPath-button">${msg("label.selectFilterPath")}</button>
				<button id="${el}-clearFilterPath-button">${msg("label.clearFilterPath")}</button>
				
		 </div>
		</div>
		 
         <div class="bdft">
            <input type="submit" id="${el}-ok" value="${msg("button.ok")}" />
            <input type="button" id="${el}-cancel" value="${msg("button.cancel")}" />
         </div>
      </form>
   </div> <div id="${el}-selectFilterPath"></div> </div>
