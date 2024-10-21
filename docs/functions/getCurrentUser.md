[**spws**](../README.md) • **Docs**

***

[spws](../globals.md) / getCurrentUser

# Function: getCurrentUser()

> **getCurrentUser**(`__namedParameters`): `Promise`\<`Operation`\>

Gets the current authenticated user.

## Parameters

• **\_\_namedParameters** = `{}`

• **\_\_namedParameters.getFromWindow?**: `boolean` = `true`

If false, the user ID will be scraped from a SharePoint page

• **\_\_namedParameters.ID?**: `string`

The user ID. If defined, the page scrape is skipped and user info is returned\
This is useful for testing as scraping pages is flaky

• **\_\_namedParameters.webURL?**: `string` = `defaults.webURL`

The SharePoint web URL

## Returns

`Promise`\<`Operation`\>

## Remark

Authentication can be changed using a proxy server and supplying a username and password. This is not recommended and should be used for testing purposes only.

## Defined in

[services/userGroup/getCurrentUser.ts:27](https://github.com/rlking1985/spws/blob/eac8675429b3cb92c57fd641d54e84f4ab439754/src/services/userGroup/getCurrentUser.ts#L27)
