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

[services/lists/deleteAttachment.ts:41](https://github.com/rlking1985/spws/blob/eac8675429b3cb92c57fd641d54e84f4ab439754/src/services/lists/deleteAttachment.ts#L41)
