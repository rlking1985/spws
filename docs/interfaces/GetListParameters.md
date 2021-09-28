[spws](../README.md) / [Exports](../modules.md) / GetListParameters

# Interface: GetListParameters

## Hierarchy

- [`DefaultParameters`](../modules.md#defaultparameters)

  ↳ **`GetListParameters`**

## Table of contents

### Properties

- [attributes](GetListParameters.md#attributes)
- [listName](GetListParameters.md#listname)
- [parse](GetListParameters.md#parse)
- [webURL](GetListParameters.md#weburl)

## Properties

### attributes

• `Optional` **attributes**: (``"AllowDeletion"`` \| ``"AllowMultiResponses"`` \| ``"AnonymousPermMask"`` \| ``"Author"`` \| ``"BaseType"`` \| ``"Created"`` \| ``"DefaultViewUrl"`` \| ``"Description"`` \| ``"Direction"`` \| ``"DocTemplateUrl"`` \| ``"EmailAlias"`` \| ``"EnableAttachments"`` \| ``"EnableFolderCreation"`` \| ``"EnableMinorVersion"`` \| ``"EnableModeration"`` \| ``"EnablePeopleSelector"`` \| ``"EnableResourceSelector"`` \| ``"EnableVersioning"`` \| ``"EnforceDataValidation"`` \| ``"EventSinkAssembly"`` \| ``"EventSinkClass"`` \| ``"EventSinkData"`` \| ``"ExcludeFromOfflineClient"`` \| ``"FeatureId"`` \| ``"Fields"`` \| ``"Flags"`` \| ``"HasExternalDataSource"`` \| ``"HasRelatedLists"`` \| ``"HasUniqueScopes"`` \| ``"Hidden"`` \| ``"ID"`` \| ``"ImageUrl"`` \| ``"IrmEnabled"`` \| ``"IsApplicationList"`` \| ``"ItemCount"`` \| ``"LastDeleted"`` \| ``"MajorVersionLimit"`` \| ``"MajorWithMinorVersionsLimit"`` \| ``"MaxItemsPerThrottledOperation"`` \| ``"MobileDefaultViewUrl"`` \| ``"Modified"`` \| ``"MultipleDataList"`` \| ``"Name"`` \| ``"NoThrottleListOperations"`` \| ``"Ordered"`` \| ``"PreserveEmptyValues"`` \| ``"ReadSecurity"`` \| ``"RequireCheckout"`` \| ``"RootFolder"`` \| ``"ScopeId"`` \| ``"SendToLocation"`` \| ``"ServerTemplate"`` \| ``"ShowUser"`` \| ``"StrictTypeCoercion"`` \| ``"ThrottleListOperations"`` \| ``"ThumbnailSize"`` \| ``"Title"`` \| ``"Version"`` \| ``"WebFullUrl"`` \| ``"WebId"`` \| ``"WebImageHeight"`` \| ``"WebImageWidth"`` \| ``"WorkFlowId"`` \| ``"WriteSecurity"``)[]

 An array of attributes that are returned in the data object.
 Only available when parsing is true.
 If no attributes are supplied, all list attributes will be returned

#### Defined in

[services/lists/getList.ts:30](https://github.com/rlking1985/spws/blob/bc2d5f7/src/services/lists/getList.ts#L30)

___

### listName

• **listName**: `string`

A string that contains either the title (not static name) or the GUID for the list.

#### Defined in

[services/lists/getList.ts:24](https://github.com/rlking1985/spws/blob/bc2d5f7/src/services/lists/getList.ts#L24)

___

### parse

• `Optional` **parse**: `boolean`

If false, the data object will be empty. The responseXML will need to be used

**`default`** true

#### Inherited from

DefaultParameters.parse

#### Defined in

[index.ts:22](https://github.com/rlking1985/spws/blob/bc2d5f7/src/index.ts#L22)

___

### webURL

• `Optional` **webURL**: `string`

The absolute or relative webURL.

**`default`** ""

#### Inherited from

DefaultParameters.webURL

#### Defined in

[index.ts:27](https://github.com/rlking1985/spws/blob/bc2d5f7/src/index.ts#L27)
