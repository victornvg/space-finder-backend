import { APIGatewayProxyEvent } from 'aws-lambda'
import { handler } from '../SpacesTable/Delete'

const event: APIGatewayProxyEvent = {
    queryStringParameters: {
        spaceId: 'd5605368-93d4-4c9c-84df-62e95e768de6'
    }
} as any

const result = handler(event, {} as any).then(apiResult => {
    const items = JSON.parse(apiResult.body)
    console.log('234')
})