[spws](README.md) / Exports

# spws

## Table of contents

### Variables

- [defaults](modules.md#defaults)

### Functions

- [getCurrentUser](modules.md#getcurrentuser)
- [getCurrentUserID](modules.md#getcurrentuserid)
- [getGroupCollectionFromUser](modules.md#getgroupcollectionfromuser)
- [getList](modules.md#getlist)
- [getListCollection](modules.md#getlistcollection)
- [getUserInformation](modules.md#getuserinformation)
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
| `currentUser` | `CurrentUser` \| ``null`` | The current user, this is updated anytime the getCurrentUser function is invoked. |
| `parse` | `boolean` | If false, the data object will be empty. The responseXML will need to be used  **`default`** true |
| `webURL` | `string` | The absolute or relative webURL.  **`default`** "" |

#### Defined in

[index.ts:16](https://github.com/rlking1985/spws/blob/30aeab6/src/index.ts#L16)

## Functions

### getCurrentUser

▸ `Const` **getCurrentUser**(`__namedParameters?`): `Promise`<`Operation`\>

Gets the current logged in user

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.password?` | `string` |
| `__namedParameters.username?` | `string` |
| `__namedParameters.webURL?` | `string` |

#### Returns

`Promise`<`Operation`\>

#### Defined in

[services/userGroup/getCurrentUser.ts:73](https://github.com/rlking1985/spws/blob/30aeab6/src/services/userGroup/getCurrentUser.ts#L73)

___

### getCurrentUserID

▸ `Const` **getCurrentUserID**(`webURL`, `username?`, `password?`): `Promise`<`string`\>

Gets the current user's ID

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `webURL` | `string` | The SharePoint web URL |
| `username?` | `string` | The username if authenticating as another user (testing only) |
| `password?` | `string` | The password if authenticating as another user (testing only) |

#### Returns

`Promise`<`string`\>

#### Defined in

[services/userGroup/getCurrentUser.ts:23](https://github.com/rlking1985/spws/blob/30aeab6/src/services/userGroup/getCurrentUser.ts#L23)

___

### getGroupCollectionFromUser

▸ `Const` **getGroupCollectionFromUser**(`userLoginName`, `__namedParameters?`): `Promise`<`Operation`\>

Gets the group collection for the user

#### Parameters

| Name | Type |
| :------ | :------ |
| `userLoginName` | `string` |
| `__namedParameters` | `Object` |
| `__namedParameters.parse?` | `boolean` |
| `__namedParameters.webURL?` | `string` |

#### Returns

`Promise`<`Operation`\>

#### Defined in

[services/userGroup/getGroupCollectionFromUser.ts:24](https://github.com/rlking1985/spws/blob/30aeab6/src/services/userGroup/getGroupCollectionFromUser.ts#L24)

___

### getList

▸ `Const` **getList**(`__namedParameters`): `Promise`<`Operation`\>

Returns a schema for the specified list.

**`link`** https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms772709(v=office.12)

**`example`**
```
// Get list using default parameters
const list = await getList({ listName: "Announcements" });
// Get list on another site without parsing XML
const list = await getList({ listName: "Announcements", webURL: "/sites/hr", parse: false });
// Get list with only the Title and Fields parsed
const list = await getList({ listName: "Title", attributes: ["Title", "Fields"] })
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.attributes` | (``"AllowDeletion"`` \| ``"AllowMultiResponses"`` \| ``"AnonymousPermMask"`` \| ``"Author"`` \| ``"BaseType"`` \| ``"Created"`` \| ``"DefaultViewUrl"`` \| ``"Description"`` \| ``"Direction"`` \| ``"DocTemplateUrl"`` \| ``"EmailAlias"`` \| ``"EnableAttachments"`` \| ``"EnableFolderCreation"`` \| ``"EnableMinorVersion"`` \| ``"EnableModeration"`` \| ``"EnablePeopleSelector"`` \| ``"EnableResourceSelector"`` \| ``"EnableVersioning"`` \| ``"EnforceDataValidation"`` \| ``"EventSinkAssembly"`` \| ``"EventSinkClass"`` \| ``"EventSinkData"`` \| ``"ExcludeFromOfflineClient"`` \| ``"FeatureId"`` \| ``"Fields"`` \| ``"Flags"`` \| ``"HasExternalDataSource"`` \| ``"HasRelatedLists"`` \| ``"HasUniqueScopes"`` \| ``"Hidden"`` \| ``"ID"`` \| ``"ImageUrl"`` \| ``"IrmEnabled"`` \| ``"IsApplicationList"`` \| ``"ItemCount"`` \| ``"LastDeleted"`` \| ``"MajorVersionLimit"`` \| ``"MajorWithMinorVersionsLimit"`` \| ``"MaxItemsPerThrottledOperation"`` \| ``"MobileDefaultViewUrl"`` \| ``"Modified"`` \| ``"MultipleDataList"`` \| ``"Name"`` \| ``"NoThrottleListOperations"`` \| ``"Ordered"`` \| ``"PreserveEmptyValues"`` \| ``"ReadSecurity"`` \| ``"RequireCheckout"`` \| ``"RootFolder"`` \| ``"ScopeId"`` \| ``"SendToLocation"`` \| ``"ServerTemplate"`` \| ``"ShowUser"`` \| ``"StrictTypeCoercion"`` \| ``"ThrottleListOperations"`` \| ``"ThumbnailSize"`` \| ``"Title"`` \| ``"Version"`` \| ``"WebFullUrl"`` \| ``"WebId"`` \| ``"WebImageHeight"`` \| ``"WebImageWidth"`` \| ``"WorkFlowId"`` \| ``"WriteSecurity"``)[] |
| `__namedParameters.listName` | `string` |
| `__namedParameters.parse?` | `boolean` |
| `__namedParameters.webURL?` | `string` |

#### Returns

`Promise`<`Operation`\>

#### Defined in

[services/lists/getList.ts:44](https://github.com/rlking1985/spws/blob/30aeab6/src/services/lists/getList.ts#L44)

___

### getListCollection

▸ `Const` **getListCollection**(`__namedParameters?`): `Promise`<`Operation`\>

Returns the names and GUIDs for all lists in the site.

**`link`** https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms774663(v=office.12)?redirectedfrom=MSDN

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.parse?` | `boolean` |
| `__namedParameters.webURL?` | `string` |

#### Returns

`Promise`<`Operation`\>

#### Defined in

[services/lists/getListCollection.ts:25](https://github.com/rlking1985/spws/blob/30aeab6/src/services/lists/getListCollection.ts#L25)

___

### getUserInformation

▸ `Const` **getUserInformation**(`ID`, `webURL?`): `Promise`<`GetUserInformationResponse`\>

Get the user's information from the User InformationList

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ID` | `string` | The user's ID |
| `webURL` | `string` | The SharePoint webURL |

#### Returns

`Promise`<`GetUserInformationResponse`\>

#### Defined in

[services/userGroup/getUserInformation.ts:24](https://github.com/rlking1985/spws/blob/30aeab6/src/services/userGroup/getUserInformation.ts#L24)

___

### updateListItems

▸ `Const` **updateListItems**(`__namedParameters`): `Promise`<`Operation`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.batchSize?` | `number` |
| `__namedParameters.listName` | `string` |
| `__namedParameters.methods` | `Methods` |
| `__namedParameters.onError?` | ``"Return"`` \| ``"Continue"`` |
| `__namedParameters.parse?` | `boolean` |
| `__namedParameters.webURL?` | `string` |

#### Returns

`Promise`<`Operation`[]\>

#### Defined in

[services/lists/updateListItems/index.ts:57](https://github.com/rlking1985/spws/blob/30aeab6/src/services/lists/updateListItems/index.ts#L57)
