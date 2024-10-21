[**spws**](../README.md) • **Docs**

***

[spws](../globals.md) / getViewCollection

# Function: getViewCollection()

> **getViewCollection**(`listName`, `__namedParameters`): `Promise`\<`Operation`\>

Returns the display names, internal names, and URLs for the collection of views of the specified list.

## Parameters

• **listName**: `string`

A string that contains the internal name of the list.

• **\_\_namedParameters** = `{}`

• **\_\_namedParameters.webURL?**: `string` = `defaults.webURL`

The SharePoint webURL

## Returns

`Promise`\<`Operation`\>

## Link

https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms772703(v=office.12)

## Example

```
const res = await getViewCollection("Announcements");
```

## Defined in

[services/views/getViewCollection.ts:26](https://github.com/rlking1985/spws/blob/96ed2330ff15e8f8eb88949aa126d8a29c8f97dc/src/services/views/getViewCollection.ts#L26)
