export const idlFactory = ({ IDL }) => {
  const CreateQuestion = IDL.Record({
    'text' : IDL.Text,
    'options' : IDL.Vec(IDL.Text),
  });
  const Question = IDL.Record({
    'id' : IDL.Nat64,
    'votes' : IDL.Vec(IDL.Nat64),
    'text' : IDL.Text,
    'options' : IDL.Vec(IDL.Text),
  });
  const Result = IDL.Variant({ 'Ok' : IDL.Text, 'Err' : IDL.Text });
  return IDL.Service({
    'create_question' : IDL.Func([CreateQuestion], [IDL.Text], []),
    'get_all_questions' : IDL.Func([], [IDL.Vec(Question)], ['query']),
    'get_vote_count' : IDL.Func(
        [IDL.Nat64],
        [IDL.Opt(IDL.Vec(IDL.Nat64))],
        ['query'],
      ),
    'vote' : IDL.Func([IDL.Nat64, IDL.Nat64], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
