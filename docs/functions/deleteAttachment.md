[**spws**](../README.md) • **Docs**

***

[spws](../globals.md) / deleteAttachment

# Function: deleteAttachment()

> **deleteAttachment**(`__namedParameters`): `Promise`\<`Operation`\>

Removes the attachment from the specified list item.

## Parameters

• **\_\_namedParameters**: `Params`

## Returns

`Promise`\<`Operation`\>

## Link

https://learn.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms774770(v=office.12)

## Example

```
// Get list collection for current site
const res = await getListCollection()

// Get list collection for another site
const res = await getListCollection({ webURL: "/sites/other" })
```

## Defined in

[services/lists/deleteAttachment.ts:41](https://github.com/rlking1985/spws/blob/96ed2330ff15e8f8eb88949aa126d8a29c8f97dc/src/services/lists/deleteAttachment.ts#L41)
