[**spws**](../README.md) • **Docs**

***

[spws](../globals.md) / addList

# Function: addList()

> **addList**(`listName`, `__namedParameters`): `Promise`\<`Operation`\>

Creates a new list.

https://learn.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms772560(v=office.12)

## Parameters

• **listName**: `string`

• **\_\_namedParameters**: `Params` = `{}`

## Returns

`Promise`\<`Operation`\>

## Example

```
// Get list collection for current site
const res = await deleteList("Announcements", { webURL: "/sites/other" })
```

## Defined in

[services/lists/addList.ts:39](https://github.com/rlking1985/spws/blob/eac8675429b3cb92c57fd641d54e84f4ab439754/src/services/lists/addList.ts#L39)
