import { APIGatewayProxyEvent } from 'aws-lambda'
import { handler } from '../SpacesTable/Update'

const event: APIGatewayProxyEvent = {
    queryStringParameters: {
        spaceId: '1706d865-d332-451f-8980-0ce65c4a94af'
    },
    body: {
        location: 'new location'
    }
} as any

const result = handler(event, {} as any).then(apiResult => {
    const items = JSON.parse(apiResult.body)
    console.log('234')
})