import { Ability, AbilityBuilder, AbilityClass, createMongoAbility, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { Inject, Injectable } from "@nestjs/common";


export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete'
}

export enum Subject {
  Contract = 'contract',
  Case = 'case',
  all = 'all'
}

class Article {
  id: number;
  userId: number;
}

export const currentuser = { 
  id: 1, 
  isAdmin: false, 
  permission: [
    // 'read:contract:all',
    // 'get:contract:all',
    // 'read:case:all',
    // 'get:case:all',
    // 'delete:case:own'
  ]
}

export const myCase = [
  {
  id: 'case1',
  userId: 2
  },{
  id: 'case2',
  userId: 2
  }
];
  
export class User {
    id: number;
    isAdmin: boolean;
    permission: any[]
}
export type Subjects = InferSubjects<Subject | typeof myCase>;

export type AppAbility =  Ability<[Action, Subjects]>;

@Injectable()
export class AbilityFactory{
    defineAbility(user: User){
        const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

        if (user.isAdmin) {
            can(Action.Manage, Subject.all);
          } else {
            user.permission.forEach((items: string) => {
              const [ action, subject ]: [Action, Subject] = items.split(':') as [Action, Subject];
              can(action, subject);
              // .because('you donot have access to this case')
            })
          }
          

          return build({
            detectSubjectType: (item) =>
            item as unknown as ExtractSubjectType<Subjects>
          });
    }
}


// export enum Subject {
//   Contract = 'contract',
//   Case = 'case',
//   all = 'all'
// }

// export enum Action {
//   Manage = 'manage',
//   Create = 'create',
//   Read = 'read',
//   Update = 'update',
//   Delete = 'delete'
// }

// herer is subject and Action, iam using @casl/ability library for permission based system;
// i want to update Case if it is my case 