[**spws**](../README.md) • **Docs**

***

[spws](../globals.md) / getCurrentUserID

# Function: getCurrentUserID()

> **getCurrentUserID**(`options`): `Promise`\<`CurrentUserID`\>

Gets the current user's ID

## Parameters

• **options** = `{}`

The SharePoint web URL

• **options.getFromWindow**: `undefined` \| `boolean` = `true`

If false, the user ID will be scraped from the SharePoint page.

• **options.webURL**: `undefined` \| `string` = `defaults.webURL`

The SharePoint web URL

## Returns

`Promise`\<`CurrentUserID`\>

## Example

```
// Get the current user ID
const res = await getCurrentUserID();

// Get the current user ID
const res = await getCurrentUserID({ getFromWindow: false });
```

## Defined in

[services/userGroup/getCurrentUserID.ts:35](https://github.com/rlking1985/spws/blob/96ed2330ff15e8f8eb88949aa126d8a29c8f97dc/src/services/userGroup/getCurrentUserID.ts#L35)
