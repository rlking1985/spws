[**spws**](../README.md) • **Docs**

***

[spws](../globals.md) / addList

# Function: addList()

> **addList**(`listName`, `options`): `Promise`\<`Operation`\>

Creates a new list.

## Parameters

• **listName**: `string`

• **options**: `Params` = `{}`

## Returns

`Promise`\<`Operation`\>

## Link

https://learn.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms772560(v=office.12)

## Example

```
// Get list collection for current site
const res = await addList("Announcements", { webURL: "/sites/other", templateId: 100, description: "Demo List" })
```

## Defined in

[services/lists/addList.ts:39](https://github.com/rlking1985/spws/blob/963fffcfd1206fadbccbd348d3836bf3d546ecfe/src/services/lists/addList.ts#L39)
