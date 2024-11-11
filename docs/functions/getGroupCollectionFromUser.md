[**spws**](../README.md) • **Docs**

***

[spws](../globals.md) / getGroupCollectionFromUser

# Function: getGroupCollectionFromUser()

> **getGroupCollectionFromUser**(`userLoginName`, `__namedParameters`): `Promise`\<`Operation`\>

Returns information about the collection of groups of which the specified user is a member

## Parameters

• **userLoginName**: `string`

The user login name including the domain

• **\_\_namedParameters** = `{}`

• **\_\_namedParameters.webURL?**: `string` = `defaults.webURL`

The SharePoint web URL

## Returns

`Promise`\<`Operation`\>

## Link

https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms772552(v=office.12)

## Example

```
// Get groups for current site
const res = await getGroupCollectionFromUser("dev\\john.smith");

// Get groups for different site
const res = await getGroupCollectionFromUser("dev\\john.smith", { webURL: "/sites/other "});
```

## Defined in

[services/userGroup/getGroupCollectionFromUser.ts:35](https://github.com/rlking1985/spws/blob/963fffcfd1206fadbccbd348d3836bf3d546ecfe/src/services/userGroup/getGroupCollectionFromUser.ts#L35)
