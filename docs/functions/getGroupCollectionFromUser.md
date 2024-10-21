[**spws**](../README.md) • **Docs**

***

[spws](../globals.md) / getGroupCollectionFromUser

# Function: getGroupCollectionFromUser()

> **getGroupCollectionFromUser**(`userLoginName`, `__namedParameters`): `Promise`\<`Operation`\>

Returns information about the collection of groups of which the specified user is a member

## Parameters

• **userLoginName**: `string`

The user login name including the domain
https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms772552(v=office.12)

• **\_\_namedParameters** = `{}`

• **\_\_namedParameters.webURL?**: `string` = `defaults.webURL`

The SharePoint web URL

## Returns

`Promise`\<`Operation`\>

## Example

```
// Get groups for current site
const res = await getGroupCollectionFromUser("dev\\john.smith");

// Get groups for different site
const res = await getGroupCollectionFromUser("dev\\john.smith", { webURL: "/sites/other "});
```

## Defined in

[services/userGroup/getGroupCollectionFromUser.ts:35](https://github.com/rlking1985/spws/blob/eac8675429b3cb92c57fd641d54e84f4ab439754/src/services/userGroup/getGroupCollectionFromUser.ts#L35)
