[**spws**](../README.md) • **Docs**

***

[spws](../globals.md) / getUserCollectionFromGroup

# Function: getUserCollectionFromGroup()

> **getUserCollectionFromGroup**(`groupName`, `__namedParameters`): `Promise`\<`Operation`\>

Returns information about the collection of users in the specified group.

## Parameters

• **groupName**: `string`

• **\_\_namedParameters** = `{}`

• **\_\_namedParameters.webURL?**: `string` = `defaults.webURL`

The SharePoint webURL

## Returns

`Promise`\<`Operation`\>

## Link

https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms772554(v=office.12)

## Example

```
// Get users from the group named Site Owners
const res = await getUserCollectionFromSite("Site Owners")

// Get users from another site
const res = await getUserCollectionFromSite("Site Owners", { webURL: "/sites/other" })

```

## Defined in

[services/userGroup/getUserCollectionFromGroup.ts:33](https://github.com/rlking1985/spws/blob/963fffcfd1206fadbccbd348d3836bf3d546ecfe/src/services/userGroup/getUserCollectionFromGroup.ts#L33)
