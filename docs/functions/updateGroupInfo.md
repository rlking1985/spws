[**spws**](../README.md) • **Docs**

***

[spws](../globals.md) / updateGroupInfo

# Function: updateGroupInfo()

> **updateGroupInfo**(`params`): `Promise`\<`Operation`\>

Updates information for the specified group. The API does not support changing the description (Microsoft docs are incorrect).

## Parameters

• **params**

• **params.groupName**: `string`

• **params.oldGroupName**: `string`

• **params.ownerIdentifier**: `string`

• **params.ownerType**: `"user"` \| `"group"`

• **params.webURL?**: `string`

## Returns

`Promise`\<`Operation`\>

## Link

https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms774703(v=office.12)

## Example

```
const res = await removeUserFromGroup("dev\\john.smith", "Site Owners")
```

## Defined in

[services/userGroup/updateGroupInfo.ts:33](https://github.com/rlking1985/spws/blob/96ed2330ff15e8f8eb88949aa126d8a29c8f97dc/src/services/userGroup/updateGroupInfo.ts#L33)
