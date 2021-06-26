import React , {useEffect} from "react";
import { useDispatch, useSelector  } from 'react-redux';
import { userConstants } from "./ActionTypes";
import { ToastProvider, useToasts } from 'react-toast-notifications';
import moment from "moment";

const App = () => {
  const state = useSelector(state => state);
  console.log("state",state)
  const dispatch = useDispatch();

  const { addToast } = useToasts();
  const applyToast = (msg,type) => { return addToast(msg, { appearance: type });}

  const stateChanges = (payload) => {
    return { type: userConstants.INPUT_REQUEST, payload }
  }

  const handleChange = (e) =>{
    dispatch(stateChanges({[e.target.name] :  e.target.value}));   
  }

  const transAction = (arg) => {
    console.log(state.trans_amount)
    if(!state.trans_amount){
      applyToast('Please enter amount','error');
    } else if(arg !== "add" && parseFloat(state.balance_amount) === 0){
      applyToast('Balance amount is 0 , you cant remove further','error');
    } else if(arg !== "add" && parseFloat(state.balance_amount) < parseFloat(state.trans_amount)){
      applyToast('Entered amount should be less than balance amount','error');
    } else {
      var balance_amount = arg === "add" ? parseFloat(state.balance_amount) + parseFloat(state.trans_amount) : parseFloat(state.balance_amount) - parseFloat(state.trans_amount);
      var trans_detail = {
        current_time : moment(new Date(), 'YYYY-MM-DD HH:mm:ss', 'UTC').format(),
        action : arg === "add" ? "Add" : "Remove",
        trans_amount : state.trans_amount
      }
      console.log("trans_detail",trans_detail)
      var transaction = state.transaction;
      transaction.push(trans_detail)
      dispatch(stateChanges({transaction , balance_amount , trans_amount :0 }));
    }       
  }

  const validate = (e) => {
    var theEvent = e || window.event;
    if (theEvent.type === 'paste') {
        key = e.clipboardData.getData('text/plain');
    } else {
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /^[0-9]+$/;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
  }

  return (
    <div className="main_section">
      <div className="main_sub_section">
        <div className="main_sec_head">Expense Tracker - Basic</div>
        <div className="sub_sec_1">
          <div className="sub_sec_head">Balance : {state.balance_amount}</div>
          <input type="number" name="trans_amount" value={state.trans_amount !== 0 && state.trans_amount} onChange={handleChange} onKeyPress={validate} onPaste={e=>e.preventDefault()} />
          <div className="sub_sec_button">
            <button onClick={()=>transAction("add")}>Add</button>
            <button  onClick={()=>transAction("remove")}>Remove</button>
          </div>
        </div>
        <div className="sub_sec_2">
          <div className="sub_sec2_head">Transactions :</div>
          <div className="sub_sec2_trans">
            {
              state.transaction.map((list,i)=>{
                  return (
                    <React.Fragment key={"list"+i}>
                      <div className="sub_sec2_trans_data1">{list.current_time} -</div>
                      <div className="sub_sec2_trans_data1">{list.trans_amount} -</div>
                      <div className="sub_sec2_trans_data1">{list.action}</div>
                    </React.Fragment>
                  )
              })
            }
            
          </div>
        </div >
      </div>
    </div>
  );
}

export default App;
