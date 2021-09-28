[spws](README.md) / Exports

# spws

## Table of contents

### Interfaces

- [GetListCollectionResponse](interfaces/GetListCollectionResponse.md)
- [GetListParameters](interfaces/GetListParameters.md)
- [GetListResponse](interfaces/GetListResponse.md)

### Type aliases

- [DefaultParameters](modules.md#defaultparameters)
- [Field](modules.md#field)
- [List](modules.md#list)
- [ListAttributes](modules.md#listattributes)
- [ListCollection](modules.md#listcollection)
- [Response](modules.md#response)

### Variables

- [defaults](modules.md#defaults)

### Functions

- [getList](modules.md#getlist)
- [getListCollection](modules.md#getlistcollection)

## Type aliases

### DefaultParameters

Ƭ **DefaultParameters**: `Object`

The default parameters used that are available in every web request.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `parse?` | `boolean` | If false, the data object will be empty. The responseXML will need to be used  **`default`** true |
| `webURL?` | `string` | The absolute or relative webURL.  **`default`** "" |

#### Defined in

[index.ts:17](https://github.com/rlking1985/spws/blob/2f4647b/src/index.ts#L17)

___

### Field

Ƭ **Field**: `Object`

#### Index signature

▪ [key: `string`]: `any`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Choices?` | `string`[] |
| `DisplaceOnUpgrade?` | `boolean` |
| `DisplayName?` | `string` |
| `Filterable?` | `boolean` |
| `FromBaseType?` | `boolean` |
| `Hidden?` | `string` |
| `ID?` | `string` |
| `Name?` | `string` |
| `ReadOnly?` | `boolean` |
| `RowOrdinal?` | `string` |
| `Sealed?` | `boolean` |
| `ShowInFileDlg?` | `boolean` |
| `Sortable?` | `boolean` |
| `SourceID?` | `string` |
| `StaticName?` | `string` |
| `Type?` | `string` |
| `colName?` | `string` |

#### Defined in

[types/field.ts:1](https://github.com/rlking1985/spws/blob/2f4647b/src/types/field.ts#L1)

___

### List

Ƭ **List**: `Object`

#### Index signature

▪ [key: `string`]: `string` \| `object` \| `undefined`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `AllowDeletion?` | `string` |
| `AllowMultiResponses?` | `string` |
| `AnonymousPermMask?` | `string` |
| `Author?` | `string` |
| `BaseType?` | `string` |
| `Created?` | `string` |
| `DefaultViewUrl?` | `string` |
| `Description?` | `string` |
| `Direction?` | `string` |
| `DocTemplateUrl?` | `string` |
| `EmailAlias?` | `string` |
| `EnableAttachments?` | `string` |
| `EnableFolderCreation?` | `string` |
| `EnableMinorVersion?` | `string` |
| `EnableModeration?` | `string` |
| `EnablePeopleSelector?` | `string` |
| `EnableResourceSelector?` | `string` |
| `EnableVersioning?` | `string` |
| `EnforceDataValidation?` | `string` |
| `EventSinkAssembly?` | `string` |
| `EventSinkClass?` | `string` |
| `EventSinkData?` | `string` |
| `ExcludeFromOfflineClient?` | `string` |
| `FeatureId?` | `string` |
| `Fields?` | [`Field`](modules.md#field)[] |
| `Flags?` | `string` |
| `HasExternalDataSource?` | `string` |
| `HasRelatedLists?` | `string` |
| `HasUniqueScopes?` | `string` |
| `Hidden?` | `string` |
| `ID?` | `string` |
| `ImageUrl?` | `string` |
| `IrmEnabled?` | `string` |
| `IsApplicationList?` | `string` |
| `ItemCount?` | `string` |
| `LastDeleted?` | `string` |
| `MajorVersionLimit?` | `string` |
| `MajorWithMinorVersionsLimit?` | `string` |
| `MaxItemsPerThrottledOperation?` | `string` |
| `MobileDefaultViewUrl?` | `string` |
| `Modified?` | `string` |
| `MultipleDataList?` | `string` |
| `Name?` | `string` |
| `NoThrottleListOperations?` | `string` |
| `Ordered?` | `string` |
| `PreserveEmptyValues?` | `string` |
| `ReadSecurity?` | `string` |
| `RequireCheckout?` | `string` |
| `RootFolder?` | `string` |
| `ScopeId?` | `string` |
| `SendToLocation?` | `string` |
| `ServerTemplate?` | `string` |
| `ShowUser?` | `string` |
| `StrictTypeCoercion?` | `string` |
| `ThrottleListOperations?` | `string` |
| `ThumbnailSize?` | `string` |
| `Title?` | `string` |
| `Version?` | `string` |
| `WebFullUrl?` | `string` |
| `WebId?` | `string` |
| `WebImageHeight?` | `string` |
| `WebImageWidth?` | `string` |
| `WorkFlowId?` | `string` |
| `WriteSecurity?` | `string` |

#### Defined in

[types/list.ts:4](https://github.com/rlking1985/spws/blob/2f4647b/src/types/list.ts#L4)

___

### ListAttributes

Ƭ **ListAttributes**: \`${Attributes}\`

#### Defined in

[types/listAttributes.ts:3](https://github.com/rlking1985/spws/blob/2f4647b/src/types/listAttributes.ts#L3)

___

### ListCollection

Ƭ **ListCollection**: `Object`

#### Index signature

▪ [index: `number`]: [`List`](modules.md#list)

#### Defined in

[types/listCollection.ts:3](https://github.com/rlking1985/spws/blob/2f4647b/src/types/listCollection.ts#L3)

___

### Response

Ƭ **Response**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `responseText` | `string` |
| `responseXML` | `Document` |
| `status` | `number` |
| `statusText` | `string` |

#### Defined in

[index.ts:58](https://github.com/rlking1985/spws/blob/2f4647b/src/index.ts#L58)

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
| `parse` | `boolean` | If false, the data object will be empty. The responseXML will need to be used  **`default`** true |
| `webURL` | `string` | The absolute or relative webURL.  **`default`** "" |

#### Defined in

[index.ts:39](https://github.com/rlking1985/spws/blob/2f4647b/src/index.ts#L39)

## Functions

### getList

▸ `Const` **getList**(`__namedParameters`): `Promise`<[`GetListResponse`](interfaces/GetListResponse.md)\>

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
| `__namedParameters` | [`GetListParameters`](interfaces/GetListParameters.md) |

#### Returns

`Promise`<[`GetListResponse`](interfaces/GetListResponse.md)\>

#### Defined in

[services/lists/getList.ts:53](https://github.com/rlking1985/spws/blob/2f4647b/src/services/lists/getList.ts#L53)

___

### getListCollection

▸ `Const` **getListCollection**(`__namedParameters?`): `Promise`<[`GetListCollectionResponse`](interfaces/GetListCollectionResponse.md)\>

Returns the names and GUIDs for all lists in the site.

**`link`** https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms774663(v=office.12)?redirectedfrom=MSDN

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`DefaultParameters`](modules.md#defaultparameters) |

#### Returns

`Promise`<[`GetListCollectionResponse`](interfaces/GetListCollectionResponse.md)\>

#### Defined in

[services/lists/getListCollection.ts:26](https://github.com/rlking1985/spws/blob/2f4647b/src/services/lists/getListCollection.ts#L26)
