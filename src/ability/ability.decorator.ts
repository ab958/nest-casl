import { SetMetadata } from "@nestjs/common";
import { Action, Subject } from "./ability.factory";

export interface RequiredRule{
    action: Action,
    subject: Subject
}

export const CHECK_ABILITY = 'check_ability';

export const CheckAbilities = (...requirement: RequiredRule[] ) =>
    SetMetadata(CHECK_ABILITY, requirement)