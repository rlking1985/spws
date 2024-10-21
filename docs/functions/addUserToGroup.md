[**spws**](../README.md) • **Docs**

***

[spws](../globals.md) / addUserToGroup

# Function: addUserToGroup()

> **addUserToGroup**(`userLoginName`, `groupName`, `__namedParameters`): `Promise`\<`Operation`\>

Adds the user to the specified group

## Parameters

• **userLoginName**: `string`

A string that contains the user name (DOMAIN\User_Alias) of the user.

• **groupName**: `string`

A string that contains the name of the group.
https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms772683(v=office.12)

• **\_\_namedParameters** = `{}`

• **\_\_namedParameters.webURL?**: `string` = `defaults.webURL`

The SharePoint webURL

## Returns

`Promise`\<`Operation`\>

## Example

```
const res = await addUserToGroup("dev\\john.smith", "Site Owners")
```

## Defined in

[services/userGroup/addUserToGroup.ts:33](https://github.com/rlking1985/spws/blob/eac8675429b3cb92c57fd641d54e84f4ab439754/src/services/userGroup/addUserToGroup.ts#L33)
