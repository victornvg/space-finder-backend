import { DynamoDB } from 'aws-sdk'
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda'
import { v4 } from 'uuid'
import { MissingFieldError, validateSpaceEntry } from '../Shared/InputValidator'

const TABLE_NAME = process.env.TABLE_NAME
const dbClient = new DynamoDB.DocumentClient()

async function handler(event: APIGatewayProxyEvent, context: Context) : Promise<APIGatewayProxyResult> {
    const result: APIGatewayProxyResult = {
        statusCode: 200,
        body: 'Hello'
    }

    try {
        const item = typeof event.body === 'object' ? event.body : JSON.parse(event.body)
        item.spaceId = v4()
        validateSpaceEntry(item)
        await dbClient.put({
            TableName: TABLE_NAME!,
            Item: item
        }).promise()

        result.body = JSON.stringify(`Create item with id: ${item.spaceId}`)
    } catch (error: any) {
        if(error instanceof MissingFieldError) {
            result.statusCode = 400
        } else {
            result.statusCode = 500
        }
        
        result.body = error.message
    }

    return result
}


export { handler }