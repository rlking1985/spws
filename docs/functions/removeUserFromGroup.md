[**spws**](../README.md) • **Docs**

***

[spws](../globals.md) / removeUserFromGroup

# Function: removeUserFromGroup()

> **removeUserFromGroup**(`userLoginName`, `groupName`, `__namedParameters`): `Promise`\<`Operation`\>

Removes the specified user from the specified group.

## Parameters

• **userLoginName**: `string`

A string that contains the user name (DOMAIN\User_Alias) of the user.

• **groupName**: `string`

A string that contains the name of the group.

• **\_\_namedParameters** = `{}`

• **\_\_namedParameters.webURL?**: `string` = `defaults.webURL`

The SharePoint webURL

## Returns

`Promise`\<`Operation`\>

## Link

https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms774499(v=office.12)

## Example

```
const res = await removeUserFromGroup("dev\\john.smith", "Site Owners")
```

## Defined in

[services/userGroup/removeUserFromGroup.ts:33](https://github.com/rlking1985/spws/blob/eac8675429b3cb92c57fd641d54e84f4ab439754/src/services/userGroup/removeUserFromGroup.ts#L33)
