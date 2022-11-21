import Test from 'App/Models/Test'
import { DateTime } from 'luxon'

export default class TestsController {
  public async testCamelCase() {
    const model = new Test()
    model.id = 123
    model.createdAt = DateTime.local()
    model.updatedAt = DateTime.local()

    return model.serialize({
      fields: ['id', 'createdAt'],
    })
  }

  public async testSnakeCase() {
    const model = new Test()
    model.id = 456
    model.createdAt = DateTime.local()
    model.updatedAt = DateTime.local()

    return model.serialize({
      fields: ['id', 'created_at'],
    })
  }
}
