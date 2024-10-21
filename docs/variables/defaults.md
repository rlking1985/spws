[**spws**](../README.md) • **Docs**

***

[spws](../globals.md) / defaults

# Variable: defaults

> `const` **defaults**: `object`

The default options used in every web request.
These can be changed globally or passed to specific requests.

## Type declaration

### queryOptions

> **queryOptions**: `object`

An XML fragment in the following form that contains separate nodes for the various properties of the SPQuery object

### queryOptions.DatesInUtc?

> `optional` **DatesInUtc**: `boolean`

Specifies the format in which dates are returned.
If True, dates returned are in Coordinated Universal Time (UTC) format.
If False, dates returned are in [ISO-8601] format.

### queryOptions.ExpandUserField?

> `optional` **ExpandUserField**: `boolean`

If set to True, specifies that fields in list items that are lookup fields
to the user information list are returned as if they were multi-value lookups,
including "Name", "EMail", "SipAddress", and "Title" fields from the user
information list for the looked up item. These values are separated by ";#",
and any commas in the lookup field name are encoded as ",,".

### queryOptions.Folder?

> `optional` **Folder**: `string`

Specifies a URL used to filter document library items for items in the specified folder.

### queryOptions.IncludeAttachmentUrls?

> `optional` **IncludeAttachmentUrls**: `boolean`

If set to True, specifies that the value returned for the Attachments field is a list of full URLs
separated by the delimiter ";#".

### queryOptions.IncludeAttachmentVersion?

> `optional` **IncludeAttachmentVersion**: `boolean`

This MUST be used only in conjunction with IncludeAttachmentUrls.
Specifying True causes the GUID and version number to be returned for attachments that
can be used for conflict detection on update.

### queryOptions.IncludeMandatoryColumns?

> `optional` **IncludeMandatoryColumns**: `boolean`

Specifies that required fields and fields used by specified calculated fields
be returned in addition to the fields specified by the viewFields parameter, if set to True

### queryOptions.IncludePermissions?

> `optional` **IncludePermissions**: `boolean`

If it is True, the EffectivePermMask attribute is returned when the permissions of a
given row differ from the base permissions of the list

### queryOptions.OptimizeLookups?

> `optional` **OptimizeLookups**: `boolean`

Specifies how to return lookup values when a list item that is the target of a lookup
is in an incomplete or draft state.
When False, the data returned will include the current lookup field values
When True, the query returns published lookup field values, if present, regardless of
whether the list item that is the target of the lookup is in an incomplete or draft state

### queryOptions.RemoveInvalidXmlCharacters?

> `optional` **RemoveInvalidXmlCharacters**: `boolean`

If set to True, the server MUST remove all characters that have an
ASCII valuein the range 0-31,other than 9, 10, or 13, in the field values
of the list items returned.

### webURL

> **webURL**: `string`

The absolute or relative webURL.

#### Default

```ts
""
```

## Example

```
import { defaults } from "spws";
defaults.webURL = "/sites/my-site"
```

## Defined in

[index.ts:26](https://github.com/rlking1985/spws/blob/eac8675429b3cb92c57fd641d54e84f4ab439754/src/index.ts#L26)
