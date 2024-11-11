[**spws**](../README.md) • **Docs**

***

[spws](../globals.md) / getView

# Function: getView()

> **getView**(`listName`, `viewName`?, `__namedParameters`?): `Promise`\<`Operation`\>

Returns the schema of the specified view for the specified list.

## Parameters

• **listName**: `string`

A string that contains the internal name of the list.

• **viewName?**: `string` = `""`

A string that contains the GUID for the view. If the view name is blank, the default view is returned.

• **\_\_namedParameters?** = `{}`

• **\_\_namedParameters.webURL?**: `string` = `defaults.webURL`

The SharePoint webURL

## Returns

`Promise`\<`Operation`\>

## Link

https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms772612(v=office.12)?redirectedfrom=MSDN

## Example

```
const res = await getView("Announcements", "{397586A7-1738-4837-9F5D-4F6D54B4FB39}")
```

## Defined in

[services/views/getView.ts:30](https://github.com/rlking1985/spws/blob/963fffcfd1206fadbccbd348d3836bf3d546ecfe/src/services/views/getView.ts#L30)
