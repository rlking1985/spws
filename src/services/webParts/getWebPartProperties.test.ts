import getWebPartProperties from "./getWebPartProperties";

describe("WebParts", () => {
  it("Got a result", async () => {
    const res = await getWebPartProperties({
      pageURL:
        "http://objectpoint/sites/spws/operations/StaticPages/getWebPart.aspx",
    });
    expect(res.data.length).toBeTruthy();
    expect(res.data[1].FrameType).toBe("Default");
    expect(res.data[1].Description).toBe(
      "Allows authors to enter rich text content."
    );
    expect(res.data[1].IsIncluded).toBe(true);
    expect(res.data[1].ZoneID).toBe("Header");
    expect(res.data[1].PartOrder).toBe(0);
    expect(res.data[1].FrameState).toBe("Normal");
    expect(res.data[1].Height).toBeUndefined();
    expect(res.data[1].Width).toBeUndefined();
    expect(res.data[1].AllowRemove).toBe(true);
    expect(res.data[1].AllowZoneChange).toBe(true);
    expect(res.data[1].AllowMinimize).toBe(true);
    expect(res.data[1].AllowConnect).toBe(true);
    expect(res.data[1].AllowEdit).toBe(true);
    expect(res.data[1].AllowHide).toBe(true);
    expect(res.data[1].IsVisible).toBe(true);
    expect(res.data[1].DetailLink).toBeUndefined();
    expect(res.data[1].HelpLink).toBeUndefined();
    expect(res.data[1].HelpMode).toBe("Modeless");
    expect(res.data[1].Dir).toBe("Default");
    expect(res.data[1].PartImageSmall).toBeUndefined();
    expect(res.data[1].MissingAssembly).toBe("Cannot import this Web Part.");
    expect(res.data[1].PartImageLarge).toBe("/_layouts/images/mscontl.gif");
    expect(res.data[1].IsIncludedFilter).toBeUndefined();
    expect(res.data[1].ExportControlledProperties).toBe(true);
    expect(res.data[1].ID_).toBe("g_bec11dcb_1b31_4505_a82e_ff2837fb09fd");
    expect(res.data[1].ConnectionID).toBe(
      "00000000-0000-0000-0000-000000000000"
    );

    expect(res.data[1].Assembly).toBe(
      "Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"
    );
    expect(res.data[1].TypeName).toBe(
      "Microsoft.SharePoint.WebPartPages.ContentEditorWebPart"
    );
  });
});
