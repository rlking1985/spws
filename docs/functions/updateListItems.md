[**spws**](../README.md) • **Docs**

***

[spws](../globals.md) / updateListItems

# Function: updateListItems()

> **updateListItems**(`listName`, `methods`, `__namedParameters`): `Promise`\<`Operation`[]\>

Adds, deletes, or updates the specified items in a list on the current site.

## Parameters

• **listName**: `string`

A string that contains the name of the list. It is recommended that you use the list GUID

• **methods**: `Methods`

An array that contains one or more methods for adding, modifying, or deleting items

• **\_\_namedParameters** = `{}`

• **\_\_namedParameters.allowLongFieldNames?**: `boolean` = `false`

If true, the field names contained with values will not be trimmed to 32 characters.
This allows field names that exceed 32 characters to be used.
This is a rare use case where 2 or more fields share the exact same name for the first 32 characters. For example
1. ThisIsAExtremelyLongTextFieldNam
2. ThisIsAExtremelyLongTextFieldNam0

• **\_\_namedParameters.batchSize?**: `number` = `400`

The maximum amount of updates that can be sent per web request. A batch size of 0 is Infinite

• **\_\_namedParameters.onBatchComplete?**

A callback function that is invoked when a batch is complete

• **\_\_namedParameters.onError?**: `"Return"` \| `"Continue"` = `"Continue"`

Return (stop) or continue execution of the scripts if an error occurs

• **\_\_namedParameters.webURL?**: `string` = `defaults.webURL`

The SharePoint webURL

## Returns

`Promise`\<`Operation`[]\>

## Link

https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms772668(v=office.12)

## Example

```
// Create, update and delete
const res = await updateListItems("Announcements", [
  { command: "New", values: { Title: "Hello World" } },
  { command: "Update", ID: "2", values: { Title: "Hello World" } },
  { command: "Delete", ID: "3" },
]);
```

## Defined in

[services/lists/updateListItems/index.ts:60](https://github.com/rlking1985/spws/blob/eac8675429b3cb92c57fd641d54e84f4ab439754/src/services/lists/updateListItems/index.ts#L60)
