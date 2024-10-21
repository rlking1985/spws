[**spws**](../README.md) • **Docs**

***

[spws](../globals.md) / searchPrincipals

# Function: searchPrincipals()

> **searchPrincipals**(`searchText`, `__namedParameters`): `Promise`\<`Operation`\>

Returns an array of PrincipalInfo objects from the SPUserCollection for the Web site. All instances have the principal logon name specified in searchText. Only the maxResults objects can be added to the array.

## Parameters

• **searchText**: `string`

Principal logon name.

• **\_\_namedParameters** = `{}`

• **\_\_namedParameters.maxResults?**: `number` = `10`

• **\_\_namedParameters.principalType?**: `PrincipalType` = `"All"`

• **\_\_namedParameters.webURL?**: `string` = `defaults.webURL`

The SharePoint webURL

## Returns

`Promise`\<`Operation`\>

## Link

https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms774790(v=office.12)

## Example

```
const res = await searchPrincipals("dev\john.smith", "Site Owners")
```

## Defined in

[services/people/searchPrincipals.ts:31](https://github.com/rlking1985/spws/blob/eac8675429b3cb92c57fd641d54e84f4ab439754/src/services/people/searchPrincipals.ts#L31)
