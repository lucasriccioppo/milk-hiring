const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Milk Hiring API",
      description: "API used to control milk received from farmers to a processing factory",
      contact: {
        name: "Lucas Riccioppo"
      },
      servers: [`http://localhost:${process.env.PORT}`]
    }
  },
  apis: ['./src/controllers/*.ts']
}

export default swaggerOptions