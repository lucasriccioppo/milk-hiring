const { NODE_ENV } = process.env

const Utils = {
    isTestEnvironment() {
        return NODE_ENV === 'test'
    }
}

export default Utils