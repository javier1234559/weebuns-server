
import {Correction} from '../../correction/entities/correction.entity'


export class CorrectionSentence {
  id: number ;
id_correction: number ;
original_text: string ;
corrected_text: string  | null;
explanation: string  | null;
is_correct: boolean ;
rating: number  | null;
created_at: Date ;
updated_at: Date ;
correction?: Correction ;
}
