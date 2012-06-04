<#macro dateFormat date>${date?string("dd MMM yyyy HH:mm:ss 'GMT'Z '('zzz')'")}</#macro>
<#escape x as jsonUtils.encodeJSONString(x)>
{
	"nodeRef" : "${latestDoc.nodeRef}",
        "name" : "${latestDoc.properties.name}",
        "title" : "${latestDoc.properties.title!}",
        "description" : "${latestDoc.properties.description!}",
        "created" : "<@dateFormat latestDoc.properties.created />",
        "modified" : "<@dateFormat latestDoc.properties.modified />"
}

</#escape>
