/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TErrorSources,
  TGenericErrorResponse,
} from "../GlobalInterface/error.interface";

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];
  const errorSources: TErrorSources = [
    {
      path: "",
      message: `${extractedMessage} is already exits`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: "Duplicate Name",
    errorSources,
  };
};

export default handleDuplicateError;
