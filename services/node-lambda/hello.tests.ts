import { APIGatewayProxyEvent } from 'aws-lambda'
import { handler } from '../SpacesTable/Create'

const event: APIGatewayProxyEvent = {
    body: {
        name: 'test'
    }
} as any

const result = handler(event, {} as any).then(apiResult => {
    const items = JSON.parse(apiResult.body)
    console.log('234')
})