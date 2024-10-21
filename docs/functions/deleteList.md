[**spws**](../README.md) • **Docs**

***

[spws](../globals.md) / deleteList

# Function: deleteList()

> **deleteList**(`listName`, `__namedParameters`): `Promise`\<`Operation`\>

Deletes the list.

## Parameters

• **listName**: `string`

• **\_\_namedParameters**: `Params` = `{}`

## Returns

`Promise`\<`Operation`\>

## Link

https://learn.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms773418(v=office.12)

## Example

```
// Get list collection for current site
const res = await deleteList("Announcements", { webURL: "/sites/other" })
```

## Defined in

[services/lists/deleteList.ts:32](https://github.com/rlking1985/spws/blob/96ed2330ff15e8f8eb88949aa126d8a29c8f97dc/src/services/lists/deleteList.ts#L32)
