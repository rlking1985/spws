[**spws**](../README.md) • **Docs**

***

[spws](../globals.md) / getUserCollectionFromSite

# Function: getUserCollectionFromSite()

> **getUserCollectionFromSite**(`__namedParameters`): `Promise`\<`Operation`\>

Returns information about the collection of users for the current site collection.

## Parameters

• **\_\_namedParameters** = `{}`

• **\_\_namedParameters.webURL?**: `string` = `defaults.webURL`

The SharePoint webURL

## Returns

`Promise`\<`Operation`\>

## Link

https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms772702(v=office.12)

## Example

```
// Get users from the current site
const res = await getUserCollectionFromSite()

// Get users from another site
const res = await getUserCollectionFromSite({ webURL: "/sites/other" })

```

## Defined in

[services/userGroup/getUserCollectionFromSite.ts:33](https://github.com/rlking1985/spws/blob/963fffcfd1206fadbccbd348d3836bf3d546ecfe/src/services/userGroup/getUserCollectionFromSite.ts#L33)
