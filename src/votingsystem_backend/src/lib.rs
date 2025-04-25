use candid::{CandidType, Decode, Encode};
use ic_cdk::{export_candid, query, update};
use std::cell::RefCell;
use std::collections::HashMap;
use serde::{Deserialize, Serialize};
use ic_stable_structures::{storable::Bound, Storable};
use std::borrow::Cow;


#[derive(CandidType, Deserialize, Clone, Debug, Serialize)]
pub struct Question {
   pub id: u64,
   pub text: String,
   pub options: [String; 3],
   pub votes: [u64; 3],
}


#[derive(CandidType, Deserialize, Clone, Debug, Serialize)]
pub struct CreateQuestion {
   pub text: String,
   pub options: [String; 3],
}


#[derive(Default, CandidType, Deserialize, Clone, Debug, Serialize)]
pub struct VotingState {
   pub questions: HashMap<u64, Question>,
   pub next_id: u64,
}




impl Storable for VotingState {
   fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
       Cow::Owned(Encode!(self).unwrap())
   }


   fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
       Decode!(bytes.as_ref(), Self).unwrap()
   }
   const BOUND: Bound = Bound::Unbounded;
}
thread_local! {
    static STATE: RefCell<VotingState> = RefCell::new(VotingState::default());
 }
 
 
 #[update]
 fn create_question(create: CreateQuestion) -> String {
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        let id = state.next_id;
        state.next_id += 1;
 
 
        let question = Question {
            id,
            text: create.text,
            options: create.options,
            votes: [0, 0, 0],
        };
 
 
        state.questions.insert(id, question);
        format!("question created successfully and question id is: {:?}", id)
    })
 }
 
 
 #[update]
 fn vote(question_id: u64, option_index: u64) -> Result<String, String> {
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        if let Some(question) = state.questions.get_mut(&question_id) {
            if option_index < 3 {
                question.votes[option_index as usize] += 1;
                Ok(format!("Vote submitted successfully"))
            } else {
                Err("Invalid option index".to_string())
            }
        } else {
            Err("Question not found".to_string())
        }
    })
}


#[query]
fn get_all_questions() -> Vec<Question> {
   STATE.with(|state| {
       let state = state.borrow();
       state.questions.values().cloned().collect()
   })
}




#[query]
fn get_vote_count(question_id: u64) -> Option<[u64; 3]> {
   STATE.with(|state| {
       let state = state.borrow();
       state.questions.get(&question_id).map(|q| q.votes)
   })
}


export_candid!(); 

