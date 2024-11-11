[**spws**](../README.md) • **Docs**

***

[spws](../globals.md) / saveWebPart

# Function: saveWebPart()

> **saveWebPart**(`__namedParameters`): `Promise`\<`Operation`\>

## Parameters

• **\_\_namedParameters**: `SaveWebPartProps`

## Returns

`Promise`\<`Operation`\>

- A promise that resolves to an Operation object, including a success flag if the Web Part was saved successfully.

## Description

Saves the Web Part configuration for a specified Web Part on a SharePoint page.
This function sends the updated XML configuration for a given Web Part and applies it to the page.
It uses the `SaveWebPart` SOAP operation provided by the SharePoint WebPartPages web service.

## Defined in

[services/webParts/saveWebPart.ts:32](https://github.com/rlking1985/spws/blob/963fffcfd1206fadbccbd348d3836bf3d546ecfe/src/services/webParts/saveWebPart.ts#L32)
