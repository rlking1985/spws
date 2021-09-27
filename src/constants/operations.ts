// Enum
import WebServicesEnum from "../enum/webServices";
import OperationsEnum from "../enum/operations";

// Define SharePoint schema
const schemaSharePoint = `http://schemas.microsoft.com/sharepoint`;

/**
 * @name header
 * @description Uses the operation to create the correct XML string for the request
 * @param operation The operation type for the request
 * @returns A xml string
 */
const header = (operation: string) =>
  `${operation} xmlns="${schemaSharePoint}/soap/"`;

// Type for Operations that require Soap Action
type SoapActionOperation = {
  webService: string;
  header: string;
  SOAPAction: string;
};

// Type for Operations that DO NOT require Soap Action
type SoapOperation = { webService: string; header: string };

/**
 * @name Operations
 * All available operations and the corresponding operation type
 * @type
 */
type Operations = {
  [OperationsEnum.GetAlerts]: SoapActionOperation;
  [OperationsEnum.GetList]: SoapOperation;
  [OperationsEnum.GetListItems]: SoapOperation;
};

/**
 * @constant
 */
const OPERATIONS: Operations = {
  [OperationsEnum.GetAlerts]: {
    webService: WebServicesEnum.Alerts,
    header: `GetAlerts xmlns="${schemaSharePoint}/soap/2002/1/alerts/"`,
    SOAPAction: `${schemaSharePoint}/soap/2002/1/alerts/`,
  },
  [OperationsEnum.GetList]: {
    webService: WebServicesEnum.Lists,
    header: header("GetList"),
  },
  [OperationsEnum.GetListItems]: {
    webService: WebServicesEnum.Lists,
    header: header("GetList"),
  },
};

export default OPERATIONS;
