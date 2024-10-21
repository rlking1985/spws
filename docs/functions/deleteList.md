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

[services/lists/deleteList.ts:32](https://github.com/rlking1985/spws/blob/eac8675429b3cb92c57fd641d54e84f4ab439754/src/services/lists/deleteList.ts#L32)
