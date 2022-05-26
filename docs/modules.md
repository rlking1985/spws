[spws](README.md) / Exports

# spws

## Table of contents

### Variables

- [defaults](modules.md#defaults)

### Functions

- [addUserToGroup](modules.md#addusertogroup)
- [getCurrentUser](modules.md#getcurrentuser)
- [getCurrentUserID](modules.md#getcurrentuserid)
- [getFirstItemID](modules.md#getfirstitemid)
- [getGroupCollectionFromSite](modules.md#getgroupcollectionfromsite)
- [getGroupCollectionFromUser](modules.md#getgroupcollectionfromuser)
- [getLastItemID](modules.md#getlastitemid)
- [getList](modules.md#getlist)
- [getListCollection](modules.md#getlistcollection)
- [getListItems](modules.md#getlistitems)
- [getListViewThreshold](modules.md#getlistviewthreshold)
- [getMultiListItems](modules.md#getmultilistitems)
- [getUserCollectionFromGroup](modules.md#getusercollectionfromgroup)
- [getUserCollectionFromSite](modules.md#getusercollectionfromsite)
- [getUserInformation](modules.md#getuserinformation)
- [removeUserFromGroup](modules.md#removeuserfromgroup)
- [updateGroupInfo](modules.md#updategroupinfo)
- [updateList](modules.md#updatelist)
- [updateListItems](modules.md#updatelistitems)

## Variables

### defaults

• **defaults**: `Object`

The default options used in every web request.
These can be changed globally or passed to specific requests.

**`example`** Set the webURL to your current site instead of the root of the site collection.
```
import { defaults } from "spws";
defaults.webURL = "/sites/my-site"
```

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `queryOptions` | { `DatesInUtc?`: `boolean` ; `ExpandUserField?`: `boolean` ; `Folder?`: `string` ; `IncludeAttachmentUrls?`: `boolean` ; `IncludeAttachmentVersion?`: `boolean` ; `IncludeMandatoryColumns?`: `boolean` ; `IncludePermissions?`: `boolean` ; `OptimizeLookups?`: `boolean` ; `RemoveInvalidXmlCharacters?`: `boolean`  } | An XML fragment in the following form that contains separate nodes for the various properties of the SPQuery object |
| `queryOptions.DatesInUtc?` | `boolean` | Specifies the format in which dates are returned. If True, dates returned are in Coordinated Universal Time (UTC) format. If False, dates returned are in [ISO-8601] format. |
| `queryOptions.ExpandUserField?` | `boolean` | If set to True, specifies that fields in list items that are lookup fields to the user information list are returned as if they were multi-value lookups, including "Name", "EMail", "SipAddress", and "Title" fields from the user information list for the looked up item. These values are separated by ";#", and any commas in the lookup field name are encoded as ",,". |
| `queryOptions.Folder?` | `string` | Specifies a URL used to filter document library items for items in the specified folder. |
| `queryOptions.IncludeAttachmentUrls?` | `boolean` | If set to True, specifies that the value returned for the Attachments field is a list of full URLs separated by the delimiter ";#". |
| `queryOptions.IncludeAttachmentVersion?` | `boolean` | This MUST be used only in conjunction with IncludeAttachmentUrls. Specifying True causes the GUID and version number to be returned for attachments that can be used for conflict detection on update. |
| `queryOptions.IncludeMandatoryColumns?` | `boolean` | Specifies that required fields and fields used by specified calculated fields be returned in addition to the fields specified by the viewFields parameter, if set to True |
| `queryOptions.IncludePermissions?` | `boolean` | If it is True, the EffectivePermMask attribute is returned when the permissions of a given row differ from the base permissions of the list |
| `queryOptions.OptimizeLookups?` | `boolean` | Specifies how to return lookup values when a list item that is the target of a lookup is in an incomplete or draft state. When False, the data returned will include the current lookup field values When True, the query returns published lookup field values, if present, regardless of whether the list item that is the target of the lookup is in an incomplete or draft state |
| `queryOptions.RemoveInvalidXmlCharacters?` | `boolean` | If set to True, the server MUST remove all characters that have an ASCII valuein the range 0-31,other than 9, 10, or 13, in the field values of the list items returned. |
| `webURL` | `string` | The absolute or relative webURL.  **`default`** "" |

#### Defined in

[index.ts:24](https://github.com/rlking1985/spws/blob/7cd8ece/src/index.ts#L24)

## Functions

### addUserToGroup

▸ `Const` **addUserToGroup**(`userLoginName`, `groupName`, `__namedParameters?`): `Promise`<`Operation`\>

Adds the user to the specified group

**`link`** https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms772683(v=office.12)

**`example`**
```
const res = await addUserToGroup("dev\\john.smith", "Site Owners")
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userLoginName` | `string` | A string that contains the user name (DOMAIN\User_Alias) of the user. |
| `groupName` | `string` | A string that contains the name of the group. |
| `__namedParameters` | `Object` | - |
| `__namedParameters.webURL?` | `string` | The SharePoint webURL |

#### Returns

`Promise`<`Operation`\>

#### Defined in

[services/userGroup/addUserToGroup.ts:33](https://github.com/rlking1985/spws/blob/7cd8ece/src/services/userGroup/addUserToGroup.ts#L33)

___

### getCurrentUser

▸ `Const` **getCurrentUser**(`__namedParameters?`): `Promise`<`Operation`\>

Gets the current authenticated user.

**`remark`** Authentication can be changed using a proxy server and supplying a username and password. This is not recommended and should be used for testing purposes only.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `__namedParameters` | `Object` | - |
| `__namedParameters.ID?` | `string` | The user ID. If defined, the page scrape is skipped and user info is returned\ This is useful for testing as scraping pages is flaky |
| `__namedParameters.getFromWindow?` | `boolean` | If false, the user ID will be scraped from a SharePoint page |
| `__namedParameters.webURL?` | `string` | The SharePoint web URL |

#### Returns

`Promise`<`Operation`\>

#### Defined in

[services/userGroup/getCurrentUser.ts:27](https://github.com/rlking1985/spws/blob/7cd8ece/src/services/userGroup/getCurrentUser.ts#L27)

___

### getCurrentUserID

▸ `Const` **getCurrentUserID**(`__namedParameters?`): `Promise`<`CurrentUserID`\>

Gets the current user's ID

**`example`**
```
// Get the current user ID
const res = await getCurrentUserID();

// Get the current user ID
const res = await getCurrentUserID({ getFromWindow: false });
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.getFromWindow` |  |
| `__namedParameters.webURL` |  |

#### Returns

`Promise`<`CurrentUserID`\>

#### Defined in

[services/userGroup/getCurrentUserID.ts:35](https://github.com/rlking1985/spws/blob/7cd8ece/src/services/userGroup/getCurrentUserID.ts#L35)

___

### getFirstItemID

▸ `Const` **getFirstItemID**(`listName`, `__namedParameters?`): `Promise`<`Operation`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `listName` | `string` |
| `__namedParameters` | `Object` |
| `__namedParameters.webURL?` | `string` |

#### Returns

`Promise`<`Operation`\>

#### Defined in

[services/lists/getFirstItemID.ts:23](https://github.com/rlking1985/spws/blob/7cd8ece/src/services/lists/getFirstItemID.ts#L23)

___

### getGroupCollectionFromSite

▸ `Const` **getGroupCollectionFromSite**(`__namedParameters?`): `Promise`<`Operation`\>

Returns information about the collection of groups for the current site collection.

**`link`** https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms774594(v=office.12)

**`example`**
```
// Get groups from the current site
const res = await getGroupCollectionFromSite()

// Get groups from another site
const res = await getGroupCollectionFromSite({ webURL: "/sites/other" })

```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `__namedParameters` | `Object` | - |
| `__namedParameters.webURL?` | `string` | The SharePoint webURL |

#### Returns

`Promise`<`Operation`\>

#### Defined in

[services/userGroup/getGroupCollectionFromSite.ts:33](https://github.com/rlking1985/spws/blob/7cd8ece/src/services/userGroup/getGroupCollectionFromSite.ts#L33)

___

### getGroupCollectionFromUser

▸ `Const` **getGroupCollectionFromUser**(`userLoginName`, `__namedParameters?`): `Promise`<`Operation`\>

Returns information about the collection of groups of which the specified user is a member

**`link`** https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms772552(v=office.12)

**`example`**
```
// Get groups for current site
const res = await getGroupCollectionFromUser("dev\\john.smith");

// Get groups for different site
const res = await getGroupCollectionFromUser("dev\\john.smith", { webURL: "/sites/other "});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userLoginName` | `string` | The user login name including the domain |
| `__namedParameters` | `Object` | - |
| `__namedParameters.webURL?` | `string` | The SharePoint web URL |

#### Returns

`Promise`<`Operation`\>

#### Defined in

[services/userGroup/getGroupCollectionFromUser.ts:34](https://github.com/rlking1985/spws/blob/7cd8ece/src/services/userGroup/getGroupCollectionFromUser.ts#L34)

___

### getLastItemID

▸ `Const` **getLastItemID**(`listName`, `__namedParameters?`): `Promise`<`Operation`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `listName` | `string` |
| `__namedParameters` | `Object` |
| `__namedParameters.webURL?` | `string` |

#### Returns

`Promise`<`Operation`\>

#### Defined in

[services/lists/getLastItemID.ts:23](https://github.com/rlking1985/spws/blob/7cd8ece/src/services/lists/getLastItemID.ts#L23)

___

### getList

▸ `Const` **getList**(`listName`, `__namedParameters?`): `Promise`<`Operation`\>

Returns a schema for the specified list.

**`link`** https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms772709(v=office.12)

**`example`**
```
// Get list using default parameters
const list = await getList({ listName: "Announcements" });
// Get list on another site
const list = await getList({ listName: "Announcements", webURL: "/sites/hr" });
// Get list with only the Title and Fields attributes parsed
const list = await getList({ listName: "Title", attributes: ["Title", "Fields"] })
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `listName` | `string` | The list display name or GUID |
| `__namedParameters` | `Object` | - |
| `__namedParameters.attributes?` | (``"AllowDeletion"`` \| ``"AllowMultiResponses"`` \| ``"AnonymousPermMask"`` \| ``"Author"`` \| ``"BaseType"`` \| ``"Created"`` \| ``"DefaultViewUrl"`` \| ``"Description"`` \| ``"Direction"`` \| ``"DocTemplateUrl"`` \| ``"EmailAlias"`` \| ``"EnableAttachments"`` \| ``"EnableFolderCreation"`` \| ``"EnableMinorVersion"`` \| ``"EnableModeration"`` \| ``"EnablePeopleSelector"`` \| ``"EnableResourceSelector"`` \| ``"EnableVersioning"`` \| ``"EnforceDataValidation"`` \| ``"EventSinkAssembly"`` \| ``"EventSinkClass"`` \| ``"EventSinkData"`` \| ``"ExcludeFromOfflineClient"`` \| ``"FeatureId"`` \| ``"Fields"`` \| ``"Flags"`` \| ``"HasExternalDataSource"`` \| ``"HasRelatedLists"`` \| ``"HasUniqueScopes"`` \| ``"Hidden"`` \| ``"ID"`` \| ``"ImageUrl"`` \| ``"IrmEnabled"`` \| ``"IsApplicationList"`` \| ``"ItemCount"`` \| ``"LastDeleted"`` \| ``"MajorVersionLimit"`` \| ``"MajorWithMinorVersionsLimit"`` \| ``"MaxItemsPerThrottledOperation"`` \| ``"MobileDefaultViewUrl"`` \| ``"Modified"`` \| ``"MultipleDataList"`` \| ``"Name"`` \| ``"NoThrottleListOperations"`` \| ``"Ordered"`` \| ``"PreserveEmptyValues"`` \| ``"ReadSecurity"`` \| ``"RequireCheckout"`` \| ``"RootFolder"`` \| ``"ScopeId"`` \| ``"SendToLocation"`` \| ``"ServerTemplate"`` \| ``"ShowUser"`` \| ``"StrictTypeCoercion"`` \| ``"ThrottleListOperations"`` \| ``"ThumbnailSize"`` \| ``"Title"`` \| ``"Version"`` \| ``"WebFullUrl"`` \| ``"WebId"`` \| ``"WebImageHeight"`` \| ``"WebImageWidth"`` \| ``"WorkFlowId"`` \| ``"WriteSecurity"``)[] | The list attributes that should be returned in the data object |
| `__namedParameters.webURL?` | `string` | The SharePoint web URL |

#### Returns

`Promise`<`Operation`\>

#### Defined in

[services/lists/getList.ts:42](https://github.com/rlking1985/spws/blob/7cd8ece/src/services/lists/getList.ts#L42)

___

### getListCollection

▸ `Const` **getListCollection**(`__namedParameters?`): `Promise`<`Operation`\>

Returns the names and GUIDs for all lists in the site.

**`link`** https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms774663(v=office.12)?redirectedfrom=MSDN

**`example`**
```
// Get list collection for current site
const res = await getListCollection()

// Get list collection for another site
const res = await getListCollection({ webURL: "/sites/other" })
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `__namedParameters` | `Object` | - |
| `__namedParameters.webURL?` | `string` | The SharePoint webURL |

#### Returns

`Promise`<`Operation`\>

#### Defined in

[services/lists/getListCollection.ts:30](https://github.com/rlking1985/spws/blob/7cd8ece/src/services/lists/getListCollection.ts#L30)

___

### getListItems

▸ `Const` **getListItems**(`listName`, `__namedParameters?`): `Promise`<`Operation`\>

Adds the user to the specified group

**`link`** https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms772599(v=office.12)

**`link`** https://docs.microsoft.com/en-us/openspecs/sharepoint_protocols/ms-listsws/fa650bde-c79b-4a2a-bb5d-c43e74166322?redirectedfrom=MSDN

**`example`**
```
const res = await getListItems("Task Tracker")
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `listName` | `string` | A string that contains either the display name or the GUID for the list |
| `__namedParameters` | `GetListItemsOptions` | - |

#### Returns

`Promise`<`Operation`\>

#### Defined in

[services/lists/getListItems/index.ts:106](https://github.com/rlking1985/spws/blob/7cd8ece/src/services/lists/getListItems/index.ts#L106)

___

### getListViewThreshold

▸ `Const` **getListViewThreshold**(`listName`, `__namedParameters?`): `Promise`<`Operation`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `listName` | `string` |
| `__namedParameters` | `Object` |
| `__namedParameters.webURL?` | `string` |

#### Returns

`Promise`<`Operation`\>

#### Defined in

[services/lists/getListViewThreshold.ts:20](https://github.com/rlking1985/spws/blob/7cd8ece/src/services/lists/getListViewThreshold.ts#L20)

___

### getMultiListItems

▸ `Const` **getMultiListItems**(`lists`): `Promise`<`Operation`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `lists` | `GetItemsOptions`[] |

#### Returns

`Promise`<`Operation`\>

#### Defined in

[services/lists/getMultiListItems.ts:35](https://github.com/rlking1985/spws/blob/7cd8ece/src/services/lists/getMultiListItems.ts#L35)

___

### getUserCollectionFromGroup

▸ `Const` **getUserCollectionFromGroup**(`groupName`, `__namedParameters?`): `Promise`<`Operation`\>

Returns information about the collection of users in the specified group.

**`link`** https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms772554(v=office.12)

**`example`**
```
// Get users from the group named Site Owners
const res = await getUserCollectionFromSite("Site Owners")

// Get users from another site
const res = await getUserCollectionFromSite("Site Owners", { webURL: "/sites/other" })

```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `groupName` | `string` | - |
| `__namedParameters` | `Object` | - |
| `__namedParameters.webURL?` | `string` | The SharePoint webURL |

#### Returns

`Promise`<`Operation`\>

#### Defined in

[services/userGroup/getUserCollectionFromGroup.ts:33](https://github.com/rlking1985/spws/blob/7cd8ece/src/services/userGroup/getUserCollectionFromGroup.ts#L33)

___

### getUserCollectionFromSite

▸ `Const` **getUserCollectionFromSite**(`__namedParameters?`): `Promise`<`Operation`\>

Returns information about the collection of users for the current site collection.

**`link`** https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms772702(v=office.12)

**`example`**
```
// Get users from the current site
const res = await getUserCollectionFromSite()

// Get users from another site
const res = await getUserCollectionFromSite({ webURL: "/sites/other" })

```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `__namedParameters` | `Object` | - |
| `__namedParameters.webURL?` | `string` | The SharePoint webURL |

#### Returns

`Promise`<`Operation`\>

#### Defined in

[services/userGroup/getUserCollectionFromSite.ts:33](https://github.com/rlking1985/spws/blob/7cd8ece/src/services/userGroup/getUserCollectionFromSite.ts#L33)

___

### getUserInformation

▸ `Const` **getUserInformation**(`ID`, `__namedParameters?`): `Promise`<`Operation`\>

Returns information about the specified user from the User Information List

**`link`** https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-2010/ff521587(v=office.14)

**`example`**
```
// Get user from the current site
const res = await getUserInformation("1");

// Get user from another site
const res = await getUserInformation("1", { webURL: "/sites/other" });
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ID` | `string` | The user ID |
| `__namedParameters` | `Object` | - |
| `__namedParameters.webURL?` | `string` | The SharePoint webURL |

#### Returns

`Promise`<`Operation`\>

#### Defined in

[services/userGroup/getUserInformation.ts:32](https://github.com/rlking1985/spws/blob/7cd8ece/src/services/userGroup/getUserInformation.ts#L32)

___

### removeUserFromGroup

▸ `Const` **removeUserFromGroup**(`userLoginName`, `groupName`, `__namedParameters?`): `Promise`<`Operation`\>

Removes the specified user from the specified group.

**`link`** https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms774499(v=office.12)

**`example`**
```
const res = await removeUserFromGroup("dev\\john.smith", "Site Owners")
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userLoginName` | `string` | A string that contains the user name (DOMAIN\User_Alias) of the user. |
| `groupName` | `string` | A string that contains the name of the group. |
| `__namedParameters` | `Object` | - |
| `__namedParameters.webURL?` | `string` | The SharePoint webURL |

#### Returns

`Promise`<`Operation`\>

#### Defined in

[services/userGroup/removeUserFromGroup.ts:33](https://github.com/rlking1985/spws/blob/7cd8ece/src/services/userGroup/removeUserFromGroup.ts#L33)

___

### updateGroupInfo

▸ `Const` **updateGroupInfo**(`params`): `Promise`<`Operation`\>

Updates information for the specified group. The API does not support changing the description (Microsoft docs are incorrect).

**`link`** https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms774703(v=office.12)

**`example`**
```
const res = await removeUserFromGroup("dev\\john.smith", "Site Owners")
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.groupName` | `string` |
| `params.oldGroupName` | `string` |
| `params.ownerIdentifier` | `string` |
| `params.ownerType` | ``"user"`` \| ``"group"`` |
| `params.webURL?` | `string` |

#### Returns

`Promise`<`Operation`\>

#### Defined in

[services/userGroup/updateGroupInfo.ts:33](https://github.com/rlking1985/spws/blob/7cd8ece/src/services/userGroup/updateGroupInfo.ts#L33)

___

### updateList

▸ `Const` **updateList**(`__namedParameters`): `Promise`<`Operation`\>

Updates a list based on the specified field definitions and list properties.

**`link`** https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms774660(v=office.12)

**`link`** https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-2010/ms437580(v=office.14)

**`example`**
```
// Update list
const res = await getListCollection()

// Get list collection for another site
const res = await getListCollection({ webURL: "/sites/other" })
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `UpdateListParams` |

#### Returns

`Promise`<`Operation`\>

#### Defined in

[services/lists/updateList.ts:248](https://github.com/rlking1985/spws/blob/7cd8ece/src/services/lists/updateList.ts#L248)

___

### updateListItems

▸ `Const` **updateListItems**(`listName`, `methods`, `__namedParameters?`): `Promise`<`Operation`[]\>

Adds, deletes, or updates the specified items in a list on the current site.

**`link`** https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms772668(v=office.12)

**`example`**
```
// Create, update and delete
const res = await updateListItems("Announcements", [
  { command: "New", values: { Title: "Hello World" } },
  { command: "Update", ID: "2", values: { Title: "Hello World" } },
  { command: "Delete", ID: "3" },
]);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `listName` | `string` | A string that contains the name of the list. It is recommended that you use the list GUID |
| `methods` | `Methods` | An array that contains one or more methods for adding, modifying, or deleting items |
| `__namedParameters` | `Object` | - |
| `__namedParameters.batchSize?` | `number` | The maximum amount of updates that can be sent per web request. A batch size of 0 is Infinite |
| `__namedParameters.onError?` | ``"Return"`` \| ``"Continue"`` | Return (stop) or continue execution of the scripts if an error occurs |
| `__namedParameters.webURL?` | `string` | The SharePoint webURL |
| `__namedParameters.onBatchComplete?` | (`batch`: `Operation`) => `void` | - |

#### Returns

`Promise`<`Operation`[]\>

#### Defined in

[services/lists/updateListItems/index.ts:59](https://github.com/rlking1985/spws/blob/7cd8ece/src/services/lists/updateListItems/index.ts#L59)
