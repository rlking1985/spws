[**spws**](../README.md) • **Docs**

***

[spws](../globals.md) / getUserInformation

# Function: getUserInformation()

> **getUserInformation**(`ID`, `__namedParameters`): `Promise`\<`Operation`\>

Returns information about the specified user from the User Information List

## Parameters

• **ID**: `string`

The user ID
https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-2010/ff521587(v=office.14)

• **\_\_namedParameters** = `{}`

• **\_\_namedParameters.webURL?**: `string` = `defaults.webURL`

The SharePoint webURL

## Returns

`Promise`\<`Operation`\>

## Example

```
// Get user from the current site
const res = await getUserInformation("1");

// Get user from another site
const res = await getUserInformation("1", { webURL: "/sites/other" });
```

## Defined in

[services/userGroup/getUserInformation.ts:32](https://github.com/rlking1985/spws/blob/eac8675429b3cb92c57fd641d54e84f4ab439754/src/services/userGroup/getUserInformation.ts#L32)
