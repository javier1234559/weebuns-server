
import {User} from '../../user/entities/user.entity'


export class UserLanguage {
  id: number ;
user_id: number ;
language: string ;
proficiency_level: string ;
is_native: boolean ;
created_at: Date ;
updated_at: Date ;
user?: User ;
}
