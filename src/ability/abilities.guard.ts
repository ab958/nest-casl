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
import { AbilityFactory, Action, currentuser, myCase } from "./ability.factory";

@Injectable()
export class AbilitiesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private caslAbilityFactory: AbilityFactory,
    ){}

    async canActivate(context: ExecutionContext):  Promise<boolean>  {

        // { action: Action.Read, subject: Subject.Case}
        const rules = 
            this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler());

        const request = context.switchToHttp().getRequest();
        const { id } = request.params; // here id is the path parameter

        const user = currentuser;
        
        let requestedCase = myCase.find(( item ) => item.id === id);

        let requestedrules = rules[0].action+ ':' + rules[0].subject;
        const deleteCasePermission = user.permission.find(permission => permission.includes(requestedrules));
        const possession = deleteCasePermission.split(':')[2]

        console.log(id,requestedCase,user,rules,possession)

        if (possession === 'own' && requestedCase.userId !== user.id) {
            throw new ForbiddenException('you donot have permission to access this route')
        }

        const ability = this.caslAbilityFactory.defineAbility(user)

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
