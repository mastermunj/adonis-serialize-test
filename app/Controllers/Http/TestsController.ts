import { CherryPick, LucidRow, ModelObject } from '@ioc:Adonis/Lucid/Orm'
import Profile from 'App/Models/Profile'
import Test from 'App/Models/Test'
import User from 'App/Models/User'
import { Serialize } from 'Contracts/types/Serialize'
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

  public async testSerialize() {
    const user = new User()
    user.id = 1
    user.username = 'munjal'
    user.createdAt = DateTime.local()
    user.updatedAt = DateTime.local()

    user.$setRelated('profile', new Profile())
    user.profile.companyName = 'Adonis Inc'
    user.profile.birthDate = DateTime.fromSQL('1990-01-01')
    user.profile.createdAt = DateTime.local()
    user.profile.updatedAt = DateTime.local()

    console.log(user.serialize())

    return this.serialize(user, {
      fields: ['id'],
      relations: {
        profile: {
          fields: ['companyName'],
        },
      },
    })
  }

  private serialize<R extends LucidRow>(model: R, cherryPick?: Serialize<R>): ModelObject {
    return model.serialize(cherryPick as CherryPick)
  }
}
