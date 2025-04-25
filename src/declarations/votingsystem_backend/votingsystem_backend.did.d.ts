import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface CreateQuestion { 'text' : string, 'options' : Array<string> }
export interface Question {
  'id' : bigint,
  'votes' : BigUint64Array | bigint[],
  'text' : string,
  'options' : Array<string>,
}
export type Result = { 'Ok' : string } |
  { 'Err' : string };
export interface _SERVICE {
  'create_question' : ActorMethod<[CreateQuestion], string>,
  'get_all_questions' : ActorMethod<[], Array<Question>>,
  'get_vote_count' : ActorMethod<[bigint], [] | [BigUint64Array | bigint[]]>,
  'vote' : ActorMethod<[bigint, bigint], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
