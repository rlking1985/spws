[**spws**](../README.md) • **Docs**

***

[spws](../globals.md) / getListItems

# Function: getListItems()

> **getListItems**\<`T`\>(`listName`, `__namedParameters`): `Promise`\<`Operation`\<`T`\>\>

Adds the user to the specified group

## Type Parameters

• **T** *extends* `object` = `object`

## Parameters

• **listName**: `string`

A string that contains either the display name or the GUID for the list

• **\_\_namedParameters**: `GetListItemsOptions`\<`T`\> = `{}`

## Returns

`Promise`\<`Operation`\<`T`\>\>

## Link

https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms772599(v=office.12)

## Link

https://docs.microsoft.com/en-us/openspecs/sharepoint_protocols/ms-listsws/fa650bde-c79b-4a2a-bb5d-c43e74166322?redirectedfrom=MSDN

## Example

```
const res = await getListItems("Task Tracker")
```

## Defined in

[services/lists/getListItems/index.ts:120](https://github.com/rlking1985/spws/blob/96ed2330ff15e8f8eb88949aa126d8a29c8f97dc/src/services/lists/getListItems/index.ts#L120)
