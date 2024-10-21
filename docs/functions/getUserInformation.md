[**spws**](../README.md) • **Docs**

***

[spws](../globals.md) / getUserInformation

# Function: getUserInformation()

> **getUserInformation**(`ID`, `__namedParameters`): `Promise`\<`Operation`\>

Returns information about the specified user from the User Information List

## Parameters

• **ID**: `string`

The user ID

• **\_\_namedParameters** = `{}`

• **\_\_namedParameters.webURL?**: `string` = `defaults.webURL`

The SharePoint webURL

## Returns

`Promise`\<`Operation`\>

## Link

https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-2010/ff521587(v=office.14)

## Example

```
// Get user from the current site
const res = await getUserInformation("1");

// Get user from another site
const res = await getUserInformation("1", { webURL: "/sites/other" });
```

## Defined in

[services/userGroup/getUserInformation.ts:32](https://github.com/rlking1985/spws/blob/96ed2330ff15e8f8eb88949aa126d8a29c8f97dc/src/services/userGroup/getUserInformation.ts#L32)
