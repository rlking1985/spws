[**spws**](../README.md) • **Docs**

***

[spws](../globals.md) / getWebPartProperties

# Function: getWebPartProperties()

> **getWebPartProperties**(`__namedParameters`): `Promise`\<`Operation`\>

## Parameters

• **\_\_namedParameters**: `GetWebPartProps`

## Returns

`Promise`\<`Operation`\>

- A promise that resolves to an Operation object containing an array of Web Part properties.

## Description

Fetches the Web Part properties for a specified page within a SharePoint site.
This function retrieves all the Web Parts on a given Web Part page, including their metadata,
such as IDs, titles, visibility status, and layout details, as well as the full XML representation of each Web Part.

## Defined in

[services/webParts/getWebPartProperties.ts:25](https://github.com/rlking1985/spws/blob/963fffcfd1206fadbccbd348d3836bf3d546ecfe/src/services/webParts/getWebPartProperties.ts#L25)
