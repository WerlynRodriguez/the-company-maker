import { TransformFnParams } from 'class-transformer';

/**
 * Transform the name to validated spaces
 * @example
 * 'Riot  Games' => 'Riot Games'
 * 'Discovery     Channel' => 'Discovery Channel'
 */
export function RemoveSpaces({ value }: TransformFnParams) {
  return value.replace(/\s+/g, ' ');
}
