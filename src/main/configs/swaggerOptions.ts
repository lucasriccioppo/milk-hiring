const swaggerOptions = {
   swaggerDefinition: {
            openapi: '3.0.1',
            info: {
                version: "1.0.0",
                title: "Milk Hiring API",
                description: "API used to control milk received from farmers to a processing factory",
                contact: {
                    name: "Lucas Riccioppo"
                },
                servers: [`http://localhost:${process.env.PORT}`]
            },
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT'
                    }
                }
            },
            security: [{
                bearerAuth: []
            }],
        },
        apis: [`${__dirname}/../controllers/*.ts`]
}

export default swaggerOptions