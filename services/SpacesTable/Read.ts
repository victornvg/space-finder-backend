import { DynamoDB } from 'aws-sdk'
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda'

const TABLE_NAME = process.env.TABLE_NAME
const dbClient = new DynamoDB.DocumentClient()

async function handler(event: APIGatewayProxyEvent, context: Context) : Promise<APIGatewayProxyResult> {
    const result: APIGatewayProxyResult = {
        statusCode: 200,
        body: 'Hello'
    }

    try {
        const queryReponse = await dbClient.scan({
            TableName: TABLE_NAME!
        }).promise()
        result.body = JSON.stringify(queryReponse)
    } catch (error: any) {
        result.body = error.message
    }

    return result
}


export { handler }