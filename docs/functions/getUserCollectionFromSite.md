[**spws**](../README.md) • **Docs**

***

[spws](../globals.md) / getUserCollectionFromSite

# Function: getUserCollectionFromSite()

> **getUserCollectionFromSite**(`__namedParameters`): `Promise`\<`Operation`\>

Returns information about the collection of users for the current site collection.
https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms772702(v=office.12)

## Parameters

• **\_\_namedParameters** = `{}`

• **\_\_namedParameters.webURL?**: `string` = `defaults.webURL`

The SharePoint webURL

## Returns

`Promise`\<`Operation`\>

## Example

```
// Get users from the current site
const res = await getUserCollectionFromSite()

// Get users from another site
const res = await getUserCollectionFromSite({ webURL: "/sites/other" })

```

## Defined in

[services/userGroup/getUserCollectionFromSite.ts:33](https://github.com/rlking1985/spws/blob/eac8675429b3cb92c57fd641d54e84f4ab439754/src/services/userGroup/getUserCollectionFromSite.ts#L33)
