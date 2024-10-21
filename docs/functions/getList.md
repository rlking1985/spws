[**spws**](../README.md) • **Docs**

***

[spws](../globals.md) / getList

# Function: getList()

> **getList**(`listName`, `__namedParameters`): `Promise`\<`Operation`\>

Returns a schema for the specified list.

## Parameters

• **listName**: `string`

The list display name or GUID
https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms772709(v=office.12)

• **\_\_namedParameters** = `{}`

• **\_\_namedParameters.attributes?**: (`"Title"` \| `"Name"` \| `"ID"` \| `"Modified"` \| `"Created"` \| `"AllowDeletion"` \| `"BaseType"` \| `"Description"` \| `"Hidden"` \| `"StaticName"` \| `"Version"` \| `"AllowMultiResponses"` \| `"AnonymousPermMask"` \| `"Author"` \| `"DefaultViewUrl"` \| `"Direction"` \| `"DocTemplateUrl"` \| `"EmailAlias"` \| `"EnableAttachments"` \| `"EnableFolderCreation"` \| `"EnableMinorVersion"` \| `"EnableModeration"` \| `"EnablePeopleSelector"` \| `"EnableResourceSelector"` \| `"EnableVersioning"` \| `"EnforceDataValidation"` \| `"EventSinkAssembly"` \| `"EventSinkClass"` \| `"EventSinkData"` \| `"ExcludeFromOfflineClient"` \| `"FeatureId"` \| `"Fields"` \| `"Flags"` \| `"HasExternalDataSource"` \| `"HasRelatedLists"` \| `"HasUniqueScopes"` \| `"ImageUrl"` \| `"IrmEnabled"` \| `"IsApplicationList"` \| `"ItemCount"` \| `"LastDeleted"` \| `"MajorVersionLimit"` \| `"MajorWithMinorVersionsLimit"` \| `"MaxItemsPerThrottledOperation"` \| `"MobileDefaultViewUrl"` \| `"MultipleDataList"` \| `"NoThrottleListOperations"` \| `"Ordered"` \| `"PreserveEmptyValues"` \| `"ReadSecurity"` \| `"RequireCheckout"` \| `"RootFolder"` \| `"ScopeId"` \| `"SendToLocation"` \| `"ServerTemplate"` \| `"ShowUser"` \| `"StrictTypeCoercion"` \| `"ThrottleListOperations"` \| `"ThumbnailSize"` \| `"WebFullUrl"` \| `"WebId"` \| `"WebImageHeight"` \| `"WebImageWidth"` \| `"WorkFlowId"` \| `"WriteSecurity"`)[] = `[]`

The list attributes that should be returned in the data object

• **\_\_namedParameters.webURL?**: `string` = `defaults.webURL`

The SharePoint web URL

## Returns

`Promise`\<`Operation`\>

## Example

```
// Get list using default parameters
const list = await getList({ listName: "Announcements" });
// Get list on another site
const list = await getList({ listName: "Announcements", webURL: "/sites/hr" });
// Get list with only the Title and Fields attributes parsed
const list = await getList({ listName: "Title", attributes: ["Title", "Fields"] })
```

## Defined in

[services/lists/getList/index.ts:38](https://github.com/rlking1985/spws/blob/eac8675429b3cb92c57fd641d54e84f4ab439754/src/services/lists/getList/index.ts#L38)
