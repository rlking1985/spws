[**spws**](../README.md) • **Docs**

***

[spws](../globals.md) / updateList

# Function: updateList()

> **updateList**(`__namedParameters`): `Promise`\<`Operation`\>

Updates a list based on the specified field definitions and list properties.

## Parameters

• **\_\_namedParameters**: `UpdateListParams`

## Returns

`Promise`\<`Operation`\>

## Link

https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-services/ms774660(v=office.12)

## Link

https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-2010/ms437580(v=office.14)

## Example

```
// Update list
const res = await updateList({
 listName: "Announcements",
 webURL: "/sites/other",
 listProperties: { Description: "Demo description" },
 deleteFields: ["Age"],
 newFields: [
   {
     StaticName: "DateOfBirth",
     DisplayName: "Date of Birth",
     Type: "DateTime",
     Format: "DateOnly",
   },
 ],
});
```

## Defined in

[services/lists/updateList/index.ts:151](https://github.com/rlking1985/spws/blob/eac8675429b3cb92c57fd641d54e84f4ab439754/src/services/lists/updateList/index.ts#L151)
