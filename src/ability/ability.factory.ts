import { Ability, AbilityBuilder, AbilityClass, createMongoAbility, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { Inject, Injectable } from "@nestjs/common";


export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete'
}

// enum Subjects {
//     User = 'User',
//     Post = 'Post',
//   }
  
export class User {
    id: number;
    isAdmin: boolean
}
export type Subjects = InferSubjects<typeof User> | 'all';

export type AppAbility =  Ability<[Action, Subjects]>;

@Injectable()
export class AbilityFactory{
    defineAbility(user: User){
        // const builder = new AbilityBuilder(Ability as AbilityClass<AppAbility>)
        const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility)
        // builder.can(Action.Read,'all')

        if (user.isAdmin) {
            can(Action.Manage, 'all');
            // can(Action.Manage, Subjects.Post);
          } else {
            can(Action.Read, 'all');
            // can(Action.Create, Subjects.Post, { author: user.id });
            // can(Action.Update, Subjects.Post, { author: user.id });
            // can(Action.Delete, Subjects.Post, { author: user.id });
          }
        
          return build({
            detectSubjectType: (item) =>
            item.constructor as ExtractSubjectType<Subjects>
          });
    }
}