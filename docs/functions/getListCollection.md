[**spws**](../README.md) • **Docs**

***

[spws](../globals.md) / getListCollection

# Function: getListCollection()

> **getListCollection**(`__namedParameters`): `Promise`\<`Operation`\>

Returns the names and GUIDs for all lists in the site.

## Parameters

• **\_\_namedParameters** = `{}`

• **\_\_namedParameters.webURL?**: `string` = `defaults.webURL`

The SharePoint webURL

## Returns

`Promise`\<`Operation`\>

## Link

https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms774663(v=office.12)?redirectedfrom=MSDN

## Example

```
// Get list collection for current site
const res = await getListCollection()

// Get list collection for another site
const res = await getListCollection({ webURL: "/sites/other" })
```

## Defined in

[services/lists/getListCollection.ts:31](https://github.com/rlking1985/spws/blob/eac8675429b3cb92c57fd641d54e84f4ab439754/src/services/lists/getListCollection.ts#L31)
