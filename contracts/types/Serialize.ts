import { LucidRow, ModelAttributes, ModelRelations } from '@ioc:Adonis/Lucid/Orm'

type ExtractModelRelations<Model extends LucidRow> = {
  [Key in keyof Model]: Model[Key] extends ModelRelations ? Key : never
}[keyof Model]

export type Serialize<R extends LucidRow> = {
  fields?:
    | Array<keyof ModelAttributes<R>>
    | {
        pick?: Array<keyof ModelAttributes<R>>
        omit?: Array<keyof ModelAttributes<R>>
      }
  relations?: {
    [K in ExtractModelRelations<R>]?: Serialize<Related<R, K>>
  }
}

type Related<
  R extends LucidRow,
  Name extends ExtractModelRelations<R>
> = R[Name] extends ModelRelations ? R[Name]['instance'] : never
