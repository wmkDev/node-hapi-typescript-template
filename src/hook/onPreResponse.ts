import { ServerExtEventsRequestObject, ResponseObject } from 'hapi';
import { logger } from '@lib/Logger';

export const onPreResponse: ServerExtEventsRequestObject = {
  type: 'onPreResponse',
  method: (request, h) => {
    if (request.response && (<any>request.response).isBoom) {
      const response: any = <any>request.response;
      logger.trace('Full Error Object:');
      logger.trace(response);
      if (response.output && response.output.payload && Object.keys(response.output.payload).length !== 0) {
        logger.error('Error Payload:');
        logger.error(response.output.payload);
      }
      if (response.output && response.output.headers && Object.keys(response.output.headers).length !== 0) {
        logger.error('Error Headers:');
        logger.error(response.output.headers);
      }
      if (response.output && response.output.statusCode) {
        logger.error('Error Status Code:');
        logger.error(response.output.statusCode);
      }
    } else {
      const response: ResponseObject = <ResponseObject>request.response;
      logger.trace('Full Response Object:');
      logger.trace(response);
      if (response.source) {
        logger.debug('Response Payload:');
        logger.debug(response.source);
      }
      if (response.headers && Object.keys(response.headers).length !== 0) {
        logger.debug('Response Headers:');
        logger.debug(response.headers);
      }
      if (response.statusCode) {
        logger.debug('Response Status Code:');
        logger.debug(response.statusCode);
      }
      if (response.app && Object.keys(response.app).length !== 0) {
        logger.debug('Response Application State:');
        logger.debug(response.app);
      }
    }
    if (request.path !== '/monitor/liveness' && request.path !== '/monitor/readiness' && !request.path.includes('swagger')) {
      logger.info(`End: ${request.method.toUpperCase()} ${request.path}`);
    } else {
      logger.debug(`End: ${request.method.toUpperCase()} ${request.path}`);
    }
    return h.continue;
  }
};
