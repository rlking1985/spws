import getWebPartProperties from "./getWebPartProperties";

describe("WebParts", () => {
  it("Got a result", async () => {
    const res = await getWebPartProperties({
      pageURL:
        "http://objectpoint/sites/spws/operations/StaticPages/getWebPart.aspx",
    });
    expect(res.data.length).toBeTruthy();
  });
});

// const mockResponseXML = `
//     <GetWebPartPropertiesResponse>
//       <WebPart xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns="http://microsoft.com/sharepoint/webpartpages" ID="1">
//         <Title>Test Web Part</Title>
//         <FrameType>Default</FrameType>
//         <Description>Test Description</Description>
//         <IsIncluded>TRUE</IsIncluded>
//         <ZoneID>Zone1</ZoneID>
//         <PartOrder>1</PartOrder>
//         <FrameState>Normal</FrameState>
//         <Height>200px</Height>
//         <Width>300px</Width>
//         <AllowRemove>TRUE</AllowRemove>
//         <AllowZoneChange>TRUE</AllowZoneChange>
//         <AllowMinimize>TRUE</AllowMinimize>
//         <AllowConnect>TRUE</AllowConnect>
//         <AllowEdit>TRUE</AllowEdit>
//         <AllowHide>TRUE</AllowHide>
//         <IsVisible>TRUE</IsVisible>
//         <DetailLink>http://example.com/detail</DetailLink>
//         <HelpLink>http://example.com/help</HelpLink>
//         <HelpMode>Modeless</HelpMode>
//         <Dir>LTR</Dir>
//         <PartImageSmall>http://example.com/small.jpg</PartImageSmall>
//         <MissingAssembly>None</MissingAssembly>
//         <PartImageLarge>http://example.com/large.jpg</PartImageLarge>
//         <IsIncludedFilter>None</IsIncludedFilter>
//         <ExportControlledProperties>TRUE</ExportControlledProperties>
//         <ConnectionID>123</ConnectionID>
//         <ID_>1</ID_>
//         <Assembly>TestAssembly</Assembly>
//         <TypeName>TestType</TypeName>
//         <HeaderTitle>Test Header</HeaderTitle>
//       </WebPart>
//     </GetWebPartPropertiesResponse>
//   `;
