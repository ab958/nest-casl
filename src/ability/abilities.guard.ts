import { ForbiddenError } from "@casl/ability";
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException
} from '@nestjs/common';
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
// import { curre}
import { RequiredRule, CHECK_ABILITY } from "./ability.decorator";
import { AbilityFactory, currentuser } from "./ability.factory";

@Injectable()
export class AbilitiesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private caslAbilityFactory: AbilityFactory
    ){}

    async canActivate(context: ExecutionContext):  Promise<boolean>  {

        // { action: Action.Read, subject: Subject.Case}
        const rules = 
            this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) 

        const user = currentuser;
        console.log(rules,user)
        const ability = this.caslAbilityFactory.defineAbility(user)
        // const ability = this.abilityFactory.defineAbility(user)

        // const isAllowed = ability.can(Action.Read, Subject.Case) 
        // console.log(isAllowed)
        // if(!isAllowed){
        //   throw new ForbiddenException('you donot have permission to access this route')
        // }
        try {
            rules.forEach((rule) => 
                ForbiddenError.from(ability).throwUnlessCan(rule.action,rule.subject)
            )

            return true
        } catch (error) {
            if( error instanceof ForbiddenError){
                throw new ForbiddenException(error.message)
            }
        }
    }
}
