[**spws**](../README.md) • **Docs**

***

[spws](../globals.md) / getGroupCollectionFromSite

# Function: getGroupCollectionFromSite()

> **getGroupCollectionFromSite**(`__namedParameters`): `Promise`\<`Operation`\>

Returns information about the collection of groups for the current site collection.

## Parameters

• **\_\_namedParameters** = `{}`

• **\_\_namedParameters.webURL?**: `string` = `defaults.webURL`

The SharePoint webURL

## Returns

`Promise`\<`Operation`\>

## Link

https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms774594(v=office.12)

## Example

```
// Get groups from the current site
const res = await getGroupCollectionFromSite()

// Get groups from another site
const res = await getGroupCollectionFromSite({ webURL: "/sites/other" })

```

## Defined in

[services/userGroup/getGroupCollectionFromSite.ts:33](https://github.com/rlking1985/spws/blob/96ed2330ff15e8f8eb88949aa126d8a29c8f97dc/src/services/userGroup/getGroupCollectionFromSite.ts#L33)
