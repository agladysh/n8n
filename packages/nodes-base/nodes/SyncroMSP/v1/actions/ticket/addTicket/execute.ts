import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	IDataObject,
	INodeExecutionData,
} from 'n8n-workflow';

import {
	apiRequest,
} from '../../../transport';


export async function addTicket(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('customerId', index) as IDataObject;
	const subject = this.getNodeParameter('subject', index) as IDataObject;
	const additionalFields = this.getNodeParameter('additionalFields', index) as IDataObject;

	const qs = {} as IDataObject;
	const requestMethod = 'POST';
	const endpoint = 'tickets';
	let body = {} as IDataObject;

	if (additionalFields) {
		body = additionalFields;
	}

	body.customer_id=id;
	body.subject=subject;

	let responseData;
	responseData = await apiRequest.call(this, requestMethod, endpoint, body, qs);

	return this.helpers.returnJsonArray(responseData.ticket);
}
